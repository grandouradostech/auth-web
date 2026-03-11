"use client"
import styled, { css } from "styled-components"

export const Container = styled.div<{
  $iconSelectorOnly?: boolean
}>`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;

  label {
    font-weight: 600;
    font-size: 1.4rem;
    color: ${(e) => e.theme.colors.text};
    letter-spacing: 0.3px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 40px;
    overflow: hidden;
    border-radius: ${(e) => e.theme.sizes.borderRadius};
    border: 1.5px solid ${(e) => e.theme.colors.border};
    background-color: ${(e) => e.theme.colors.surface};
    padding: 1px;
    min-width: 40%;
    max-width: fit-content;
    .input-icon {
      color: ${(e) => e.theme.colors.text};
      opacity: 0.7;
      aspect-ratio: 1/1;
      align-items: center;
      width: 40px;
      display: flex;
      justify-content: center;
      pointer-events: none;
    }

    &:focus-within {
      border-color: ${(e) => e.theme.colors.primary};
      box-shadow: 0 0 0 3px ${(e) => e.theme.colors.outline};
    }

    &.has-error {
      border-color: ${(e) => e.theme.colors.error};
      &:focus-within {
        box-shadow: 0 0 0 3px ${(e) => e.theme.colors.errorBorder};
      }
    }
  }

  select {
    width: 100%;
    min-height: 100%;
    padding: 0 36px 0 8px;
    outline: none;
    border: none;
    background: transparent;
    color: ${(e) => e.theme.colors.text};
    appearance: none;
    cursor: pointer;
    font-size: 1.4rem;

    option {
      background-color: ${(e) => e.theme.colors.surface};
      color: ${(e) => e.theme.colors.text};
    }
  }

  .select-arrow {
    position: absolute;
    right: 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    pointer-events: none;
    color: ${(e) => e.theme.colors.text};
    opacity: 0.5;
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 4px;
    color: ${(e) => e.theme.colors.error};
    font-size: 1.2rem;
    font-weight: 500;
    margin-top: 2px;
    background-color: transparent;
    padding: 1rem;
    border-radius: ${(e) => e.theme.sizes.borderRadius};
    border: 1px solid ${(e) => e.theme.colors.errorBorder};
    text-align: center;
  }

  ${({ $iconSelectorOnly }) =>
    $iconSelectorOnly &&
    css`
      flex-direction: row;
      align-items: center;
      gap: 0;
      width: auto;

      label,
      .error-message {
        display: none;
      }

      .input-wrapper {
        border: none;
        background: transparent;
        height: auto;
        padding: 0;

        &:focus-within {
          box-shadow: none;
          border-color: transparent;
        }
      }

      select {
        height: auto;
        padding: 0 24px 0 4px;
        font-size: 1.3rem;
        font-weight: 600;
      }

      .select-arrow {
        right: 4px;
      }
    `}
`
