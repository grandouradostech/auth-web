import { Suspense } from "react"
import DashboardOverview from "."
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { geApps } from "@/services/http/apps"
import Loading from "@/app/_components/loading"

const queryClient = new QueryClient()
export default async function ({ params }: { params: { empresa_id: string } }) {
  await queryClient.prefetchQuery({
    queryKey: ["apps"],
    queryFn: geApps,
  })
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Suspense fallback={<Loading />}>
        <DashboardOverview params={params} />
      </Suspense>
    </HydrationBoundary>
  )
}
