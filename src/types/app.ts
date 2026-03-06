import { IUsuario } from "./users"

export interface IApp {
  id: string
  nome: string
  slug: string
  criadoEm: string
  image_url: string
}

export interface IUsersApp {
  app: IApp
  usuarios: IUsuario[]
}
