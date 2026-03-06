import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string
      surface: string
      text: string
      primary: string
      border: string
      outline: string
      error: string
      errorBorder: string
    }
    sizes: {
      borderRadius: string
      padding: string
    }
  }
}

import "styled-components"

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      background: string
      surface: string
      text: string
      primary: string
      border: string
      outline: string
      error: string
      errorBorder: string
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
    primary: "#CD533B",
    border: "#333333",
    outline: "#444444",
    error: "#ff3333",
    errorBorder: "#4c0000",
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
    primary: "#CD533B",
    border: "#eaeaea",
    outline: "#d1d5db",
    error: "#e00000",
    errorBorder: "#ffcccc",
  },
  sizes: {
    borderRadius: "6px",
    padding: "16px",
  },
}
