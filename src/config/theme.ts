import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string
      surface: string
      text: string
      textSecondary: string
      primary: string
      border: string
      outline: string
      error: string
      errorBorder: string
      danger: string
      dangerSecondary: string
      warning: string
    }
    sizes: {
      borderRadius: string
      padding: string
    }
  }
}

export const darkTheme = {
  colors: {
    background: "#000000",
    surface: "#0a0a0a",
    text: "#ededed",
    textSecondary: "#a1a1aa",
    primary: "#CD533B",
    border: "#333333",
    outline: "#0a0a0a",
    error: "#ff3333",
    errorBorder: "#4c0000",
    danger: "#ef4444",
    dangerSecondary: "rgba(239, 68, 68, 0.1)",
    warning: "#f59e0b",
  },
  sizes: {
    borderRadius: "6px",
    padding: "16px",
  },
}

export const lightTheme = {
  colors: {
    background: "#fafafa",
    surface: "#ffffff",
    text: "#171717",
    textSecondary: "#71717a",
    primary: "#CD533B",
    border: "#eaeaea",
    outline: "#ffffff",
    error: "#e00000",
    errorBorder: "#ffcccc",
    danger: "#ef4444",
    dangerSecondary: "rgba(239, 68, 68, 0.05)",
    warning: "#d97706",
  },
  sizes: {
    borderRadius: "6px",
    padding: "16px",
  },
}
