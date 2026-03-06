import { SelectHTMLAttributes, useId } from "react"
import { Container } from "./styles"

interface ExtendedSelect extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  options: { label: string; value: string }[]
  error?: string
  iconSelectorOnly?: boolean
}

export default function Select({
  label,
  error,
  options = [],
  iconSelectorOnly = false,
  ...rest
}: ExtendedSelect) {
  const id = useId()

  return (
    <Container $iconSelectorOnly={iconSelectorOnly} $hasError={!!error}>
      {!iconSelectorOnly && <label htmlFor={id}>{label}</label>}

      <select id={id} {...rest}>
        <option key="selecione" value="">
          {iconSelectorOnly ? "App" : "Selecione"}
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>

      {!iconSelectorOnly && <span className="error">{error}</span>}
    </Container>
  )
}
