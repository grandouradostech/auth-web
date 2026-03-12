"use client"
import HeaderText from "@/app/_components/header"
import * as S from "./styles"
import { useQuery, keepPreviousData } from "@tanstack/react-query"
import { UserListTable } from "./useListTable"
import { getUsers } from "@/services/http/users"
import Input from "@/app/_components/input"
import { ArrowRight, UserPlus, UserSearch } from "lucide-react"
import { AlertLineBox } from "@/app/_components/alert-line-box"
import { Pagination } from "@/app/_components/pagination"
import { useSearchParams, useRouter, usePathname } from "next/navigation"
import { useState, useEffect, useCallback, Suspense } from "react"
import Loading from "@/app/_components/loading"
import { AppError } from "@/app/_components/errors/module-not-found"

export default function AppOverview() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const pathname = usePathname()

  const page = Number(searchParams.get("page")) || 1
  const perPage =
    Number(searchParams.get("perPage")) > 10
      ? 10
      : Number(searchParams.get("perPage")) || 10

  const nomeQuery = searchParams.get("nome") || ""

  const [searchTerm, setSearchTerm] = useState(nomeQuery)

  const createQueryString = useCallback(
    (name: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(name, value)
      } else {
        params.delete(name)
      }
      params.set("page", "1")
      return params.toString()
    },
    [searchParams],
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchTerm !== nomeQuery) {
        router.push(pathname + "?" + createQueryString("nome", searchTerm))
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, nomeQuery, pathname, router, createQueryString])

  const user_fetch = useQuery({
    queryKey: ["app", "usuarios", page, perPage, nomeQuery],
    queryFn: async () => await getUsers(page, perPage, nomeQuery),
    placeholderData: keepPreviousData,
  })

  if (user_fetch.error) {
    return <AppError />
  }

  return (
    <S.Container>
      <HeaderText
        description={"Vizualize e gerencie as pessoas da sua organização"}
      >
        Pessoas
      </HeaderText>
      <AlertLineBox
        icon={<UserPlus />}
        actionVariant="primary"
        actionNavigate={`${pathname}/registro`}
        actionContent={
          <>
            Adicionar <ArrowRight size={16} />
          </>
        }
        message="Adicione um usuário a sua base de dados"
      />
      <Input
        icon={<UserSearch size={20} className="input-icon" />}
        label="Buscar"
        placeholder="Buscar por nome ou e-mail..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      <UserListTable
        isLoading={user_fetch.isFetching}
        usuarios={user_fetch.data?.items || []}
      />
      <Suspense fallback={<Loading />}>
        {user_fetch.data && (
          <Pagination
            page={user_fetch.data.page}
            perPage={user_fetch.data.perPage}
            total={user_fetch.data.total}
            totalPages={user_fetch.data.totalPages}
          />
        )}
      </Suspense>
    </S.Container>
  )
}
