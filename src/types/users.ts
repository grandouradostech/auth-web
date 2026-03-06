import { IRole } from "./auth"

export interface IUsuario {
  id: string
  nome: string
  email: string
  status: string
  roles: IRole[]
}
