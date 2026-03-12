"use client"
import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useMutation } from "@tanstack/react-query"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import Section from "@/app/_components/sections"
import Input from "@/app/_components/input"
import { Info, UserKeyIcon } from "lucide-react"
import { AlertLineBox } from "@/app/_components/alert-line-box"
import { fetchCepV2 } from "@/services/http/third-party/brasil-api"
import { createUser } from "@/services/http/users"
import { useParams, usePathname, useRouter } from "next/navigation"

const isValidCPF = (cpf: string) => {
  const cleanCPF = cpf.replace(/[^\d]+/g, "")
  if (cleanCPF.length !== 11 || /^(\d)\1{10}$/.test(cleanCPF)) return false
  let sum = 0
  for (let i = 1; i <= 9; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (11 - i)
  }
  let rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cleanCPF.substring(9, 10))) return false
  sum = 0
  for (let i = 1; i <= 10; i++) {
    sum = sum + parseInt(cleanCPF.substring(i - 1, i)) * (12 - i)
  }
  rest = (sum * 10) % 11
  if (rest === 10 || rest === 11) rest = 0
  if (rest !== parseInt(cleanCPF.substring(10, 11))) return false
  return true
}

const isMaiorDe14Anos = (dataString: string) => {
  const dataNascimento = new Date(dataString)
  const hoje = new Date()
  let idade = hoje.getFullYear() - dataNascimento.getFullYear()
  const mes = hoje.getMonth() - dataNascimento.getMonth()
  if (mes < 0 || (mes === 0 && hoje.getDate() < dataNascimento.getDate())) {
    idade--
  }
  return idade >= 14
}

const userSchema = z
  .object({
    nomeCompleto: z.string().min(3, "Nome obrigatório"),
    cpf: z
      .string()
      .min(11, "CPF inválido")
      .refine((val) => isValidCPF(val), { message: "CPF inválido" }),
    dataNascimento: z
      .string()
      .min(1, "Data de nascimento obrigatória")
      .refine((val) => isMaiorDe14Anos(val), {
        message: "A idade deve ser maior que 14 anos",
      }),
    genero: z.string().min(1, "Gênero obrigatório"),
    emailCorporativo: z.string().email("E-mail corporativo inválido"),
    emailPessoal: z.string().email("E-mail pessoal inválido"),
    telefoneCorporativo: z.string().min(10, "Telefone inválido"),
    celular: z.string().min(10, "Celular inválido"),
    cep: z.string().min(8, "CEP inválido"),
    logradouro: z.string().min(1, "Logradouro obrigatório"),
    numero: z.string().min(1, "Número obrigatório"),
    complemento: z.string().optional(),
    bairro: z.string().min(1, "Bairro obrigatório"),
    cidade: z.string().min(1, "Cidade obrigatória"),
    uf: z.string().min(2, "UF obrigatória"),
    senha: z
      .string()
      .min(6, "A senha deve ter no mínimo 6 caracteres")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&\W]{6,}$/,
        "A senha deve conter letra maiúscula, minúscula, número e caractere especial",
      ),
    confirmarSenha: z.string().min(6, "A confirmação de senha é obrigatória"),
  })
  .refine((data) => data.senha === data.confirmarSenha, {
    message: "As senhas não coincidem",
    path: ["confirmarSenha"],
  })

type UserFormData = z.infer<typeof userSchema>

