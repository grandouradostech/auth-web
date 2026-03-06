"use client"

import { Suspense, useState } from "react"
import { usePathname, useParams } from "next/navigation"
import Navbar from "../navbar"
import Sidebar from "../sidebar"
import { Container } from "./styles"
import { getLayoutConfig } from "@/config/route-map"
import Loading from "../loading"

export default function PrivateLayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const pathname = usePathname()
  const params = useParams()

  const empresa_id = (params?.empresa_id as string) || ""
  const app_slug = (params?.app_slug as string) || ""

  const { layoutKey, sidebarMenus, navbarProps } = getLayoutConfig(pathname, {
    empresa_id,
    app_slug,
  })
  return (
    <Container>
      <Sidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        layoutKey={layoutKey}
        menus={sidebarMenus}
      />
      <main>
        <Navbar onOpenSidebar={() => setIsSidebarOpen(true)} {...navbarProps} />
        <div className="main">
          <Suspense fallback={<Loading />}>
            <div className="content">{children}</div>
          </Suspense>
        </div>
      </main>
    </Container>
  )
}
