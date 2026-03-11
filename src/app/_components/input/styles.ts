"use client"
import styled from "styled-components"

export const Container = styled.div`
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
    /* transition: all 0.2s ease-in-out; */
    padding: 1px;

    .input-icon {
      color: ${(e) => e.theme.colors.text};
      opacity: 0.7;

      aspect-ratio: 1/1;
      align-items: center;
      width: 40px;
      display: flex;
      justify-content: center;
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

  input {
    width: 100%;
    min-height: 100%;
    padding: 0 8px;
    outline: none;
    border: none;
    background: none;
    color: ${(e) => e.theme.colors.text};
    /* padding: 4px; */

    &::placeholder {
      color: ${(e) => e.theme.colors.text};
      opacity: 0.5;
    }
  }

  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${(e) => e.theme.colors.text};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${(e) => e.theme.colors.surface};
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
`
