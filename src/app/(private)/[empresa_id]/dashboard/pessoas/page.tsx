import { Suspense } from "react"
import UserOverview from "."
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Loading from "@/app/_components/loading"
import { getUsers } from "@/services/http/users"

export default async function () {
  const queryClient = new QueryClient()

  await queryClient.prefetchQuery({
    queryKey: ["app", "usuarios", 1, 10, ""],
    queryFn: () => getUsers(1, 10, ""),
  })

  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserOverview />
      </HydrationBoundary>
    </Suspense>
  )
}
