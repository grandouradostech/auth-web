"use client"

import React from "react"
import { ShieldAlert, ArrowLeft, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import * as S from "./styles"
import Button from "@/app/_components/button"

interface ForbiddenErrorProps {
  reset?: () => void
}

export function ForbiddenError({ reset }: ForbiddenErrorProps) {
  const router = useRouter()

  const handleBack = () => {
    if (reset) {
      reset()
    }
    router.back()
  }

  return (
    <S.Container>
      <S.Content>
        <S.IconWrapper>
          <div className="grid-bg">
            <ShieldAlert size={40} />
          </div>
          <AlertTriangle size={24} className="alert-icon" />
        </S.IconWrapper>

        <S.TextSection>
          <h1>Acesso Negado</h1>
          <p>
            Você não tem permissão para realizar esta ação ou acessar este
            recurso.
          </p>
        </S.TextSection>

        <S.Actions>
          <Button onClick={handleBack} variant="outline" fit="content">
            <ArrowLeft size={18} />
            Voltar
          </Button>
        </S.Actions>
      </S.Content>

      <S.BackgroundBlur />
    </S.Container>
  )
}
