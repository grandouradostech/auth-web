"use client"

import { darkTheme, lightTheme } from "@/config/theme"
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

interface ThemeContextData {
  toggleTheme: () => void
  isDark: boolean
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    const savedTheme = window.localStorage.getItem("@GDHub:theme")
    if (savedTheme === "light") {
      setIsDark(false)
    }
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev
      window.localStorage.setItem("@GDHub:theme", newValue ? "dark" : "light")
      return newValue
    })
  }

  const theme = isDark ? darkTheme : lightTheme

  if (!mounted) return null

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
