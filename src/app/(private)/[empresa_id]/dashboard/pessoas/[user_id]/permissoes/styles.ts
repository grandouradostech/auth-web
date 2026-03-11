"use client"
import styled from "styled-components"

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
  padding: ${({ theme }) => theme.sizes.padding};
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
`

export const TabsWrapper = styled.div`
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  gap: 24px;
  margin-top: 8px;
  overflow-x: auto;
  overflow-y: hidden;
`

export const TabButton = styled.button<{ $active?: boolean }>`
  background: transparent;
  border: none;
  border-bottom: 2px solid
    ${({ $active, theme }) => ($active ? theme.colors.primary : "transparent")};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text : theme.colors.text};
  font-weight: ${({ $active }) => ($active ? "600" : "500")};
  font-size: 1.4rem;
  padding: 12px 4px;
  cursor: pointer;
  opacity: ${({ $active }) => ($active ? "1" : "0.5")};
  transition: all 0.2s ease;
  transform: translateY(1px);

  &:hover {
    opacity: 1;
    color: ${({ theme }) => theme.colors.primary};
  }
`

/* --- PAINÉIS SAAS --- */
export const Panel = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.02);
  overflow: hidden;
`

export const PanelHeader = styled.div`
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  justify-content: space-between;
  align-items: center;

  h3 {
    margin: 0;
    font-size: 1.6rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
  }
`

export const PanelBody = styled.div`
  padding: 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
`

export const TableWrapper = styled.div`
  width: 100%;
  overflow-x: auto;
`

export const NativeTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  font-size: 1.3rem;
  text-align: left;
  color: ${({ theme }) => theme.colors.text};

  thead {
    background-color: ${({ theme }) => theme.colors.background};
  }

  th {
    padding: 12px 20px;
    font-weight: 600;
    font-size: 1.2rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    opacity: 0.7;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  td {
    padding: 16px 20px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  }

  tbody tr:last-child td {
    border-bottom: none;
  }

  tbody tr:hover {
    background-color: ${({ theme }) => theme.colors.background}40;
  }

  .empty-state {
    text-align: center;
    padding: 40px;
    opacity: 0.5;
    font-size: 1.4rem;
  }
`

/* --- TAGS (PILLS) --- */
export const TagList = styled.div`
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
`

export const Tag = styled.span`
  background: ${({ theme }) => theme.colors.background};
  border: 1px solid ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 4px 10px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  font-size: 1.2rem;
  font-weight: 500;
`

export const ActionRow = styled.div`
  display: flex;
  gap: 16px;
  align-items: flex-end;

  @media (max-width: 940px) {
    flex-direction: column;
    align-items: flex-start;
    div > :has(select),
    button {
      min-width: 100% !important;
      max-width: 100%;
    }
  }
`

export const ModalOverlay = styled.div`
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
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
  max-width: 700px;
  max-height: 90vh;
  display: flex;
  flex-direction: column;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);

  .modal-header {
    padding: 24px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.border};
    h3 {
      font-size: 1.8rem;
      font-weight: 600;
      margin: 0;
    }
  }

  .modal-body {
    padding: 24px;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  .modal-footer {
    padding: 20px 24px;
    border-top: 1px solid ${({ theme }) => theme.colors.border};
    background-color: ${({ theme }) => theme.colors.background}50;
    display: flex;
    justify-content: flex-end;
    gap: 12px;
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
  }
`

export const CheckboxCardList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  max-height: 300px;
  overflow-y: auto;
  padding-right: 8px;

  /* Scrollbar customizada sutil */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
  }
`

export const CheckboxCard = styled.label<{ $checked: boolean }>`
  display: flex;
  align-items: flex-start;
  gap: 16px;
  padding: 16px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  border: 1px solid
    ${({ $checked, theme }) =>
      $checked ? theme.colors.primary : theme.colors.border};
  background-color: ${({ $checked, theme }) =>
    $checked ? theme.colors.primary + "0A" : theme.colors.background};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    border-color: ${({ theme }) => theme.colors.primary};
  }

  input {
    margin-top: 4px;
    cursor: pointer;
    width: 16px;
    height: 16px;
    accent-color: ${({ theme }) => theme.colors.primary};
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 4px;
    strong {
      font-size: 1.4rem;
      font-weight: 600;
    }
    span {
      font-size: 1.3rem;
      opacity: 0.7;
      line-height: 1.4;
    }
  }
`

export const NativeSelect = styled.select`
  width: 100%;
  height: 44px;
  padding: 0 16px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  border: 1px solid ${({ theme }) => theme.colors.border};
  background-color: ${({ theme }) => theme.colors.background};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: ${({ theme }) => theme.colors.primary};
  }
`
