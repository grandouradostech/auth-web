"use client"
import styled, { keyframes } from "styled-components"

const rotate = keyframes`
  100% { transform: rotate(360deg); }
`

const dash = keyframes`
  0% {
    stroke-dasharray: 1, 150;
    stroke-dashoffset: 0;
  }
  50% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -35;
  }
  100% {
    stroke-dasharray: 90, 150;
    stroke-dashoffset: -124;
  }
`

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 100%;
  height: 100%;
  background: transparent;
`

export const SaaSLoader = styled.svg`
  animation: ${rotate} 2s linear infinite;
  width: 50px;
  height: 50px;
`

export const LoaderCircle = styled.circle`
  stroke: #cd533b;
  stroke-linecap: round;
  animation: ${dash} 1.5s ease-in-out infinite;
`
