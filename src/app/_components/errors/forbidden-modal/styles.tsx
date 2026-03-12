import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; }
  to { opacity: 1; }
`

const scaleIn = keyframes`
  from { transform: scale(0.95); opacity: 0; }
  to { transform: scale(1); opacity: 1; }
`

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  padding: 16px;
  animation: ${fadeIn} 0.2s ease-out;
`

export const ModalContent = styled.div`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  padding: 40px 24px;
  width: 100%;
  max-width: 480px;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
  animation: ${scaleIn} 0.3s cubic-bezier(0.16, 1, 0.3, 1);

  @media (max-width: 480px) {
    padding: 32px 16px;
  }
`

export const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) =>
    theme.colors.surface || "rgba(255, 255, 255, 0.05)"};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.textSecondary};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  z-index: 10;

  &:hover {
    background: ${({ theme }) => theme.colors.border};
    color: ${({ theme }) => theme.colors.text};
  }
`

export const IconWrapper = styled.div`
  position: relative;
  margin-bottom: 24px;
  z-index: 2;

  .grid-bg {
    background: ${({ theme }) =>
      theme.colors.dangerSecondary || "rgba(239, 68, 68, 0.1)"};
    padding: 28px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    color: ${({ theme }) => theme.colors.danger};
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .alert-icon {
    position: absolute;
    bottom: -4px;
    right: -4px;
    color: ${({ theme }) => theme.colors.warning};
    background: ${({ theme }) => theme.colors.background};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
    padding: 4px;
    box-sizing: content-box;
  }
`

export const TextSection = styled.div`
  margin-bottom: 32px;
  z-index: 2;

  h1 {
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 12px;
    color: ${({ theme }) => theme.colors.text};
  }

  p {
    color: ${({ theme }) => theme.colors.textSecondary};
    line-height: 1.6;
    font-size: 15px;
  }
`

export const Actions = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;
  width: 100%;
  z-index: 2;

  button {
    min-width: 140px;
  }
`

export const BackgroundBlur = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 200px;
  height: 200px;
  background: ${({ theme }) => theme.colors.danger};
  filter: blur(80px);
  opacity: 0.15;
  pointer-events: none;
  z-index: 1;
`
