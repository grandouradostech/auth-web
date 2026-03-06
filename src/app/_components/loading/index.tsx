"use client"

import React from "react"
import * as S from "./styles"

export default function Loading() {
  return (
    <S.Wrapper>
      <S.SaaSLoader viewBox="0 0 50 50">
        <S.LoaderCircle cx="25" cy="25" r="20" fill="none" strokeWidth="5" />
      </S.SaaSLoader>
    </S.Wrapper>
  )
}
