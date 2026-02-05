import type { Metadata } from "next";
import { Work_Sans } from "next/font/google";
import LayoutProvider from "./_components/providers/layout-provider";

const work_sans = Work_Sans({
  variable: "--font-work-sans",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "GD HUB",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt">
      <body className={`${work_sans.variable}`}>
        <LayoutProvider>

          {children}
        </LayoutProvider>
      </body>
    </html>
  );
}
