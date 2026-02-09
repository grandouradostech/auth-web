"use client"
import styled from "styled-components"

export const Container = styled.div`
  min-width: 100dvw;
  height: 100dvh;

  main {
    width: 100%;
    min-height: calc(100dvh - 90px);
    display: flex;

    .main {
      width: 100%;
      background-color: #f0f0f3;
      border-top-left-radius: 10px;
      transition: all 0.3s ease-in-out;
    }
  }
`
