"use client"
import { createContext, useEffect, useState } from "react"

import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
  PasswordInput,
} from "@/app/_components/button/styles"

import Button from "@/app/_components/button"
import { Lock } from "lucide-react"
import { auth_api } from "@/services/http/auth"
import { SudoManager } from "@/services/sudo-manager"

export const SudoContext = createContext({})

export function SudoProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [errorMsg, setErrorMsg] = useState("")

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
      setPassword("")
      setErrorMsg("")
    }

    window.addEventListener("OPEN_SUDO_MODAL", handleOpen)
    return () => window.removeEventListener("OPEN_SUDO_MODAL", handleOpen)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setErrorMsg("")

    try {
      const response = await auth_api.post("/auth/sudo", { password })
      const sudoToken = response.data.token

      SudoManager.resolve(sudoToken)

      setIsOpen(false)
      setPassword("")
    } catch (error) {
      setErrorMsg("Senha incorreta. Tente novamente.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCancel = () => {
    SudoManager.reject()
    setIsOpen(false)
    setPassword("")
    setErrorMsg("")
  }

  return (
    <SudoContext.Provider value={{}}>
      {children}

      {isOpen && (
        <ModalOverlay onClick={handleCancel}>
          <ModalContent
            as="form"
            onClick={(e) => e.stopPropagation()}
            onSubmit={handleSubmit}
          >
            <ModalHeader $type="password">
              <Lock size={24} />
              <h3>Acesso Restrito</h3>
            </ModalHeader>

            <ModalBody>
              <p>
                Esta ação exige privilégios elevados. Digite sua senha para
                continuar.
              </p>

              <PasswordInput
                type="password"
                placeholder="Digite sua senha de administrador..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoFocus
              />

              {errorMsg && (
                <span
                  style={{
                    color: "#ef4444",
                    fontSize: "1.3rem",
                    marginTop: "-8px",
                  }}
                >
                  {errorMsg}
                </span>
              )}
            </ModalBody>

            <ModalActions>
              <Button
                variant="ghost"
                fit="content"
                type="button"
                onClick={handleCancel}
              >
                Cancelar
              </Button>
              <Button
                variant="primary"
                fit="content"
                type="submit"
                disabled={!password || isLoading}
              >
                {isLoading ? "Validando..." : "Confirmar"}
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </SudoContext.Provider>
  )
}
