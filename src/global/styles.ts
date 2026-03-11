import { createGlobalStyle } from "styled-components"

const GlobalStyles = createGlobalStyle`
html {
  font-size: 62.5%;
  overscroll-behavior: none;
}
html,
body {
    width: 100%;        
    max-width: 100%;    
    overflow-x: hidden;
    min-height: 100%;
  }

body {
  color: ${({ theme }) => theme.colors.text};
  background-color: ${({ theme }) => theme.colors.background};
  font-size: 1.6rem;
  font-optical-sizing: auto;
  font-weight: 500;
  font-family: var(--font-work-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-style: normal;
  transition: background-color 0.2s ease, color 0.2s ease;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline-color: ${({ theme }) => theme.colors.primary}cc;
  outline-width: 2px;
}

a {
  color: inherit;
  text-decoration: none;
}

::-webkit-scrollbar {
    width: 10px;
  }

  ::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${({ theme }) => theme.colors.border};
    border-radius: 10px;
    border: 2px solid ${({ theme }) => theme.colors.surface};
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: ${({ theme }) => theme.colors.outline};
  }
input{
  outline: none;
}
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-background-clip: text;
    -webkit-text-fill-color: ${(e) => e.theme.colors.text};
    transition: background-color 5000s ease-in-out 0s;
    box-shadow: inset 0 0 20px 20px ${(e) => e.theme.colors.surface};
  }

.input-component:has(input:focus),.Select-component:has(:focus) {
  outline: auto;
  outline-color: ${({ theme }) => theme.colors.primary} !important;
  outline-width: 2px;
  
 }
 button,input{
  font-family: var(--font-work-sans), sans-serif !important;

 }

  @media (max-width: 1200px) {
    html {
      font-size: 56.25%; 
    }
  }

  @media (max-width: 768px) {
    html {
      font-size: 50%; 
    }
    .line{
      flex-direction: column !important;
    }
  }

`
export { GlobalStyles }
