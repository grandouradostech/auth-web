import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => theme.sizes.padding};
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  gap: 16px;
  width: 100%;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;
  }
`

export const MainContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1;
`

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text};
  flex-shrink: 0;
`

export const MessageText = styled.div`
  color: ${({ theme }) => theme.colors.text};
  font-size: 14px;
  line-height: 1.5;

  strong {
    font-weight: 600;
  }
`

export const ActionsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex-shrink: 0;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: flex-end;
  }
`

export const CloseButton = styled.button`
  background: transparent;
  border: none;
  padding: 0;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: opacity 0.2s ease-in-out;

  &:hover {
    opacity: 1;
  }
`
