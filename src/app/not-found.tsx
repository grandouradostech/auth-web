import Link from "next/link"
import { FileQuestion, ArrowLeft, Home } from "lucide-react"
import * as S from "./not-found-styles"
import Button from "@/app/_components/button"

export default function NotFound() {
  return (
    <S.Container>
      <S.Content>
        <S.IconWrapper>
          <FileQuestion size={80} strokeWidth={1.5} />
        </S.IconWrapper>

        <S.ErrorCode>404</S.ErrorCode>
        <S.Title>Página não encontrada</S.Title>
        <S.Description>
          Ops! Parece que o caminho que você tentou seguir não existe ou foi
          movido para outro endereço.
        </S.Description>

        <S.Actions>
          <Link href="/">
            <Button variant="primary" fit="content">
              <Home size={18} />
              Voltar ao Início
            </Button>
          </Link>

          <Link href="/">
            <button type="button" className="back-link">
              <ArrowLeft size={18} />
              Voltar
            </button>
          </Link>
        </S.Actions>
      </S.Content>

      <S.BackgroundDetail />
    </S.Container>
  )
}
