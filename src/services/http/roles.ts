import { auth_api } from "./auth"
export const getApps = async () => {
  const { data } = await auth_api.get("/usuarios/me/apps")
  return data
}

export const getUserRoles = async (userId: string) => {
  const { data } = await auth_api.get(`/usuarios/${userId}/roles`)
  return data
}

export const getAppRoles = async (appSlug: string) => {
  const { data } = await auth_api.get(`/rbac/apps/${appSlug}/roles`)
  return data
}

export const createRole = async (
  appSlug: string,
  payload: { nome: string; chave: string },
) => {
  const { data } = await auth_api.post(`/rbac/apps/${appSlug}/roles`, payload)
  return data
}

export const getAppPermissions = async (appSlug: string) => {
  const { data } = await auth_api.get(`/rbac/apps/${appSlug}/permissoes`)
  return data
}

export const updateRolePermissions = async (
  roleId: string,
  permissaoIds: string[],
) => {
  const { data } = await auth_api.put(`/rbac/roles/${roleId}/permissoes`, {
    permissaoIds,
  })
  return data
}

export const assignRolesToUser = async (
  userId: string,
  payload: { empresaId: string; roleIds: string[] },
) => {
  const { data } = await auth_api.post(`/usuarios/${userId}/roles`, payload)
  return data
}

export const removeRoleFromUser = async (userId: string, roleId: string) => {
  const { data } = await auth_api.delete(`/usuarios/${userId}/roles/${roleId}`)
  return data
}
