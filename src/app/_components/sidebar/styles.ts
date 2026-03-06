"use client"

import styled, { keyframes, css } from "styled-components"
import Link from "next/link"

const slideIn = keyframes`
  from { opacity: 0; transform: translateX(-10px); }
  to { opacity: 1; transform: translateX(0); }
`

export const Overlay = styled.div<{ $isOpen: boolean }>`
  display: none;
  @media (max-width: 768px) {
    display: block;
    position: fixed;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
    opacity: ${({ $isOpen }) => ($isOpen ? 1 : 0)};
    visibility: ${({ $isOpen }) => ($isOpen ? "visible" : "hidden")};
    z-index: 40;
    transition: 0.3s;
  }
`

export const Container = styled.aside<{ $isOpen: boolean }>`
  width: 260px;
  height: 100vh;
  background-color: ${({ theme }) => theme.colors.background};
  border-right: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  flex-direction: column;
  z-index: 50;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @media (max-width: 768px) {
    position: fixed;
    transform: ${({ $isOpen }) =>
      $isOpen ? "translateX(0)" : "translateX(-100%)"};
  }
`

export const Header = styled.div`
  padding: ${({ theme }) => theme.sizes.padding};
  display: flex;
  align-items: center;
  min-width: 0;

  justify-content: space-between;
`

export const OrgInfo = styled.div`
  display: flex;
  align-items: center;
  width: 200px;
  gap: 8px;

  max-width: 100%;
  min-width: 0;
  cursor: pointer;
`

export const OrgAvatar = styled.div`
  width: 24px;
  height: 24px;
  background: #00a3ff;
  border-radius: 50%;
`

export const OrgName = styled.span`
  font-size: 1.3rem;
  font-weight: 600;
  display: flex;
  text-overflow: ellipsis;
  min-width: 0;
  white-space: nowrap;
  overflow: hidden;
  flex: 1;
  color: ${({ theme }) => theme.colors.text};
`

export const HobbyTag = styled.span`
  font-size: 1rem;
  background: ${({ theme }) => theme.colors.border};
  color: ${({ theme }) => theme.colors.text};
  padding: 2px 6px;
  border-radius: 12px;
  opacity: 0.8;
`

export const SearchContainer = styled.div`
  margin: 8px 16px;
  position: relative;
  display: flex;
  align-items: center;
  background: transparent;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 6px;
  padding: 6px 12px;
  height: 40px;

  input {
    background: transparent;
    border: none;
    color: ${({ theme }) => theme.colors.text};
    font-size: 1.3rem;
    padding-left: 28px;
    width: 100%;
    outline: none;
    &::placeholder {
      color: ${({ theme }) => theme.colors.text};
      opacity: 0.3;
    }
  }

  .search-icon {
    position: absolute;
    left: 10px;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.3;
  }
`

export const KbdBadge = styled.kbd`
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 4px;
  padding: 0 4px;
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.3;
`

export const Content = styled.nav`
  flex: 1;
  padding: ${({ theme }) => theme.sizes.padding};
  overflow-y: auto;
`

export const AnimatedMenuContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: ${slideIn} 0.3s ease-out forwards;
`

export const MenuItemLink = styled.button<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 12px;
  height: 40px;
  border-radius: ${({ theme }) => theme.sizes.borderRadius};
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.4rem;
  border: none;
  transition: 0.2s;
  text-decoration: none;
  opacity: ${({ $active }) => ($active ? 1 : 0.6)};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.surface : "transparent"};

  ${({ $active, theme }) =>
    $active &&
    css`
      background-color: ${theme.colors.outline};
      font-weight: 600;
      opacity: 1;
    `}

  &:hover {
    background: ${({ theme }) => theme.colors.surface};
    opacity: 1;
  }
`

export const IconWrapper = styled.div<{ $active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ $active, theme }) => ($active ? theme.colors.text : "inherit")};
`

export const Footer = styled.div`
  padding: ${({ theme }) => theme.sizes.padding};
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const UserProfile = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`

export const UserAvatar = styled.div`
  width: 24px;
  height: 24px;
  background: #4caf50;
  border-radius: 50%;
`

export const UserName = styled.span`
  font-size: 1.3rem;
  color: ${({ theme }) => theme.colors.text};
`

export const FooterActions = styled.div`
  display: flex;
  gap: 12px;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  cursor: pointer;
`

export const NotificationWrapper = styled.div`
  position: relative;
`

export const NotificationDot = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  width: 8px;
  height: 8px;
  background: #00a3ff;
  border-radius: 50%;
  border: 2px solid ${({ theme }) => theme.colors.background};
`

export const CloseButton = styled.button`
  display: none;
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.colors.text};
  @media (max-width: 768px) {
    display: block;
  }
`
