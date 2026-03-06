"use client"
import styled, { keyframes } from "styled-components"
import Link from "next/link"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`

export const Container = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.background};
  position: relative;
  overflow: hidden;
`

export const Content = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 40px;
  max-width: 480px;
  animation: ${fadeIn} 0.5s ease-out;
`

export const IconWrapper = styled.div`
  position: relative;
  margin-bottom: 32px;

  .grid-bg {
    width: 80px;
    height: 80px;
    background-color: ${({ theme }) => theme.colors.surface};
    border: 1px solid ${({ theme }) => theme.colors.border};
    border-radius: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.2;
  }

  .search-icon {
    position: absolute;
    bottom: -5px;
    right: -5px;
    background-color: ${({ theme }) => theme.colors.primary};
    color: #fff;
    padding: 6px;
    border-radius: 50%;
    box-sizing: content-box;
    border: 4px solid ${({ theme }) => theme.colors.background};
  }
`

export const TextSection = styled.div`
  margin-bottom: 40px;

  h1 {
    font-size: 2.8rem;
    font-weight: 800;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 16px;
    letter-spacing: -0.02em;
  }

  p {
    font-size: 1.6rem;
    color: ${({ theme }) => theme.colors.text};
    opacity: 0.6;
    line-height: 1.6;
  }
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
`

export const SupportLink = styled(Link)`
  font-size: 1.4rem;
  color: ${({ theme }) => theme.colors.text};
  opacity: 0.5;
  text-decoration: none;
  font-weight: 600;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
    text-decoration: underline;
  }
`

export const BackgroundBlur = styled.div`
  position: absolute;
  width: 400px;
  height: 400px;
  background: ${({ theme }) => theme.colors.primary}15;
  filter: blur(100px);
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
`
