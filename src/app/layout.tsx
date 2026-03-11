import type { Metadata } from "next"
import { Work_Sans } from "next/font/google"
import LayoutProvider from "./_components/providers/layout-provider"
import { AuthProvider } from "@/context/auth"
import ProviderQueryClient from "./_components/providers/react-query"
import { SudoProvider } from "./_components/providers/sudo-provider"
import { Suspense } from "react"
import Loading from "./_components/loading"
import StyledComponentsProvider from "./_components/providers/styled-componets"
import ProviderReactToastfy from "./_components/providers/react-toastfy"
import StyledComponentsRegistry from "@/services/registry"
import { ThemeProvider } from "@/context/theme"
import { GlobalStyles } from "@/global/styles"

const work_sans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "GD HUB",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt">
      <body className={`${work_sans.variable}`}>
        <Suspense fallback={<Loading />}>
          <ProviderQueryClient>
            <AuthProvider>
              <SudoProvider>
                <StyledComponentsRegistry>
                  <ThemeProvider>
                    <GlobalStyles />
                    <ProviderReactToastfy>{children}</ProviderReactToastfy>
                  </ThemeProvider>
                </StyledComponentsRegistry>
              </SudoProvider>
            </AuthProvider>
          </ProviderQueryClient>
        </Suspense>
      </body>
    </html>
  )
}
