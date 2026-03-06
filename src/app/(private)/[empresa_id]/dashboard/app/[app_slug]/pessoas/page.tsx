import { Suspense } from "react"
import AppOverview from "."
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query"
import { getAppUsersBySlug } from "@/services/http/apps"
import Loading from "@/app/_components/loading"

const queryClient = new QueryClient()
export default async function ({ params }: { params: { app_slug: string } }) {
  const { app_slug } = await params

  await queryClient.prefetchQuery({
    queryKey: ["app", app_slug, "usuarios"],
    queryFn: () => getAppUsersBySlug(app_slug),
  })
  return (
    <Suspense fallback={<Loading />}>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <AppOverview app_slug={app_slug} />
      </HydrationBoundary>
    </Suspense>
  )
}
