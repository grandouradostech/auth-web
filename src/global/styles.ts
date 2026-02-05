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
  color: #202E30;
  background: #fbfbfc;
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
  outline-color: #202E30
;
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
    background: #fff;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #000;
    border-radius: 10px;
    border: 2px solid #fff;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #000;
  }
input{
  outline: none;
}
.input-component:has(input:focus),.Select-component:has(:focus) {
  outline: auto;
  outline-color: #202E30
 !important;
  outline-width: 2px;
  
 }
 button,input{
  font-family:var(--font-work-sans), sans-serif;

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
