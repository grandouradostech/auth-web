"use client"
import Link from "next/link"
import styled from "styled-components"

export const CardItemContainer = styled(Link)<{ $background_image?: string }>`
  display: flex;
  flex-direction: column;
  height: 300px;
  min-width: 600px;
  max-width: 600px;
  ${(e) =>
    e.$background_image
      ? `background-image: url(${e.$background_image});`
      : `background-color: #000`};
  background-size: cover;
  border-radius: ${(e) => e.theme.sizes.borderRadius};
  overflow: hidden;
  background-blend-mode: color-burn;
  padding: 35px;
  background-position: 100%;
  background-color: #0d141f99;
  display: flex;
  backdrop-filter: blur(4px);
  border-radius: ${(e) => e.theme.sizes.borderRadius};
  gap: 10px;
  justify-content: flex-end;
  flex: 1;
  flex-direction: column;

  h2 {
    font-size: 2.9rem;
    font-weight: bolder;
  }

  .config_app_button {
    height: 45px;
    width: 50%;
    border-radius: ${(e) => e.theme.sizes.borderRadius};
    border: none;
    font-weight: 700;
    letter-spacing: 0.5px;
    font-size: 1.7rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    background-color: #fff !important;

    color: #000;
    font-weight: 700 !important;
    font-size: 2.1rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    mix-blend-mode: screen !important;
  }

  svg {
    color: #000;
    mix-blend-mode: screen;
  }

  .badge {
    font-size: 1.3rem;
    color: ${(e) => e.theme.colors.text};
    filter: invert(100);
    max-width: fit-content;
    font-weight: 800;
    letter-spacing: 0.3px;
    margin-bottom: -5px;
  }
`

export const CardListContainer = styled.ul`
  gap: 30px;
  overflow-x: scroll;
  display: flex;
  list-style: none;
  padding-right: 20px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
  scrollbar-width: none;
`
