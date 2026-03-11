"use client"
import styled from "styled-components"

export const Container = styled.div`
  height: 100px;

  display: flex;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  min-width: 100%;
  justify-content: center;
  h1 {
    color: ${(e) => e.theme.colors.text};
    font-weight: bolder;
    font-size: 3%.2;
  }
  p {
    color: ${(e) => e.theme.colors.text};
    font-weight: 600;
    font-size: 1.5rem;
    opacity: 0.7;
  }
`
