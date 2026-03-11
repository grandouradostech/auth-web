"use client"

import styled, { keyframes } from "styled-components"

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`

export const Container = styled.div`
  width: 100vw;
  height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.colors.background};
  color: ${(props) => props.theme.colors.text};
  overflow: hidden;
  position: relative;
`

export const Content = styled.div`
  max-width: 540px;
  width: 100%;
  padding: 4rem;
  text-align: center;
  z-index: 2;
  animation: ${fadeIn} 0.6s ease-out;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const IconWrapper = styled.div`
  color: ${(props) => props.theme.colors.primary};
  margin-bottom: 2.4rem;
  animation: ${float} 4s ease-in-out infinite;
  opacity: 0.9;
`

export const ErrorCode = styled.span`
  font-size: 1.4rem;
  font-weight: 800;
  letter-spacing: 0.5rem;
  color: ${(props) => props.theme.colors.primary};
  text-transform: uppercase;
  margin-bottom: 0.8rem;
  display: block;
`

export const Title = styled.h1`
  font-size: 3.2rem;
  font-weight: 900;
  color: ${(props) => props.theme.colors.text};
  margin-bottom: 1.6rem;
  letter-spacing: -0.05rem;
`

export const Description = styled.p`
  font-size: 1.6rem;
  line-height: 1.6;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.7;
  margin-bottom: 4rem;
`

export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2.4rem;
  width: 100%;

  .back-link {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.colors.text};
    font-size: 1.4rem;
    font-weight: 600;
    display: flex;
    align-items: center;
    gap: 0.8rem;
    cursor: pointer;
    transition: opacity 0.2s;
    opacity: 0.6;

    &:hover {
      opacity: 1;
    }
  }
`

export const BackgroundDetail = styled.div`
  position: absolute;
  width: 600px;
  height: 600px;
  background: radial-gradient(
    circle,
    ${(props) => props.theme.colors.primary}10 0%,
    transparent 70%
  );
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1;
  pointer-events: none;
`
