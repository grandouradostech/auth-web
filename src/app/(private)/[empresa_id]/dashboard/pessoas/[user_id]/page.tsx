import { Suspense } from "react"
import AppOverview from "."
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import Loading from "@/app/_components/loading"
import { getUserbyId } from "@/services/http/users"

const queryClient = new QueryClient()
export default async function ({ params }: { params: { user_id: string } }) {
  const { user_id } = await params

  await queryClient.prefetchQuery({
    queryKey: ["user", user_id],
    queryFn: () => getUserbyId(user_id),
  })
  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppOverview user_id={user_id} />
      </HydrationBoundary>
    </Suspense>
  )
}
