"use client"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import { useQuery } from "@tanstack/react-query"
import { getAppBySlug } from "@/services/http/apps"
import { IApp } from "@/types/app"
import AppNotFound from "@/app/_components/not-found/app"
import Loading from "@/app/_components/loading"

type IDataType =
  | {
      app: IApp
    }
  | { code: string }

export default function AppOverview({ app_slug }: { app_slug: string }) {
  const app_fetch = useQuery<IDataType>({
    queryKey: ["app", app_slug],
    queryFn: async () => await getAppBySlug(app_slug),
  })

  if (app_fetch.isLoading || app_fetch.isFetching) {
    return <Loading />
  }

  if (app_fetch.error) {
    return <AppNotFound />
  }
  if (app_fetch.data && "app" in app_fetch.data) {
    return (
      <S.Container>
        <HeaderText description={app_fetch.data.app.nome}>
          {app_fetch.data.app.nome}
        </HeaderText>
      </S.Container>
    )
  }
}
