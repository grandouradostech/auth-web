"use client"
import styled from "styled-components"

export const Container = styled.div`
  min-width: 100dvw;
  height: 100dvh;
  display: flex;
  background-color: ${(e) => e.theme.colors.background};

  main {
    width: 100dvw;
    height: calc(100dvh);
    display: flex;
    flex-direction: column;
    flex: 1;
    overflow: auto;

    .main {
      display: flex;
      min-width: 100%;
      flex: 1;
      min-height: 100%;

      /* background-color: ${(e) => e.theme.colors.surface}; */
      /* overflow-y: auto; */
      padding: ${(e) => e.theme.sizes.padding};
      justify-content: center;

      .content {
        max-width: 1400px;
        width: 100%;
        min-height: 100%;
        padding: 0 20px;
      }
    }
  }
  @media (max-width: 700px) {
    .main {
      padding: ${(e) => e.theme.sizes.padding} 0 0 0 !important;
      .content {
        padding: 0 ${(e) => e.theme.sizes.padding} !important;
      }
    }
  }
`
