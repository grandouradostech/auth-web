"use client"

import React from "react"
import { ShieldAlert, X, AlertTriangle } from "lucide-react"
import * as S from "./styles"
import Button from "@/app/_components/button"

interface ForbiddenModalProps {
  isOpen: boolean
  onClose: () => void
}

export function ForbiddenModal({ isOpen, onClose }: ForbiddenModalProps) {
  if (!isOpen) return null

  return (
    <S.ModalOverlay onClick={onClose}>
      <S.ModalContent onClick={(e) => e.stopPropagation()}>
        <S.CloseButton onClick={onClose}>
          <X size={20} />
        </S.CloseButton>

        <S.IconWrapper>
          <div className="grid-bg">
            <ShieldAlert size={40} />
          </div>
          <AlertTriangle size={20} className="alert-icon" />
        </S.IconWrapper>

        <S.TextSection>
          <h1>Acesso Negado</h1>
          <p>
            Você não tem permissão para realizar esta ação ou acessar este
            recurso. Verifique suas permissões com o administrador do sistema.
          </p>
        </S.TextSection>

        <S.Actions>
          <Button onClick={onClose} variant="primary" fit="content">
            Entendido
          </Button>
        </S.Actions>

        <S.BackgroundBlur />
      </S.ModalContent>
    </S.ModalOverlay>
  )
}
