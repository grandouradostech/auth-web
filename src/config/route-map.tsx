import React from "react"
import {
  LayoutGrid,
  Zap,
  Users,
  Shield,
  FileText,
  Ticket,
  Settings,
  CreditCard,
  History,
  Activity,
  Key,
  ShoppingBag,
  PlusCircle,
  TrendingUp,
} from "lucide-react"

export interface MenuItem {
  name: string
  path: string
  icon?: React.ReactNode
}

export interface LayoutConfig {
  layoutKey: string
  sidebarMenus: MenuItem[]
  navbarProps: {
    title: string
    showAppSelector: boolean
    showBackButton?: boolean
    appSlug?: string
  }
}

export function getLayoutConfig(
  pathname: string,
  params: { empresa_id: string; app_slug?: string },
): LayoutConfig {
  const basePath = `${params.empresa_id}/dashboard/pessoas`
  const appSelectorProps = { showAppSelector: true }

  const pessoasSegment = pathname.split("/pessoas/")[1]
  const userId = pessoasSegment ? pessoasSegment.split("/")[0] : null

  if (userId) {
    return {
      layoutKey: `menu-usuario-${userId}`,
      sidebarMenus: [
        {
          name: "Informações Gerais",
          path: `${basePath}/${userId}`,
          icon: <FileText size={18} />,
        },
        {
          name: "Aplicações",
          path: `${basePath}/${userId}/apps`,
          icon: <LayoutGrid size={18} />,
        },
        {
          name: "Permissões",
          path: `${basePath}/${userId}/permissoes`,
          icon: <Shield size={18} />,
        },
        {
          name: "Atividades e Histórico",
          path: `${basePath}/${userId}/historico`,
          icon: <History size={18} />,
        },
      ],
      navbarProps: {
        title: "Perfil do Usuário",
        ...appSelectorProps,
        showBackButton: true,
      },
    }
  }

  if (pathname.includes(basePath + "app/") && params.app_slug) {
    return {
      layoutKey: `app-menu-${params.app_slug}`,
      sidebarMenus: [
        {
          name: "Overview",
          path: `${basePath}/app/${params.app_slug}/overview`,
          icon: <LayoutGrid size={18} />,
        },
        {
          name: "API Keys",
          path: `${basePath}/app/${params.app_slug}/keys`,
          icon: <Key size={18} />,
        },
        {
          name: "Configurações",
          path: `${basePath}/app/${params.app_slug}/settings`,
          icon: <Settings size={18} />,
        },
      ],
      navbarProps: {
        title: "Gestão do Módulo",
        showAppSelector: true,
        showBackButton: true,
        appSlug: params.app_slug,
      },
    }
  }

  if (pathname.includes("/complementos")) {
    return {
      layoutKey: "menu-complementos",
      sidebarMenus: [
        {
          name: "Recursos Disponíveis",
          path: `${basePath}/complementos/disponiveis`,
          icon: <PlusCircle size={18} />,
        },
        {
          name: "Upgrade de Limites",
          path: `${basePath}/complementos/upgrade`,
          icon: <TrendingUp size={18} />,
        },
        {
          name: "IA Power-ups",
          path: `${basePath}/complementos/ia`,
          icon: <Zap size={18} />,
        },
        {
          name: "Meus Add-ons",
          path: `${basePath}/complementos/meus`,
          icon: <LayoutGrid size={18} />,
        },
      ],
      navbarProps: {
        title: "Complementos & Upsell",
        ...appSelectorProps,
        showBackButton: true,
      },
    }
  }

  if (pathname.includes("/loja")) {
    return {
      layoutKey: "menu-loja",
      sidebarMenus: [
        {
          name: "Explorar Apps",
          path: `${basePath}/loja/explorar`,
          icon: <ShoppingBag size={18} />,
        },
        {
          name: "Mais Vendidos",
          path: `${basePath}/loja/populares`,
          icon: <TrendingUp size={18} />,
        },
        {
          name: "Categorias",
          path: `${basePath}/loja/categorias`,
          icon: <LayoutGrid size={18} />,
        },
        {
          name: "Solicitar App Custom",
          path: `${basePath}/loja/request`,
          icon: <FileText size={18} />,
        },
      ],
      navbarProps: {
        title: "Marketplace de Aplicações",
        ...appSelectorProps,
        showBackButton: true,
      },
    }
  }

  if (pathname.includes("/pagamentos")) {
    return {
      layoutKey: "menu-pagamentos",
      sidebarMenus: [
        {
          name: "Resumo Financeiro",
          path: `${basePath}/pagamentos/overview`,
          icon: <Activity size={18} />,
        },
        {
          name: "Plano e Assinatura",
          path: `${basePath}/pagamentos/planos`,
          icon: <Zap size={18} />,
        },
        {
          name: "Faturas",
          path: `${basePath}/pagamentos/faturas`,
          icon: <History size={18} />,
        },
        {
          name: "Métodos de Pagamento",
          path: `${basePath}/pagamentos/metodos`,
          icon: <CreditCard size={18} />,
        },
      ],
      navbarProps: {
        title: "Financeiro",
        ...appSelectorProps,
        showBackButton: true,
      },
    }
  }

  if (pathname.includes("/regras") || pathname.includes("/usuarios")) {
    return {
      layoutKey: "menu-seguranca",
      sidebarMenus: [
        {
          name: "Usuários",
          path: `${basePath}/usuarios`,
          icon: <Users size={18} />,
        },
        {
          name: "Permissões",
          path: `${basePath}/regras`,
          icon: <Shield size={18} />,
        },
        {
          name: "Auditoria",
          path: `${basePath}/regras/audit`,
          icon: <FileText size={18} />,
        },
      ],
      navbarProps: {
        title: "Segurança & Acessos",
        ...appSelectorProps,
        showBackButton: true,
      },
    }
  }

  return {
    layoutKey: "main-dashboard",
    sidebarMenus: [
      {
        name: "Meus Apps",
        path: `${basePath}`,
        icon: <LayoutGrid size={18} />,
      },
      {
        name: "Pessoas",
        path: `${basePath}/pessoas`,
        icon: <Users size={18} />,
      },
      // {
      //   name: "Loja de Apps",
      //   path: `${basePath}/loja/explorar`,
      //   icon: <ShoppingBag size={18} />,
      // },
      // {
      //   name: "Complementos",
      //   path: `${basePath}/complementos/disponiveis`,
      //   icon: <PlusCircle size={18} />,
      // },
      // {
      //   name: "Financeiro",
      //   path: `${basePath}/pagamentos/overview`,
      //   icon: <CreditCard size={18} />,
      // },
      // {
      //   name: "Segurança",
      //   path: `${basePath}/usuarios`,
      //   icon: <Shield size={18} />,
      // },
      // {
      //   name: "Suporte",
      //   path: `${basePath}/chamados`,
      //   icon: <Ticket size={18} />,
      // },
      // {
      //   name: "Definições",
      //   path: `${basePath}/perfil`,
      //   icon: <Settings size={18} />,
      // },
    ],
    navbarProps: {
      title: "Consola de Gestão",
      showAppSelector: true,
    },
  }
}
