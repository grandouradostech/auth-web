import { IFullUsers } from "@/types/users"
import { auth_api } from "./auth"

export interface Usuarios {
  items: IFullUsers[]
  page: number
  perPage: number
  total: number
  totalPages: number
}

export interface CreateUser {
  usuario: Usuario
}

export interface Usuario {
  id: string
  nome: string
  cpf: string
  endereco: Endereco
  status: string
  criadoEm: string
  data_nascimento: any
  email_corporativo: string
  email_pessoal: string
  telefone_corporativo: string
  telefone_pessoal: string
}

export interface Endereco {
  uf: string
  cep: string
  bairro: string
  localidade: string
  logradouro: string
}

export const getUsers = async (
  page?: number,
  perPage?: number,
  nome?: string,
) => {
  const params = new URLSearchParams({
    page: String(page),
    perPage: String(perPage),
  })

  if (nome) {
    params.append("nome", nome)
  }
  return (
    await auth_api.get<Usuarios>(`/usuarios/empresa?${params.toString()}`)
  ).data
}
export const getUserbyId = async (user_id: string) => {
  return (await auth_api.get<Usuario>(`/usuarios/${user_id}`)).data
}

export const createUser = async (empresa_id: string, data: any) => {
  return await auth_api.post<CreateUser>(
    `/usuarios/empresa/${empresa_id}`,
    data,
  )
}
