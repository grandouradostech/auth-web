"use client"
import styled, { css } from "styled-components"
import { ButtonVariant, ButtonFit } from "."

interface ContainerProps {
  $variant: ButtonVariant
  $fit: ButtonFit
}

const variants = {
  primary: css`
    background-color: ${(e) => e.theme.colors.primary};
    color: #ffffff;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${(e) => e.theme.colors.text};
    border: 2px solid ${(e) => e.theme.colors.text};
    &:hover:not(:disabled) {
      background-color: ${(e) => e.theme.colors.surface};
    }
  `,
  secondary: css`
    background-color: ${(e) => e.theme.colors.surface};
    color: ${(e) => e.theme.colors.text};
    border: 1px solid ${(e) => e.theme.colors.border};
    &:hover:not(:disabled) {
      background-color: ${(e) => e.theme.colors.outline};
    }
  `,
}

const fits = {
  full: css`
    width: 100%;
    padding: 0 40px;
  `,
  content: css`
    width: auto;
    padding: 0 24px;
  `,
  icon: css`
    aspect-ratio: 1/1;
    padding: 0;
    justify-content: center;
  `,
}

export const Container = styled.button<ContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;

  max-height: 40px;
  height: 40px;
  border-radius: ${(e) => e.theme.sizes.borderRadius};

  font-size: 1.5rem;
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  ${({ $variant }) => variants[$variant]}

  ${({ $fit }) => fits[$fit]}

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    transform: none;
  }
`
