"use client"
import * as S from "./styles"
import { JSX, ReactNode } from "react"

interface SectionProps {
  title: string
  description?: string
  footerText?: ReactNode
  action?: JSX.Element
  children: ReactNode
}

export default function Section({
  title,
  description,
  action,
  children,
  footerText,
}: SectionProps) {
  return (
    <S.Container>
      <S.Main>
        <S.Header>
          <h2 className="title">{title}</h2>
          {description && <p className="description">{description}</p>}
        </S.Header>
        <S.Body>{children}</S.Body>
      </S.Main>

      {(footerText || action) && (
        <S.Footer>
          <div className="info">{footerText}</div>
          <div className="action">{action}</div>
        </S.Footer>
      )}
    </S.Container>
  )
}
