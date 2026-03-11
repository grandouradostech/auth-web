import { Suspense } from "react"
import AppOverview from "."
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getAppBySlug } from "@/services/http/apps"
import Loading from "@/app/_components/loading"
import UserPermissions from "."

const queryClient = new QueryClient()
export default async function ({
  params,
}: {
  params: { user_id: string; empresa_id: string }
}) {
  const { user_id, empresa_id } = await params

  await queryClient.prefetchQuery({
    queryKey: ["roles"],
    queryFn: () => getAppBySlug(user_id),
  })
  await queryClient.prefetchQuery({
    queryKey: ["permicoes"],
    queryFn: () => getAppBySlug(user_id),
  })
  await queryClient.prefetchQuery({
    queryKey: ["permicoes", "user", user_id],
    queryFn: () => getAppBySlug(user_id),
  })
  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <UserPermissions params={{ user_id, empresa_id }} />
      </HydrationBoundary>
    </Suspense>
  )
}