export default function Registro() {
  const { empresa_id } = useParams<{ empresa_id: string }>()
  const [isPasswordTouched, setIsPasswordTouched] = useState(false)
  const [defaultPassword, setDefaultPassword] = useState("")
  const navigation = useRouter()
  const pathname = usePathname()
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      senha: "",
      confirmarSenha: "",
    },
  })

  const { mutate, isPending } = useMutation({
    mutationFn: (data: any) => createUser(empresa_id, data),
    onSuccess: ({ data }) => {
      if (data?.usuario?.id) {
        return navigation.push(
          `/${empresa_id}/dashboard/pessoas/${data?.usuario?.id}`,
        )
      }
    },
    onError: () => {
      alert("Erro ao criar usuário.")
    },
  })

  const cepValue = watch("cep")
  const nomeValue = watch("nomeCompleto")
  const cpfValue = watch("cpf")

  useEffect(() => {
    if (!cepValue) return

    const cleanCep = cepValue.replace(/\D/g, "")

    if (cleanCep.length === 8) {
      fetchCepV2(cleanCep)
        .then((data) => {
          setValue("logradouro", data.street || "")
          setValue("bairro", data.neighborhood || "")
          setValue("cidade", data.city || "")
          setValue("uf", data.state || "")
        })
        .catch(() => {
          setValue("logradouro", "")
          setValue("bairro", "")
          setValue("cidade", "")
          setValue("uf", "")
        })
    }
  }, [cepValue, setValue])

  useEffect(() => {
    if (!isPasswordTouched && nomeValue && cpfValue) {
      const cleanCpf = cpfValue.replace(/\D/g, "")
      const firstName = nomeValue.trim().split(" ")[0]

      if (cleanCpf.length >= 4 && firstName.length > 0) {
        const formattedName =
          firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase()
        const cpfEnd = cleanCpf.slice(-4)

        const newPassword = `${formattedName}@${cpfEnd}!`

        setDefaultPassword(newPassword)
        setValue("senha", newPassword, { shouldValidate: true })
        setValue("confirmarSenha", newPassword, { shouldValidate: true })
      }
    }
  }, [nomeValue, cpfValue, isPasswordTouched, setValue])

  const onSubmit = (data: UserFormData) => {
    const payload = {
      nome: data.nomeCompleto,
      cpf: data.cpf.replace(/\D/g, ""),
      email_corporativo: data.emailCorporativo,
      email_pessoal: data.emailPessoal,
      senha: data.senha,
      data_nascimento: data.dataNascimento,

      telefone_corporativo: data.telefoneCorporativo.replace(/\D/g, ""),
      telefone_pessoal: data.celular.replace(/\D/g, ""),
      endereco: {
        cep: data.cep,
        logradouro: data.logradouro,
        bairro: data.bairro,
        localidade: data.cidade,
        uf: data.uf,
      },
    }

    mutate(payload)
  }

  return (
    <S.Container as="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <HeaderText
        description={"Infomre os dados referentes ao usuário a ser cdastrado"}
      >
        {"Novo Usuário"}
      </HeaderText>

      <Section
        title="Informações Pessoais"
        description="Gerencie os dados básicos e de identificação deste usuário."
        footerText="Por favor, utilize o nome completo conforme o documento."
      >
        <S.FormGrid>
          <Input
            label="Nome Completo"
            placeholder="Ex: João da Silva"
            {...register("nomeCompleto")}
            error={errors.nomeCompleto?.message}
          />
          <Input
            mask="cpf"
            label="CPF"
            placeholder="000.000.000-00"
            {...register("cpf")}
            error={errors.cpf?.message}
          />
          <Input
            label="Data de Nascimento"
            type="date"
            {...register("dataNascimento")}
            error={errors.dataNascimento?.message}
          />
          <Input
            label="Gênero"
            placeholder="Selecione..."
            {...register("genero")}
            error={errors.genero?.message}
          />
        </S.FormGrid>
      </Section>

      <Section
        title="Contato"
        description="Informações utilizadas para comunicação com o usuário."
        footerText={
          <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Info size={18} /> O e-mail corporativo será usado para o acesso!
          </p>
        }
      >
        <S.FormGrid>
          <Input
            label="E-mail Corporativo"
            type="email"
            {...register("emailCorporativo")}
            error={errors.emailCorporativo?.message}
          />
          <Input
            label="E-mail Pessoal"
            type="email"
            {...register("emailPessoal")}
            error={errors.emailPessoal?.message}
          />
          <Input
            mask="phone"
            label="Telefone Corporativo"
            placeholder="(00) 0000-0000"
            {...register("telefoneCorporativo")}
            error={errors.telefoneCorporativo?.message}
          />
          <Input
            mask="phone"
            label="Celular / WhatsApp"
            placeholder="(00) 90000-0000"
            {...register("celular")}
            error={errors.celular?.message}
          />
        </S.FormGrid>
      </Section>

      <Section
        title="Endereço"
        description="Localização principal e endereço de correspondência."
      >
        <S.FormGrid>
          <Input
            mask="cep"
            label="CEP"
            placeholder="00000-000"
            {...register("cep")}
            error={errors.cep?.message}
          />
          <Input
            label="Logradouro"
            placeholder="Nome da rua"
            {...register("logradouro")}
            error={errors.logradouro?.message}
          />
          <Input
            label="Número"
            placeholder="123"
            {...register("numero")}
            error={errors.numero?.message}
          />
          <Input
            label="Complemento"
            placeholder="Apto, Bloco, etc."
            {...register("complemento")}
            error={errors.complemento?.message}
          />
          <Input
            label="Bairro"
            placeholder="Bairro"
            {...register("bairro")}
            error={errors.bairro?.message}
          />
          <Input
            label="Cidade"
            placeholder="Cidade"
            {...register("cidade")}
            error={errors.cidade?.message}
          />
          <Input
            label="UF"
            placeholder="UF"
            {...register("uf")}
            error={errors.uf?.message}
          />
        </S.FormGrid>
      </Section>

      <Section
        title="Dados de Acesso"
        description="Defina a senha para acesso ao sistema."
        footerText={
          defaultPassword ? (
            <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Info size={18} /> Senha sugerida: {defaultPassword}
            </p>
          ) : (
            <p style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <Info size={18} /> Preencha Nome e CPF para gerar a senha padrão.
            </p>
          )
        }
      >
        <S.FormGrid>
          <Input
            label="Senha"
            type="password"
            autoComplete="new-password"
            placeholder="Digite ou use a senha padrão"
            {...register("senha")}
            onChange={(e) => {
              setIsPasswordTouched(true)
              register("senha").onChange(e)
            }}
            error={errors.senha?.message}
          />
          <Input
            label="Confirmar Senha"
            type="password"
            autoComplete="new-password"
            placeholder="Confirme a senha"
            {...register("confirmarSenha")}
            onChange={(e) => {
              setIsPasswordTouched(true)
              register("confirmarSenha").onChange(e)
            }}
            error={errors.confirmarSenha?.message}
          />
        </S.FormGrid>
      </Section>

      <AlertLineBox
        icon={<UserKeyIcon />}
        actionVariant="primary"
        actionContent={isPending ? "Finalizando..." : "Finalizar"}
        message="O usuário receberá um e-mail para confirmação do cadastro."
      />
    </S.Container>
  )
}
