/** biome-ignore-all lint/style/useTemplate: <explanation> */
/** biome-ignore-all lint/correctness/noUnreachable: <explanation> */
"use client"

import { X, Search, Bell, MoreHorizontal, LucideLogOut } from "lucide-react"
import { useParams, usePathname, useRouter } from "next/navigation"
import * as S from "./styles"
import { MenuItem } from "@/config/route-map"
import { useAuth } from "@/hooks/use-login"

interface SidebarProps {
  isOpen: boolean
  onClose: () => void
  layoutKey: string
  menus: MenuItem[]
}

export default function Sidebar({
  isOpen,
  onClose,
  layoutKey,
  menus,
}: SidebarProps) {
  const pathname = usePathname()
  const parrams = useParams()
  const { user } = useAuth()

  const navigation = useRouter()
  if (pathname.includes("/dashboard/pessoas/") && !!parrams.user_id) {
    return (
      <>
        <S.Overlay $isOpen={isOpen} onClick={onClose} />
        <S.Container $isOpen={isOpen}>
          <S.Header>
            <S.OrgInfo>
              <S.OrgAvatar />
              <S.OrgName title={user?.empresa.nome}>
                {" "}
                {user?.empresa.nome && user?.empresa.nome}
              </S.OrgName>
            </S.OrgInfo>{" "}
            <S.CloseButton onClick={onClose}>
              <X size={20} />
            </S.CloseButton>
          </S.Header>

          <S.SearchContainer>
            <Search size={14} className="search-icon" />
            <input type="text" placeholder="Find..." />
            <S.KbdBadge>F</S.KbdBadge>
          </S.SearchContainer>

          <S.Content>
            <S.AnimatedMenuContainer key={layoutKey}>
              {menus.map((item) => {
                const isActive =
                  pathname === item.path || pathname.startsWith(item.path + "/")
                return (
                  <S.MenuItemLink
                    key={item.path}
                    $active={isActive}
                    onClick={(e) => {
                      navigation.push("/" + item.path)
                    }}
                  >
                    <S.IconWrapper $active={isActive}>
                      {item.icon}
                    </S.IconWrapper>
                    {item.name}
                  </S.MenuItemLink>
                )
              })}
            </S.AnimatedMenuContainer>
          </S.Content>

          <S.Footer>
            <S.UserProfile
              onClick={() =>
                navigation.push(
                  `/${user?.empresa.id}/dashboard/pessoas/${user?.id}`,
                )
              }
            >
              <S.UserAvatar>{user?.nome.charAt(0)}</S.UserAvatar>
              <S.UserName>{user?.nome}</S.UserName>
            </S.UserProfile>
            {/* <S.FooterActions>
              <LucideLogOut onClick={() => logout()} size={18} />
              <S.NotificationWrapper>
                <Bell size={18} />
                <S.NotificationDot />
              </S.NotificationWrapper>
            </S.FooterActions> */}
          </S.Footer>
        </S.Container>
      </>
    )
  } else return null
}
