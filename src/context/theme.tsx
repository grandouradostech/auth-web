"use client"

import { darkTheme, lightTheme } from "@/config/theme"
import { createContext, useState, useEffect, ReactNode } from "react"
import { ThemeProvider as StyledThemeProvider } from "styled-components"

interface ThemeContextData {
  toggleTheme: () => void
  isDark: boolean
}

export const ThemeContext = createContext<ThemeContextData>(
  {} as ThemeContextData,
)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("@GDHub:theme")
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")

    if (savedTheme) {
      setIsDark(savedTheme === "dark")
    } else {
      setIsDark(mediaQuery.matches)
    }

    const handleChange = (e: MediaQueryListEvent) => {
      if (!window.localStorage.getItem("@GDHub:theme")) {
        setIsDark(e.matches)
      }
    }

    mediaQuery.addEventListener("change", handleChange)

    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [])

  const toggleTheme = () => {
    setIsDark((prev) => {
      const newValue = !prev
      window.localStorage.setItem("@GDHub:theme", newValue ? "dark" : "light")
      return newValue
    })
  }

  const theme = isDark ? darkTheme : lightTheme

  return (
    <ThemeContext.Provider value={{ toggleTheme, isDark }}>
      <StyledThemeProvider theme={theme}>{children}</StyledThemeProvider>
    </ThemeContext.Provider>
  )
}
