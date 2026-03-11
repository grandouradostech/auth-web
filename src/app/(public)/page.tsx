import { Suspense } from "react"
import Login from "."
import Loading from "../_components/loading"

export default function LoginPage() {
  return (
    <Suspense fallback={<Loading />}>
      <>
        <Login />
      </>
    </Suspense>
  )
}
