"use client"

import { createContext, useCallback, useMemo, type ReactNode } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import Cookies from "js-cookie"
import { auth_api } from "@/services/http/auth"
import type { UserContextData } from "@/types/auth"
import { REDIRECT_MAP } from "@/config/redirects"
import axios from "axios"

interface EmpresaData {
  id: string
  nome: string
  cnpj: string
  status: string
  plano?: string
}

interface AuthContextData {
  user: UserContextData | null
  empresa: EmpresaData | null
  isLoading: boolean
  error: null | any
  login: (email: string, password: string) => Promise<any>
  selectTenant: (tenantId: string) => Promise<void>
  logout: () => void
  hasAppAccess: (appSlug: string) => boolean
  isCompanyAdmin: () => boolean
  getStoredData: () => { token: string | null; empresas: any[] }
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData)

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const queryClient = useQueryClient()
  const pathName = usePathname()
  const {
    data: meData,
    isLoading: isMeLoading,
    error: meError,
  } = useQuery({
    queryKey: ["usuarios", "me"],
    queryFn: async () => {
      const token =
        Cookies.get("token") ||
        window.sessionStorage.getItem("@Auth-Core:Access_token")
      if (!token || !pathName.includes("/dashboard")) return null

      const response = await auth_api.get("/usuarios/me")
      console.log(response.data)

      return response.data.usuario
    },
    staleTime: 1000 * 60 * 5,
    retry: false,
  })

  const getStoredData = useCallback(() => {
    if (typeof window === "undefined") return { token: null, empresas: [] }
    const token = window.sessionStorage.getItem("@Auth-Core:Access_token")
    const empresasRaw = window.sessionStorage.getItem("@Auth-Core:Empresas")
    return {
      token,
      empresas: empresasRaw ? JSON.parse(empresasRaw) : [],
    }
  }, [])

  const login = useCallback(
    async (email: string, password: string) => {
      const response = await auth_api.post("/auth/login", {
        email,
        senha: password,
      })

      const { access_token, empresas } = response.data

      window.sessionStorage.setItem("@Auth-Core:Access_token", access_token)
      window.sessionStorage.setItem(
        "@Auth-Core:Empresas",
        JSON.stringify(empresas),
      )

      await queryClient.invalidateQueries({ queryKey: ["/usuarios/me"] })

      const callback = searchParams.get("callback") || "default"
      router.push(`?callback=${callback}&token=${access_token}`)
      return response.data
    },
    [queryClient, router, searchParams],
  )

  const selectTenant = useCallback(
    async (tenantId: string) => {
      const { token } = getStoredData()
      const resp = await axios.post(
        process.env.NEXT_PUBLIC_AUTH_API_URL + "/auth/context",
        {
          empresaId: tenantId,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      )

      if (resp.status === 200) {
        const newToken = resp.data.token || token
        Cookies.set("token", newToken)

        await queryClient.invalidateQueries({ queryKey: ["/usuarios/me"] })

        const callbackParam = searchParams.get("callback")
        if (!callbackParam || callbackParam === "default")
          return window.location.assign(`${tenantId}/dashboard/`)
        const targetRoute = (callbackParam &&
          REDIRECT_MAP[callbackParam])`${tenantId}/dashboard/`

        window.location.assign(targetRoute)
      }
    },
    [getStoredData, queryClient, searchParams],
  )

  const logout = useCallback(() => {
    Cookies.remove("token")
    window.sessionStorage.clear()
    queryClient.clear()
    delete auth_api.defaults.headers.Authorization
    router.push("/")
  }, [queryClient, router])

  const isCompanyAdmin = useCallback(() => {
    return (
      meData?.roles?.some(
        (r: any) => r.role.chave === "ADMIN_EMPRESA" && r.app.slug === "core",
      ) ?? false
    )
  }, [meData])

  const hasAppAccess = useCallback(
    (appSlug: string) => {
      if (isCompanyAdmin()) return true
      return meData?.roles?.some((r: any) => r.app.slug === appSlug) ?? false
    },
    [meData, isCompanyAdmin],
  )

  const value = useMemo(
    () => ({
      user: meData,
      empresa: meData?.empresa || null,
      isLoading: isMeLoading,
      error: meError,
      login,
      selectTenant,
      logout,
      hasAppAccess,
      isCompanyAdmin,
      getStoredData,
    }),
    [
      meData,
      isMeLoading,
      meError,
      login,
      selectTenant,
      logout,
      hasAppAccess,
      isCompanyAdmin,
      getStoredData,
    ],
  )
  const formattedError = useMemo(() => {
    if (!meError) return null

    if (typeof meError === "string") return meError

    if ((meError as any)?.response?.data?.message) {
      return (meError as any).response.data.message
    }

    if ((meError as any)?.message) {
      return (meError as any).message
    }

    return "Erro inesperado"
  }, [meError])
  return (
    <AuthContext.Provider value={{ ...value, error: formattedError }}>
      {children}
    </AuthContext.Provider>
  )
}
