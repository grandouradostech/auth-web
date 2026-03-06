"use client"
import styled, { css } from "styled-components"

export const Container = styled.div<{
  $iconSelectorOnly?: boolean
  $hasError?: boolean
}>`
  display: flex;
  flex-direction: column;
  max-width: 100%;
  gap: 8px;
  width: 100%;

  label {
    font-weight: 600;
    font-size: 1.5rem;
    font-family: var(--font-lato);
    color: ${({ theme }) => theme.colors.text};
    letter-spacing: 0.5px;
  }

  .error {
    color: ${({ theme }) => theme.colors.error};
    font-size: 1.3rem;
    font-weight: 700;
  }

  select {
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    height: 48px;
    padding: 12px 16px;
    font-size: 1.6rem;
    border: 1px solid
      ${({ theme, $hasError }) =>
        $hasError ? theme.colors.errorBorder : theme.colors.border};
    background-color: ${({ theme }) => theme.colors.surface};
    color: ${({ theme }) => theme.colors.text};
    outline: none;
    transition: border-color 0.2s;

    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
    }
  }

  ${({ $iconSelectorOnly }) =>
    $iconSelectorOnly &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 0;
      width: auto;

      label,
      .error {
        display: none;
      }

      select {
        height: auto;
        padding: 0 4px;
        background: transparent;
        border: none;
        font-size: 1.3rem;
        font-weight: 600;
        color: ${({ theme }) => theme.colors.text};
        cursor: pointer;
        appearance: none;
        &:focus {
          border: none;
        }

        option {
          background-color: ${({ theme }) => theme.colors.background};
          color: ${({ theme }) => theme.colors.text};
        }
      }
    `}
`
