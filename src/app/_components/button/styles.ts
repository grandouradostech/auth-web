"use client"
import styled, { css } from "styled-components"
import { ButtonVariant, ButtonFit, ConfirmType } from "."

interface ContainerProps {
  $variant: ButtonVariant
  $fit: ButtonFit
}

const variants = {
  primary: css`
    background-color: ${(e) => e.theme.colors.primary};
    color: #ffffff;
    font-weight: 500;
    border: 1px solid transparent;
    &:hover:not(:disabled) {
      filter: brightness(0.9);
    }
  `,
  outline: css`
    background-color: transparent;
    color: ${(e) => e.theme.colors.text};
    border: 1px solid ${(e) => e.theme.colors.text};

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
  ghost: css`
    background-color: transparent;
    color: ${(e) => e.theme.colors.text};
    border: 2px solid transparent;
    &:hover:not(:disabled) {
      background-color: ${(e) => e.theme.colors.surface};
    }
  `,
}

const fits = {
  full: css`
    width: 100%;
    min-width: 130px;

    padding: 0 40px;
  `,
  content: css`
    max-width: fit-content;
    min-width: 130px;
    padding: 0 24px;
  `,
  icon: css`
    aspect-ratio: 1/1;
    padding: 0;
    justify-content: center;
  `,
} as const

export const Container = styled.button<ContainerProps>`
  display: flex;
  align-items: center;
  white-space: nowrap;

  display: flex;
  gap: 5px;
  max-height: 40px;
  height: 40px;
  border-radius: ${(e) => e.theme.sizes.borderRadius};
  .icon,
  p {
    height: 100%;
    justify-content: center;
    align-items: center;
    display: flex;
  }
  .icon {
    height: 50%;
    min-width: 40px;
    aspect-ratio: 1/1;

    border-right: 1px solid ${(e) => e.theme.colors.text};
  }
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  align-items: center;
  justify-content: center;
  text-overflow: ellipsis;
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
  &:has(.icon) {
    padding: 0 !important;
    min-width: fit-content;
    max-width: fit-content;
    p {
      ${({ $fit }) => fits[$fit]}
    }
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px;
`

export const ModalContent = styled.div`
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  width: 100%;
  max-width: 450px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: modalIn 0.2s ease-out;

  @keyframes modalIn {
    from {
      opacity: 0;
      transform: scale(0.95);
    }
    to {
      opacity: 1;
      transform: scale(1);
    }
  }
`

export const ModalHeader = styled.div<{ $type?: ConfirmType }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: ${({ theme }) => theme.sizes.padding};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};

  color: ${({ theme, $type }) => {
    if ($type === "warning") return theme.colors.error
    if ($type === "password") return theme.colors.primary
    return theme.colors.text
  }};

  h3 {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const ModalBody = styled.div`
  padding: ${({ theme }) => theme.sizes.padding};
  display: flex;
  flex-direction: column;
  gap: 16px;

  p {
    font-size: 1.5rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.8;
  }
`

export const PasswordInput = styled.input`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.5rem;
  transition: all 0.2s;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.colors.primary};
  }

  &::placeholder {
    opacity: 0.4;
  }
`

export const ModalActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 12px;
  padding: 16px ${({ theme }) => theme.sizes.padding};
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};

  @media (max-width: 768px) {
    flex-direction: column-reverse;

    button {
      width: 100%;
    }
  }
`
