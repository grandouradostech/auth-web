import { Suspense } from "react"
import Registro from "."

import Loading from "@/app/_components/loading"

export default async function () {
  return (
    <Suspense fallback={<Loading />}>
      <Registro />
    </Suspense>
  )
}
