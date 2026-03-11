"use client"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useQuery } from "@tanstack/react-query"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import AppNotFound from "@/app/_components/not-found/app"
import Loading from "@/app/_components/loading"
import { getUserbyId } from "@/services/http/users"
import Section from "@/app/_components/sections"
import Button from "@/app/_components/button"
import Input from "@/app/_components/input"
import { Save, UserX } from "lucide-react"
import { AlertLineBox } from "@/app/_components/alert-line-box"

const updateSchema = z.object({
  nome: z.string().min(3, "Nome obrigatório"),
  cpf: z.string().min(11, "CPF inválido").nullable().or(z.literal("")),
  dataNascimento: z.string().optional().nullable(),
  genero: z.string().optional().nullable(),
  email_corporativo: z.string().email("E-mail corporativo inválido"),
  email_pessoal: z
    .string()
    .email("E-mail pessoal inválido")
    .nullable()
    .or(z.literal("")),
  telefone_corporativo: z.string().optional().nullable(),
  telefone_pessoal: z.string().optional().nullable(),
  cep: z.string().optional().nullable(),
  logradouro: z.string().optional().nullable(),
  numero: z.string().optional().nullable(),
  complemento: z.string().optional().nullable(),
  bairro: z.string().optional().nullable(),
  localidade: z.string().optional().nullable(),
  uf: z.string().optional().nullable(),
})

type UpdateFormData = z.infer<typeof updateSchema>

export default function AppOverview({ user_id }: { user_id: string }) {
  const { data, isLoading, isError } = useQuery<any>({
    queryKey: ["app", user_id],
    queryFn: () => getUserbyId(user_id),
    staleTime: 1000 * 60 * 5,
  })

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UpdateFormData>({
    resolver: zodResolver(updateSchema),
    values: {
      nome: data?.usuario?.nome || "",
      cpf: data?.usuario?.cpf || "",
      dataNascimento: data?.usuario?.dataNascimento
        ? new Date(data.usuario.dataNascimento).toISOString().split("T")[0]
        : "",
      genero: data?.usuario?.genero || "",
      email_corporativo: data?.usuario?.email_corporativo || "",
      email_pessoal: data?.usuario?.email_pessoal || "",
      telefone_corporativo: data?.usuario?.telefone_corporativo || "",
      telefone_pessoal: data?.usuario?.telefone_pessoal || "",
      cep: data?.usuario?.endereco?.cep || "",
      logradouro: data?.usuario?.endereco?.logradouro || "",
      numero: data?.usuario?.endereco?.numero || "",
      complemento: data?.usuario?.endereco?.complemento || "",
      bairro: data?.usuario?.endereco?.bairro || "",
      localidade: data?.usuario?.endereco?.localidade || "",
      uf: data?.usuario?.endereco?.uf || "",
    },
    resetOptions: {
      keepDirtyValues: true,
    },
  })

  if (isLoading) return <Loading />
  if (isError || !data?.usuario) return <AppNotFound />

  const onSubmit = (formData: UpdateFormData) => {
    console.log("Payload para atualização:", formData)
  }

  return (
    <S.Container as="form" onSubmit={handleSubmit(onSubmit)} autoComplete="off">
      <HeaderText description={data.usuario.email_corporativo || ""}>
        {data.usuario.nome ?? "Usuário"}
      </HeaderText>

      <Section
        title="Informações Pessoais"
        description="Gerencie os dados básicos e de identificação deste usuário."
        action={
          <Button
            type="submit"
            icon={<Save size={18} />}
            variant="primary"
            fit="content"
          >
            Salvar
          </Button>
        }
      >
        <S.FormGrid>
          <Input
            label="Nome Completo"
            {...register("nome")}
            error={errors.nome?.message}
          />
          <Input
            label="CPF"
            mask="cpf"
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
            {...register("genero")}
            error={errors.genero?.message}
          />
        </S.FormGrid>
      </Section>

      <Section
        title="Contato"
        description="Informações utilizadas para comunicação com o usuário."
        action={
          <Button
            type="submit"
            icon={<Save size={18} />}
            variant="primary"
            fit="content"
          >
            Salvar
          </Button>
        }
      >
        <S.FormGrid>
          <Input
            label="E-mail Corporativo"
            type="email"
            {...register("email_corporativo")}
            error={errors.email_corporativo?.message}
          />
          <Input
            label="E-mail Pessoal"
            type="email"
            {...register("email_pessoal")}
            error={errors.email_pessoal?.message}
          />
          <Input
            mask="phone"
            label="Telefone Corporativo"
            {...register("telefone_corporativo")}
            error={errors.telefone_corporativo?.message}
          />
          <Input
            mask="phone"
            label="Celular / WhatsApp"
            {...register("telefone_pessoal")}
            error={errors.telefone_pessoal?.message}
          />
        </S.FormGrid>
      </Section>

      <Section
        title="Endereço"
        description="Localização principal e endereço de correspondência."
        action={
          <Button
            type="submit"
            icon={<Save size={18} />}
            variant="primary"
            fit="content"
          >
            Salvar
          </Button>
        }
      >
        <S.FormGrid>
          <Input
            mask="cep"
            label="CEP"
            {...register("cep")}
            error={errors.cep?.message}
          />
          <Input
            label="Logradouro"
            {...register("logradouro")}
            error={errors.logradouro?.message}
          />
          <Input
            label="Número"
            {...register("numero")}
            error={errors.numero?.message}
          />
          <Input
            label="Complemento"
            {...register("complemento")}
            error={errors.complemento?.message}
          />
          <Input
            label="Bairro"
            {...register("bairro")}
            error={errors.bairro?.message}
          />
          <Input
            label="Cidade"
            {...register("localidade")}
            error={errors.localidade?.message}
          />
          <Input label="UF" {...register("uf")} error={errors.uf?.message} />
        </S.FormGrid>
      </Section>

      <AlertLineBox
        confirmType="warning"
        confirmTitle="Tem certeza?"
        confirmMessage="Esta ação faz com que o usuario não consiga acessar os apps da plataforma"
        icon={<UserX />}
        actionVariant="primary"
        actionContent={<>Desativar</>}
        message="Desative o acesso do usário na plataforma"
      />
    </S.Container>
  )
}
