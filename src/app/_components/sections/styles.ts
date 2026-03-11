import styled from "styled-components"

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  overflow: hidden;
  width: 100%;
`

export const Main = styled.div`
  padding: ${({ theme }) => theme.sizes.padding};
  display: flex;
  flex-direction: column;
  gap: 24px;
`

export const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;

  .title {
    font-size: 1.8rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }

  .description {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }
`

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const Footer = styled.footer`
  background-color: ${({ theme }) => theme.colors.background};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding: 16px ${({ theme }) => theme.sizes.padding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 16px;

  .info {
    font-size: 1.4rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
  }

  .action {
    display: flex;
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: flex-start;

    .action {
      width: 100%;
      justify-content: flex-end;
    }
  }
`
