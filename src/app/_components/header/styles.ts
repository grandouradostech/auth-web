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
    font-size: 3.8rem;
  }
  p {
    color: ${(e) => e.theme.colors.text};
    font-weight: bolder;
    font-size: 2rem;
    opacity: 0.7;
  }
`
