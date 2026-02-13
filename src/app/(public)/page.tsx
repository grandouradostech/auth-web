"use client"

import { Suspense } from "react";
import Login from ".";

export default function LoginPage() {


  return (
    <Suspense fallback={<>CArregando</>}>
      <Login />
    </Suspense>
  );
}