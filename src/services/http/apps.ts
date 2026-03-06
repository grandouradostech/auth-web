import { auth_api } from "./auth"

export const geApps = async () => {
  return (await auth_api.get("/usuarios/me/apps")).data
}
export const getAppBySlug = async (appSlug: string) => {
  return (await auth_api.get(`/apps/${appSlug}`)).data
}
export const getAppUsersBySlug = async (appSlug: string) => {
  return (await auth_api.get(`/apps/${appSlug}/usuarios`)).data
}
