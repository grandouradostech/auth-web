"use client"

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
  }

body {
  color: #f5f5f5;
  background-color: #04121a;
  font-size: 1.6rem;
  font-optical-sizing: auto;
  font-weight: 500;
  font-family:var(--font-work-sans), sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
  font-style: normal;
}

* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  outline-color: #f5f5f5cc;
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
    background: #f5f5f5;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #051923;
    border-radius: 10px;
    border: 2px solid #f5f5f5;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #051923;
  }
input{
  outline: none;
}
.input-component:has(input:focus),.Select-component:has(:focus) {
  outline: auto;
  outline-color: #051923
 !important;
  outline-width: 2px;
  
 }
 button,input{
  font-family:var(--font-work-sans), sans-serif !important;

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
