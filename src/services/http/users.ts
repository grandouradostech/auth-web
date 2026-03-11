import { IFullUsers } from "@/types/users"
import { auth_api } from "./auth"

export interface Root {
  items: IFullUsers[]
  page: number
  perPage: number
  total: number
  totalPages: number
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
  return (await auth_api.get<Root>(`/usuarios/empresa?${params.toString()}`))
    .data
}
export const getUserbyId = async (user_id: string) => {
  return (await auth_api.get<IFullUsers>(`/usuarios/${user_id}`)).data
}
export const createUser = async (empresa_id: string, data: any) => {
  return await auth_api.post<IFullUsers>(
    `/usuarios/empresa/${empresa_id}`,
    data,
  )
}
