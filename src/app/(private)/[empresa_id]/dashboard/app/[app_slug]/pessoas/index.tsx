"use client"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import { useQuery } from "@tanstack/react-query"
import { getAppUsersBySlug } from "@/services/http/apps"
import { IUsersApp } from "@/types/app"
import AppNotFound from "@/app/_components/not-found/app"
import Loading from "@/app/_components/loading"
import { UserListTable } from "./useListTable"

type IDataType =
  | {
      usuarios: IUsersApp
    }
  | { code: string }

export default function AppOverview({ app_slug }: { app_slug: string }) {
  const app_fetch = useQuery<IDataType>({
    queryKey: ["app", app_slug, "usuarios"],
    queryFn: async () => await getAppUsersBySlug(app_slug),
  })

  if (app_fetch.isLoading || app_fetch.isFetching) {
    return <Loading />
  }

  if (app_fetch.error) {
    return <AppNotFound />
  }
  if (app_fetch.data && "usuarios" in app_fetch.data) {
    return (
      <S.Container>
        <HeaderText description={""}>Usuarios</HeaderText>
        <UserListTable usuarios={app_fetch.data.usuarios} />
      </S.Container>
    )
  }
}
