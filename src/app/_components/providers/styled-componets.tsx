'use client'

import { GlobalStyles } from "@/global/styles";
import StyledComponentsRegistry from "@/services/registry";

export default function StyledComponentsProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <StyledComponentsRegistry>

      <GlobalStyles />
      {children}
    </StyledComponentsRegistry>

  );
}
