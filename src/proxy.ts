import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  const cookieObj = request.cookies.get("token")
  const tokenCookie = cookieObj?.value

  const { pathname } = request.nextUrl

  const isPublicRoute =
    pathname === "/" || pathname.startsWith("/_next") || pathname.includes(".")

  if (!tokenCookie && !isPublicRoute) {
    return redirectToLogin(request)
  }

  if (tokenCookie) {
    if (isJwtExpired(tokenCookie)) {
      const response = redirectToLogin(request)
      response.cookies.delete("token")
      return response
    }

    if (pathname === "/") {
      return NextResponse.redirect(new URL("/dashboard", request.url))
    }
  }

  return NextResponse.next()
}

function isJwtExpired(token: string): boolean {
  try {
    const base64Url = token.split(".")[1]
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/")
    const jsonPayload = atob(base64)
    const { exp } = JSON.parse(jsonPayload)

    if (!exp) return false

    return Date.now() >= exp * 1000
  } catch {
    return true
  }
}

function redirectToLogin(request: NextRequest) {
  const url = new URL("/", request.url)
  return NextResponse.redirect(url)
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
