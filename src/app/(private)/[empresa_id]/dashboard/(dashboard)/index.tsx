"use client"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import { CardList } from "./cards"
import { useQuery } from "@tanstack/react-query"
import { geApps } from "@/services/http/apps"

export default function DashboardOverview({
  params,
}: {
  params: { empresa_id: string }
}) {
  const apps = useQuery({
    queryKey: ["apps"],
    queryFn: geApps,
  })
  return (
    <S.Container>
      <HeaderText description="Apps contratados pela sua organização">
        Meus App's
      </HeaderText>
      <CardList data={apps.data} />
    </S.Container>
  )
}
