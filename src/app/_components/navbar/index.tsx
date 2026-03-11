"use client"
import React, { useEffect, useRef, useState } from "react"
import {
  Menu,
  MoreHorizontal,
  ChevronsUpDown,
  ArrowLeft,
  Sun,
  Moon,
  LucideLogOut,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../breadcrumb"
import * as S from "./styles"
import { useParams, usePathname, useRouter } from "next/navigation"
import { generateBreadcrumbs } from "@/util/breadcup"
import { useQuery } from "@tanstack/react-query"
import { geApps } from "@/services/http/apps"
import { useThemeToggle } from "@/hooks/use-theme"
import { useAuth } from "@/hooks/use-login"

interface NavbarProps {
  onOpenSidebar: () => void
  showAppSelector: boolean
  showBackButton?: boolean
}

interface IApp {
  apps: {
    id: string
    nome: string
    slug: string
    criadoEm: string
  }[]
}

export default function Navbar({
  onOpenSidebar,
  showAppSelector,
  showBackButton,
}: NavbarProps) {
  const pathname = usePathname()
  const router = useRouter()
  const params = useParams()
  const { isDark, toggleTheme } = useThemeToggle()
  const { logout } = useAuth()

  const breadcrumbs = generateBreadcrumbs(pathname)

  const { data, isLoading } = useQuery<IApp>({
    queryKey: ["apps", params?.app_slug],
    queryFn: geApps,
  })

  const tenantId = pathname.split("/")[1]

  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  function handleSelectApp(appSlug: string) {
    if (params?.app_slug) {
      const splitedPathName = pathname.split(String(params.app_slug))
      const newPathName = splitedPathName.join(appSlug)
      router.push(newPathName)
      return
    }
    router.push(`/${tenantId}/dashboard/app/${appSlug}/overview`)
    setOpen(false)
  }
  function handleRouteBack() {
    router.push(`/${tenantId}/dashboard/pessoas`)
  }

  return (
    <S.Container>
      <S.LeftSection>
        {showBackButton && (
          <S.ArrowLeftButton onClick={handleRouteBack}>
            <ArrowLeft size={20} />
          </S.ArrowLeftButton>
        )}
        <S.MenuButton onClick={onOpenSidebar}>
          <Menu size={20} />
        </S.MenuButton>

        {false && showAppSelector && (
          <S.ProjectSelectorArea
            ref={ref}
            onClick={() => setOpen((prev) => !prev)}
          >
            <S.ProjectLabel>
              {!isLoading
                ? pathname.includes("/dashboard/app/")
                  ? (data?.apps?.find((a) => a.slug === params?.app_slug)
                      ?.nome ?? "Não encontrado")
                  : "Todos os App's"
                : "Carregando ..."}
            </S.ProjectLabel>

            <ChevronsUpDown
              size={14}
              className="selector-icon"
              style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
            />

            {open && (
              <S.AppDropdown>
                {data?.apps?.map((app) => (
                  <S.AppItem
                    key={app.id}
                    $active={app.id === params?.app_slug}
                    onClick={() => handleSelectApp(app.slug)}
                  >
                    {app.nome}
                  </S.AppItem>
                ))}
              </S.AppDropdown>
            )}

            <S.VerticalSeparator />
          </S.ProjectSelectorArea>
        )}

        <S.BreadcrumbArea>
          <Breadcrumb>
            {breadcrumbs.map((crumb, index) => (
              <React.Fragment key={crumb.href}>
                {index > 0 && <BreadcrumbSeparator />}
                <BreadcrumbItem>
                  {crumb.isLast ? (
                    <BreadcrumbPage>{crumb.label}</BreadcrumbPage>
                  ) : (
                    <BreadcrumbLink href={crumb.href}>
                      {crumb.label}
                    </BreadcrumbLink>
                  )}
                </BreadcrumbItem>
              </React.Fragment>
            ))}
          </Breadcrumb>
        </S.BreadcrumbArea>
      </S.LeftSection>

      <S.RightSection>
        <S.ActionIconsArea>
          <S.ThemeToggleButton onClick={toggleTheme}>
            {isDark ? <Moon size={18} /> : <Sun size={18} />}
          </S.ThemeToggleButton>
          <LucideLogOut onClick={() => logout()} size={18} />
        </S.ActionIconsArea>
      </S.RightSection>
    </S.Container>
  )
}
