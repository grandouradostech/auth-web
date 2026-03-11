"use client"
import { createContext, useEffect, useState } from "react"
import {
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
} from "@/app/_components/button/styles"
import Button from "@/app/_components/button"
import { ShieldAlert } from "lucide-react"

export const ForbiddenContext = createContext({})

export function ForbiddenProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    const handleOpen = () => {
      setIsOpen(true)
    }

    window.addEventListener("OPEN_FORBIDDEN_MODAL", handleOpen)
    return () => window.removeEventListener("OPEN_FORBIDDEN_MODAL", handleOpen)
  }, [])

  const handleClose = () => {
    setIsOpen(false)
  }

  return (
    <ForbiddenContext.Provider value={{}}>
      {children}

      {isOpen && (
        <ModalOverlay onClick={handleClose}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <ShieldAlert size={24} color="#ef4444" />
              <h3>Acesso Negado</h3>
            </ModalHeader>

            <ModalBody>
              <p>
                Você não tem permissão para realizar esta ação ou acessar este
                recurso.
              </p>
            </ModalBody>

            <ModalActions>
              <Button
                variant="primary"
                fit="content"
                type="button"
                onClick={handleClose}
              >
                Entendi
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </ForbiddenContext.Provider>
  )
}
