"use client"
import { SelectHTMLAttributes, useId } from "react"
import { AlertCircle, ChevronDown } from "lucide-react"
import { Container } from "./styles"

interface ExtendedSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { label: string; value: string }[]
  error?: string
  placeholder?: string
  iconSelectorOnly?: boolean
  icon?: React.ReactNode
}

export default function Select({
  label,
  error,
  options = [],
  iconSelectorOnly = false,
  placeholder = "Escolha uma opção",
  icon,
  ...rest
}: ExtendedSelect) {
  const id = useId()

  return (
    <Container $iconSelectorOnly={iconSelectorOnly}>
      {!iconSelectorOnly && <label htmlFor={id}>{label}</label>}

      <div className={`input-wrapper ${error ? "has-error" : ""}`}>
        {icon && <div className="input-icon">{icon}</div>}

        <select id={id} {...rest}>
          <option key="selecione" value="">
            {placeholder}
          </option>

          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <div className="select-arrow">
          <ChevronDown size={18} />
        </div>
      </div>

      {!iconSelectorOnly && error && (
        <span className="error-message">
          <AlertCircle size={16} />
          {error}
        </span>
      )}
    </Container>
  )
}
