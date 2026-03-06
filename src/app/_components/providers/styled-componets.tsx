"use client"

import { ThemeProvider } from "@/context/theme"
import { GlobalStyles } from "@/global/styles"
import StyledComponentsRegistry from "@/services/registry"

export default function StyledComponentsProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StyledComponentsRegistry>
      <ThemeProvider>
        <GlobalStyles />
        {children}
      </ThemeProvider>
    </StyledComponentsRegistry>
  )
}
