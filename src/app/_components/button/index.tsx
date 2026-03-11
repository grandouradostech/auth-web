"use client"

import React, { ButtonHTMLAttributes, useState } from "react"
import {
  Container,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalActions,
  PasswordInput,
} from "./styles"
import { useRouter } from "next/navigation"
import { AlertTriangle, Lock, Info } from "lucide-react"

export type ButtonVariant = "primary" | "outline" | "secondary" | "ghost"
export type ButtonFit = "full" | "content" | "icon"
export type ConfirmType = "confirm" | "warning" | "password"

interface ExtendedButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children?: React.ReactNode
  icon?: React.ReactNode
  variant?: ButtonVariant
  fit?: ButtonFit
  navigate?: string
  confirmType?: ConfirmType
  confirmMessage?: string
  confirmTitle?: string
}

export default function Button({
  children,
  variant = "primary",
  fit = "full",
  navigate,
  onClick,
  confirmType,
  confirmMessage,
  icon,
  confirmTitle,
  ...rest
}: ExtendedButton) {
  const router = useRouter()
  const [showModal, setShowModal] = useState(false)
  const [password, setPassword] = useState("")

  const executeAction = (e?: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      onClick(e as any)
    }
    if (navigate) {
      router.push(navigate)
    }
    setShowModal(false)
    setPassword("")
  }

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (confirmType) {
      e.preventDefault()
      setShowModal(true)
      return
    }
    executeAction(e)
  }

  const handleConfirm = () => {
    // if (confirmType === "password" && !password) {
    //   return
    // }
    executeAction()
  }

  return (
    <>
      <Container $variant={variant} $fit={fit} onClick={handleClick} {...rest}>
        {icon ? (
          <span className="icon">{icon}</span>
        ) : confirmType ? (
          <span className="icon">
            {<AlertTriangle size={16} color="#ffbb00" />}
          </span>
        ) : null}
        <p>{children}</p>
      </Container>

      {showModal && (
        <ModalOverlay onClick={() => setShowModal(false)}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader $type={confirmType}>
              {confirmType === "warning" && <AlertTriangle size={24} />}
              {/* {confirmType === "password" && <Lock size={24} />} */}
              {confirmType === "confirm" && <Info size={24} />}
              <h3>{confirmTitle || "Atenção"}</h3>
            </ModalHeader>

            <ModalBody>
              <p>
                {confirmMessage || "Tem certeza que deseja executar esta ação?"}
              </p>

              {/* {confirmType === "password" && (
                <PasswordInput
                  type="password"
                  placeholder="Digite a senha do administrador..."
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoFocus
                />
              )} */}
            </ModalBody>

            <ModalActions>
              <Button
                variant="ghost"
                fit="content"
                onClick={(e: any) => {
                  e.preventDefault()
                  setShowModal(false)
                  setPassword("")
                }}
              >
                Cancelar
              </Button>
              <Button
                variant={confirmType === "warning" ? "primary" : "secondary"}
                fit="content"
                onClick={(e: any) => {
                  e.preventDefault()
                  handleConfirm()
                }}
                // disabled={confirmType === "password" && !password}
              >
                Confirmar
              </Button>
            </ModalActions>
          </ModalContent>
        </ModalOverlay>
      )}
    </>
  )
}
