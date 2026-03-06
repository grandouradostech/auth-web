"use client"
import { type InputHTMLAttributes, useId } from "react"
import { AlertCircle } from "lucide-react"
import { Container } from "./styles"

interface ExtendedInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
}

export default function Input({ label, error, icon, ...rest }: ExtendedInput) {
  const id = useId()

  return (
    <Container>
      <label style={{ display: label ? "flex" : "none" }} htmlFor={id}>
        {label}
      </label>

      <div className="input-wrapper">
        {icon}
        <input id={id} className={error ? "has-error" : ""} {...rest} />
      </div>

      {error && (
        <span className="error-message">
          <AlertCircle size={16} />
          {error}
        </span>
      )}
    </Container>
  )
}
