import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export default function proxy(request: NextRequest) {
  // CORREÇÃO: No Middleware, usa-se request.cookies.get()
  const cookieObj = request.cookies.get("@Auth-Core:Token")
  const tokenCookie = cookieObj?.value // Aqui pegamos o valor da string

  console.log(cookieObj?.name)
  const { pathname } = request.nextUrl

  const isPublicRoute =
    pathname === "/" || pathname.startsWith("/_next") || pathname.includes(".")

  // Se não houver cookie e não for rota pública, barra
  if (!tokenCookie && !isPublicRoute) {
    return redirectToLogin(request)
  }

  if (tokenCookie) {
    // Validação do JWT
    if (isJwtExpired(tokenCookie)) {
      return redirectToLogin(request)
    }

    // Se logado e na raiz, manda para o dashboard
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
    // atob é suportado no Edge Runtime do Next.js
    const jsonPayload = atob(base64)
    const { exp } = JSON.parse(jsonPayload)

    if (!exp) return false

    // exp está em segundos, Date.now() em milissegundos
    return Date.now() >= exp * 1000
  } catch {
    return true // Se o token estiver malformado, considera expirado
  }
}

function redirectToLogin(request: NextRequest) {
  const url = new URL("/", request.url)
  const response = NextResponse.redirect(url)

  // Limpa o cookie forçando expiração
  response.cookies.set("@Auth-Core:Token", "", {
    domain: ".granddos.tech",
    path: "/",
    maxAge: 0,
  })

  return response
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
}
