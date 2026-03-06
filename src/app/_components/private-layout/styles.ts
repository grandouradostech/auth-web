"use client"
import styled from "styled-components"

export const Container = styled.div`
  min-width: 100dvw;
  height: 100dvh;
  display: flex;
  background-color: ${(e) => e.theme.colors.background};

  main {
    width: 100dvw;
    min-height: calc(100dvh - 90px);
    display: flex;
    flex-direction: column;
    flex: 1;
    background: #0051;

    .main {
      display: flex;
      min-width: 100%;
      flex: 1;
      background-color: ${(e) => e.theme.colors.surface};
      /* overflow-y: auto; */
      padding: ${(e) => e.theme.sizes.padding};
      justify-content: center;

      .content {
        max-width: 1720px;
        width: 100%;
        /* padding: 0 20px; */
      }
    }
  }
`
