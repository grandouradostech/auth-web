import { IRole } from "./auth"

export interface IUsuario {
  id: string
  nome: string
  email: string
  status: string
  roles: IRole[]
}

export interface IFullUsers {
  id: string
  nome: string
  email: string
  status: string
  criadoEm: string
  usuarioRoles: UsuarioRole[]
}

export interface UsuarioRole {
  id: string
  appId: string
  roleId: string
  role: Role
}

export interface Role {
  id: string
  nome: string
  chave: string
  app: App
}

export interface App {
  id: string
  slug: string
}
