"use client"
import styled from "styled-components"

export const Container = styled.div`

display: flex;
flex-direction: column;
max-width:100%;
gap: 8px;
width: 100%;

label{
  font-weight: 600;
  font-size: 1.5rem;
  font-family: var(--font-lato);
  color: #333;
  letter-spacing: .5px;
}
.error{
  color: #f55;
  font-size: 1.3rem;
  font-weight: 700;
}
select {
  border-radius: 4px;
  height: 48px;
  padding: 12px 40px 12px 12px;
  font-size: 1.6rem;
  border: 1px solid #ddd;


}


`