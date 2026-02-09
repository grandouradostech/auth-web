"use client"
import { useState } from "react";
import Navbar from "../navbar";
import { Container } from "./styles";

export default function PrivateLayoutProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <Container>
      <Navbar />
      <main>
        {children}
      </main>
    </Container>
  );
}