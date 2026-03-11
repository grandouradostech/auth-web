"use client"
import {
  type InputHTMLAttributes,
  type ChangeEvent,
  useId,
  forwardRef,
} from "react"
import { AlertCircle } from "lucide-react"
import { Container } from "./styles"

export type MaskType = "cpf" | "phone" | "cep" | "none"

interface ExtendedInput extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
  icon?: React.ReactNode
  mask?: MaskType
}

const EMAIL_PROVIDERS = [
  "gmail.com",
  "outlook.com",
  "hotmail.com",
  "yahoo.com.br",
  "icloud.com",
]

export const applyMask = (value: string, mask: MaskType) => {
  if (!value) return ""
  let v = value.replace(/\D/g, "")

  if (mask === "cpf") {
    v = v.substring(0, 11)
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d)/, "$1.$2")
    v = v.replace(/(\d{3})(\d{1,2})$/, "$1-$2")
    return v
  }

  if (mask === "phone") {
    v = v.substring(0, 11)
    v = v.replace(/(\d{2})(\d)/, "($1) $2")
    v = v.replace(/(\d{4,5})(\d{4})$/, "$1-$2")
    return v
  }

  if (mask === "cep") {
    v = v.substring(0, 8)
    v = v.replace(/(\d{5})(\d)/, "$1-$2")
    return v
  }

  return value
}

const Input = forwardRef<HTMLInputElement, ExtendedInput>(
  ({ label, error, icon, mask = "none", type, onChange, ...rest }, ref) => {
    const id = useId()
    const listId = `email-suggestions-${id}`

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      if (mask !== "none") {
        e.target.value = applyMask(e.target.value, mask)
      }

      if (onChange) onChange(e)
    }

    const showEmailSuggestions =
      type === "email" && String(rest.value || "").includes("@")
    const emailPrefix = showEmailSuggestions
      ? String(rest.value).split("@")[0]
      : ""

    return (
      <Container>
        <label style={{ display: label ? "flex" : "none" }} htmlFor={id}>
          {label}
        </label>

        <div className={`input-wrapper ${error ? "has-error" : ""}`}>
          {icon}
          <input
            {...rest}
            id={id}
            type={type}
            ref={ref}
            onChange={handleChange}
            list={type === "email" ? listId : undefined}
          />
          {type === "email" && (
            <datalist id={listId}>
              {EMAIL_PROVIDERS.map((provider) => (
                <option key={provider} value={`${emailPrefix}@${provider}`} />
              ))}
            </datalist>
          )}
        </div>

        {error && (
          <span className="error-message">
            <AlertCircle size={16} />
            {error}
          </span>
        )}
      </Container>
    )
  },
)

Input.displayName = "Input"
export default Input
