import styled from "styled-components"

export const Container = styled.div`
  min-width: 100%;
  height: 50px;
  background-color: #00241b;
  color: #fff;

  display: flex;
  align-items: center;
  justify-content: space-between;

  gap: 15px;
  padding: 5px 10px;
  ul {
    display: flex;
    align-items: center;
    gap: 10px;
    list-style: none;
    li a {
      font-weight: 600;
      font-size: 1.4rem;
      cursor: pointer;
      padding: 3px;
    }
    .profile {
      border-radius: 100%;
      color: #ffffff;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
    }
  }
`

// #F15025
// #FFFFFF
// #E6E8E6
// #CED0CE
// #00241B
