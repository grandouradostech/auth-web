interface BreadcrumbItem {
  label: string
  href: string
  isLast: boolean
}

export function generateBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const paths = pathname.split("/").filter(Boolean)
  const breadcrumbs: BreadcrumbItem[] = []
  let href = ""

  paths.forEach((path, index) => {
    href += `/${path}`

    const isUUID =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
        path,
      )

    if (isUUID || path === "dashboard") {
      if (index === paths.length - 1) {
        breadcrumbs.push({
          label: "Overview",
          href,
          isLast: true,
        })
      }
      return
    }

    const labelMapping: { [key: string]: string } = {
      uso: "Métricas de Uso",
      usuarios: "Usuários",
      logs: "Logs",
      analytics: "Analytics",
      chamados: "Chamados",
      regras: "Regras",
      perfil: "Perfil",
      pessoas: "Pessoas",
      overview: "Overview",
      settings: "Configurações",
      roles: "Roles e Regras",
      loja: "Loja de Apps",
      complementos: "Complementos",
    }

    let label = labelMapping[path]

    if (!label) {
      label = path.charAt(0).toUpperCase() + path.slice(1).replace(/-/g, " ")
    }

    breadcrumbs.push({
      label,
      href,
      isLast: index === paths.length - 1,
    })
  })

  return breadcrumbs
}
