"use client"

import React from "react"
import { LayoutGrid, ArrowLeft, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import * as S from "./styles"
import Button from "@/app/_components/button"

export default function AppNotFound() {
  const router = useRouter()

  return (
    <S.Container>
      <S.Content>
        <S.IconWrapper>
          <div className="grid-bg">
            <LayoutGrid size={40} />
          </div>
          <Search size={24} className="search-icon" />
        </S.IconWrapper>

        <S.TextSection>
          <h1>Módulo não encontrado</h1>
          <p>
            O aplicativo que você está tentando acessar não está disponível para
            sua empresa ou o link está incorreto.
          </p>
        </S.TextSection>

        <S.Actions>
          <Button onClick={() => router.back()} variant="primary" fit="content">
            <ArrowLeft size={18} />
            Voltar para o Console
          </Button>

          <S.SupportLink href="/chamados">
            Solicitar acesso a este app
          </S.SupportLink>
        </S.Actions>
      </S.Content>

      <S.BackgroundBlur />
    </S.Container>
  )
}
