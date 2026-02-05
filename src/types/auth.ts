export interface User {
  id: string
  email: string
  name: string
}

export interface LoginResponse {
  user: User
  access_token: string
}
