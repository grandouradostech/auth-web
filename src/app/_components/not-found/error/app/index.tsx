"use client"

import React from "react"
import { ServerCrash, ArrowLeft, RotateCcw, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import * as S from "./styles"
import Button from "@/app/_components/button"

interface AppErrorProps {
  reset?: () => void
}

export function AppError({ reset }: AppErrorProps) {
  const router = useRouter()

  return (
    <S.Container>
      <S.Content>
        <S.IconWrapper>
          <div className="grid-bg">
            <ServerCrash size={40} />
          </div>
          <AlertTriangle size={24} className="alert-icon" />
        </S.IconWrapper>

        <S.TextSection>
          <h1>Erro inesperado</h1>
          <p>
            Ocorreu um problema ao tentar carregar os dados desta página. Por
            favor, tente novamente ou contate o suporte se o erro persistir.
          </p>
        </S.TextSection>

        <S.Actions>
          <Button
            onClick={() => (reset ? reset() : window.location.reload())}
            variant="primary"
            fit="content"
          >
            <RotateCcw size={18} />
            Tentar novamente
          </Button>

          <Button onClick={() => router.back()} variant="outline" fit="content">
            <ArrowLeft size={18} />
            Voltar
          </Button>

          <S.SupportLink href="/chamados">Relatar problema</S.SupportLink>
        </S.Actions>
      </S.Content>

      <S.BackgroundBlur />
    </S.Container>
  )
}
