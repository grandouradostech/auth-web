"use client";
import styled, { css } from "styled-components";
import { ButtonVariant, ButtonFit } from ".";

interface ContainerProps {
  $variant: ButtonVariant;
  $fit: ButtonFit;
}

const variants = {
  primary: css`
    background-color: #202E30;
    color: #fff;
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: #172223; }
  `,
  outline: css`
    background-color: transparent;
    color: #202E30;
    border: 2px solid #202E30;
    &:hover:not(:disabled) { background-color: rgba(32, 46, 48, 0.05); }
  `,
  secondary: css`
    background-color: #E5E7EB;
    color: #202E30;
    border: 1px solid transparent;
    &:hover:not(:disabled) { background-color: #D1D5DB; }
  `
};


const fits = {
  full: css`
    width: 100%;
    padding: 0 40px;
  `,
  content: css`
    width: auto; 
    padding: 0 24px; 
  `,
  icon: css`
    /* width: 45px !important;  */
    aspect-ratio: 1/1;
    padding: 0; 
    justify-content: center;
  `
};

export const Container = styled.button<ContainerProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  white-space: nowrap;
  
  
  height: 45px;
  border-radius: 4px;
  
  font-size: 1.5rem; 
  font-weight: 600;
  letter-spacing: 0.05em;
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  
  ${({ $variant }) => variants[$variant]}

  
  ${({ $fit }) => fits[$fit]}

  &:active {
    transform: scale(0.97);
  }

  &:disabled {
    pointer-events: none;
    opacity: 0.5;
    transform: none;
  }
`;