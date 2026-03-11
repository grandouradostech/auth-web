"use client"

import ProviderReactToastfy from "./react-toastfy"
import StyledComponentsProvider from "./styled-componets"

export default function LayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <StyledComponentsProvider>
      <ProviderReactToastfy>{children}</ProviderReactToastfy>
    </StyledComponentsProvider>
  )
}
