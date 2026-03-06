import { ThemeContext } from "@/context/theme"
import { useContext } from "react"

export const useThemeToggle = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error(
      "useThemeToggle deve ser usado dentro de um AppThemeProvider",
    )
  }
  return context
}
