import PrivateLayoutProvider from "../_components/private-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <PrivateLayoutProvider>{children}</PrivateLayoutProvider>
}
