"use client"
import styled from "styled-components"

export const Container = styled.header`
  height: 48px;
  background-color: ${({ theme }) => theme.colors.surface};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  min-width: 100%;
  flex-shrink: 0;
  position: sticky;
  top: 0;
  z-index: 100;
`

export const LeftSection = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  height: 100%;
  width: 100%;
`

export const ProjectSelectorArea = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 0 12px;
  height: 32px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  cursor: pointer;
  transition: background 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors.border}40;
  }

  .selector-icon {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.5;
    transition: transform 0.2s ease;
  }
`

export const ProjectLabel = styled.span`
  font-size: 1.3rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.8;
  width: 110px;
  white-space: nowrap;
`

export const VerticalSeparator = styled.div`
  width: 1px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.border};
  margin-left: 8px;
`

export const BreadcrumbArea = styled.div`
  display: flex;
  margin: 0 auto;
  align-items: center;
`

export const RightSection = styled.div`
  display: flex;
  align-items: center;
`

export const ActionIconsArea = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  color: ${({ theme }) => theme.colors.text};

  .icon-action {
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    cursor: pointer;

    &:hover {
      opacity: 1;
    }
  }
`

export const ThemeToggleButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.6;
  padding: 4px;
  border-radius: 50%;
  transition: all 0.2s;

  &:hover {
    opacity: 1;
    background-color: ${({ theme }) => theme.colors.border}40;
  }
`

export const ArrowLeftButton = styled.button`
  display: flex;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    display: flex;
  }
`
export const MenuButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.text};

  @media (max-width: 768px) {
    display: flex;
  }
`

export const AppDropdown = styled.div`
  position: absolute;
  top: 110%;
  left: 0;
  width: 100%;
  max-height: 280px;
  overflow-y: auto;
  background-color: ${({ theme }) => theme.colors.surface};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
  padding: 6px;
  z-index: 999;
  animation: fadeIn 0.15s ease;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: ${({ theme }) => theme.sizes.borderRadius};
  }

  @keyframes fadeIn {
    from {
      opacity: 0;
      transform: translateY(-4px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`

export const AppItem = styled.div<{ $active?: boolean }>`
  padding: 8px 10px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  font-size: 1.3rem;
  cursor: pointer;
  background-color: ${({ $active, theme }) =>
    $active ? theme.colors.primary + "20" : "transparent"};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.primary : theme.colors.text};
  transition: all 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.primary + "15"};
  }
`
