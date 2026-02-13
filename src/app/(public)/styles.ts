import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #ffffff;
  font-family:
    "Inter",
    -apple-system,
    BlinkMacSystemFont,
    "Segoe UI",
    Roboto,
    Helvetica,
    Arial,
    sans-serif;
  font-size: 62.5%;
  color: #202e30;

  * {
    box-sizing: border-box;
  }
`

export const FormSide = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4rem;
  background-color: #ffffff;
  position: relative;

  .content-wrapper {
    width: 100%;
    max-width: 38rem;
    display: flex;
    flex-direction: column;
    gap: 2.4rem;
  }

  .logo-area {
    margin-bottom: 2rem;
    color: #202e30;

    svg {
      width: 4.8rem;
      height: 4.8rem;
    }
  }

  h1 {
    font-size: 2.8rem;
    font-weight: 900;
    color: #202e30;
    letter-spacing: -0.05rem;
    margin: 0;
  }

  p.subtitle {
    font-size: 1.5rem;
    color: #5f6c7b;
    margin: 0.8rem 0 0 0;
    line-height: 1.5;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 1.6rem;
    width: 100%;
    margin-top: 1.2rem;
  }

  .form-options {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 1.3rem;
    margin-top: 0.4rem;

    label {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      color: #5f6c7b;
      cursor: pointer;
      font-weight: 400;
    }

    input[type="checkbox"] {
      width: 1.6rem;
      height: 1.6rem;
      border-radius: 4px;
      border: 1px solid #cbd5e1;
      accent-color: #202e30;
      margin: 0;
    }

    a {
      color: #202e30;
      text-decoration: none;
      font-weight: 600;

      &:hover {
        text-decoration: underline;
      }
    }
  }

  .select-tenant {
    width: 100%;
    padding: 1.2rem;
    border: 1px solid #e2e8f0;
    border-radius: 4px;
    font-size: 1.5rem;
    background-color: #ffffff;
    color: #202e30;
    cursor: pointer;
    appearance: none;
    background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%23202E30' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
    background-repeat: no-repeat;
    background-position: right 1.2rem center;
    background-size: 1.6rem;

    &:focus {
      outline: none;
      border-color: #202e30;
    }
  }

  .back-button {
    background: transparent;
    border: none;
    color: #5f6c7b;
    font-size: 1.4rem;
    cursor: pointer;
    margin-top: 1.6rem;
    padding: 0.8rem;
    width: 100%;
    text-align: center;
    font-weight: 500;

    &:hover {
      color: #202e30;
    }
  }

  .error-message {
    color: #d93025;
    font-size: 1.3rem;
    background-color: #fef2f2;
    padding: 1rem;
    border-radius: 4px;
    border: 1px solid #fecaca;
    text-align: center;
  }

  .presented-by {
    position: absolute;
    bottom: 3.2rem;
    left: 4rem;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.2rem;
    color: #94a3b8;

    strong {
      color: #202e30;
      font-weight: 700;
    }
  }
`

export const BgSide = styled.div`
  flex: 1;
  background-color: #202e30;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 8rem;
  color: white;
  position: relative;
  overflow: hidden;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(
        circle at 100% 0%,
        rgba(255, 255, 255, 0.05) 0%,
        transparent 40%
      ),
      radial-gradient(circle at 0% 100%, rgba(0, 0, 0, 0.2) 0%, transparent 40%);
    pointer-events: none;
  }

  @media (max-width: 900px) {
    display: none;
  }

  .info-list {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    max-width: 48rem;
    position: relative;
    z-index: 2;
  }

  .info-item {
    display: flex;
    align-items: center;
    gap: 2rem;
    padding: 2rem;
    border-radius: 4px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.06);
    cursor: default;
    transition: background 0.2s ease;

    &:hover {
      background: rgba(255, 255, 255, 0.06);
    }

    .icon-box {
      width: 4.8rem;
      height: 4.8rem;
      background: #1a2526;
      border-radius: 4px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid rgba(255, 255, 255, 0.1);
      flex-shrink: 0;

      svg {
        width: 2.4rem;
        height: 2.4rem;
        color: #ffffff;
      }
    }

    .text-content {
      flex: 1;

      h3 {
        font-size: 1.6rem;
        font-weight: 600;
        margin: 0 0 0.4rem 0;
        color: #ffffff;
        letter-spacing: 0.02rem;
      }

      p {
        font-size: 1.4rem;
        color: #a0aec0;
        margin: 0;
        line-height: 1.4;
      }
    }
  }
`
