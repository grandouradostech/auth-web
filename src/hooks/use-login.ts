import { useState, useCallback } from "react"
import { AxiosError } from "axios"
import Cookies from "js-cookie"
import { auth_api } from "@/services/http/auth"
import { User, LoginResponse } from "@/types/auth"
import { useRouter } from "next/navigation"

export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const saveAuthCookie = (token: string) => {
    Cookies.set("token", token, {
      expires: 7,
      //domain: ".granddos.tech",
      sameSite: "lax",
      secure: true,
    })
    auth_api.defaults.headers.Authorization = `Bearer ${token}`
  }

  const getStoredData = useCallback(() => {
    if (typeof window === "undefined") return { token: null, empresas: [] }

    const token = window.sessionStorage.getItem("@Auth-Core:Access_token")
    const empresasRaw = window.sessionStorage.getItem("@Auth-Core:Empresas")

    return {
      token,
      empresas: empresasRaw ? JSON.parse(empresasRaw) : [],
    }
  }, [])

  const login = async (email: string, password: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await auth_api.post("/auth/login", {
        email,
        senha: password,
      })

      const { access_token, empresas } = response.data

      if (!access_token || !Array.isArray(empresas)) {
        throw new Error("Resposta da API inválida")
      }

      window.sessionStorage.setItem("@Auth-Core:Access_token", access_token)
      window.sessionStorage.setItem(
        "@Auth-Core:Empresas",
        JSON.stringify(empresas),
      )

      router.push(`?token=${access_token}`)
      return response.data
    } catch (err) {
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const selectTenant = async (tenantId: string) => {
    setIsLoading(true)
    const { token } = getStoredData()

    try {
      const response = await auth_api.post<LoginResponse>(
        "/auth/context",
        { empresaId: tenantId, appSlug: "core" },
        { headers: { Authorization: `Bearer ${token}` } },
      )

      window.sessionStorage.removeItem("@Auth-Core:Access_token")
      window.sessionStorage.removeItem("@Auth-Core:Empresas")
      router.push(`/dashboard`)
    } catch (err) {
      //router.push(`/`)
      handleError(err)
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    Cookies.remove("@Auth-Core:Token", {
      //domain: ".granddos.tech"
    })
    window.sessionStorage.clear()
    setUser(null)
    delete auth_api.defaults.headers.Authorization
    router.push("/")
  }

  const handleError = (err: any) => {
    const axiosError = err as AxiosError<{ message: string }>
    setError(axiosError.response?.data?.message || "Erro na autenticação")
    throw err
  }

  return {
    user,
    login,
    selectTenant,
    logout,
    getStoredData,
    isLoading,
    error,
    isAuthenticated: !!user,
  }
}
