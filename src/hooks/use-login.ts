import { useContext } from "react"

import { AuthContext } from "@/context/auth"

export const useAuth = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error("useAppAuth deve ser usado dentro de um AuthProvider")
  }

  return {
    login: context.login,
    selectTenant: context.selectTenant,
    logout: context.logout,
    hasAppAccess: context.hasAppAccess,
    isCompanyAdmin: context.isCompanyAdmin,
    getStoredData: context.getStoredData,
    user: context.user,
    isLoading: context.isLoading,
    error: context.error,
  }
}
