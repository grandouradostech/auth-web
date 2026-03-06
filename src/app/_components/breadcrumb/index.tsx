"use client"
import { ChevronRight } from "lucide-react"
import * as S from "./styles"

export const Breadcrumb = ({ children }: { children: React.ReactNode }) => (
  <S.BreadcrumbNav aria-label="Breadcrumb">
    <S.BreadcrumbList>{children}</S.BreadcrumbList>
  </S.BreadcrumbNav>
)

export const BreadcrumbItem = ({ children }: { children: React.ReactNode }) => (
  <S.BreadcrumbItemContainer>{children}</S.BreadcrumbItemContainer>
)

export const BreadcrumbLink = ({
  href,
  children,
}: {
  href: string
  children: React.ReactNode
}) => <S.StyledLink href={href}>{children}</S.StyledLink>

export const BreadcrumbPage = ({ children }: { children: React.ReactNode }) => (
  <S.CurrentPage aria-current="page">{children}</S.CurrentPage>
)

export const BreadcrumbSeparator = () => (
  <S.Separator aria-hidden="true">
    <ChevronRight size={14} />
  </S.Separator>
)
