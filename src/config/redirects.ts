export const REDIRECT_MAP: Record<string, string | any> = {
  chamados: "/apps/support/tickets",
  docs: "/apps/documentation",
  usuarios: "/admin/users",
  frota: process.env.NEXT_PUBLIC_FROTAS_URL,
  default: "/dashboard",
}
