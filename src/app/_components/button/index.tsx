import React, { ButtonHTMLAttributes } from "react";
import { Container } from "./styles";


export type ButtonVariant = 'primary' | 'outline' | 'secondary';
export type ButtonFit = 'full' | 'content' | 'icon';

interface ExtendedButton extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  variant?: ButtonVariant;
  fit?: ButtonFit;
}

export default function Button({
  children,
  variant = 'primary',
  fit = 'full',
  ...rest
}: ExtendedButton) {
  return (
    <Container $variant={variant} $fit={fit} {...rest}>
      {children}
    </Container>
  );
}