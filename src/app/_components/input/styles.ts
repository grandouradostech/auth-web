// styles.ts
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 100%;
  label {
    font-weight: 600;
    font-size: 1.4rem;
    color: #202e30;
    letter-spacing: 0.3px;
  }

  .input-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    width: 100%;
    height: 45px;
    border-radius: 4px;
    border: 1.5px solid #202e30;
    background-color: #fff;
    transition: all 0.2s ease-in-out;
    padding: 1px 12px;
    &:focus {
      border-color: #202e30;
      box-shadow: 0 0 0 3px rgba(32, 46, 48, 0.1);
    }

    &.has-error {
      border-color: #ff3737;
      &:focus {
        box-shadow: 0 0 0 3px rgba(255, 55, 55, 0.1);
      }
    }
  }

  input {
    width: 100%;
    min-height: 100%;
    padding: 12px;
    outline: none;
    border: none;
    background: none;

    &::placeholder {
      color: #a0aec0;
    }
  }

  .error-message {
    display: flex;
    align-items: center;
    gap: 4px;
    color: #ff3737;
    font-size: 0.875rem;
    font-weight: 500;
    margin-top: 2px;
  }
`
