export interface User {
  id: string
  email: string
  name: string
}

export interface LoginResponse {
  user: User
  usuario: any
  access_token: string
}

export interface AppInfo {
  nome: string
  slug: string
}

export interface RoleInfo {
  nome: string
  chave: string
}

export interface EmpresaInfo {
  nome: string
}

export interface UserRole {
  id: string
  roleId: string
  empresaId: string
  appId: string
  criadoEm: string
  role: RoleInfo
  empresa: EmpresaInfo
  app: AppInfo
}

export interface Empresa {
  id: string
  nome: string
  cnpj: string
  status: string
}

export interface UserContextData {
  id: string
  nome: string
  email: string
  status: string
  isSuperAdmin: boolean
  criadoEm: string
  empresa: Empresa
  roles: UserRole[]
}

export interface IRole {
  id: string
  nome: string
  chave: string
}
