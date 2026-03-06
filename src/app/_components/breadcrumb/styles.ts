"use client"
import styled from "styled-components"
import Link from "next/link"

export const BreadcrumbNav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 1.5rem;
  color: ${(props) => props.theme.colors.text};
`

export const BreadcrumbList = styled.ol`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  list-style: none;
  padding: 0;
  margin: 0;
`

export const BreadcrumbItemContainer = styled.li`
  display: inline-flex;
  align-items: center;
  gap: 0.8rem;
`

export const StyledLink = styled(Link)`
  text-decoration: none;
  color: ${(props) => props.theme.colors.text};
  opacity: 0.5;
  transition: opacity 0.2s;

  &:hover {
    opacity: 1;
  }
`

export const CurrentPage = styled.span`
  font-weight: 600;
  color: ${(props) => props.theme.colors.text};
  opacity: 1;
`

export const Separator = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${(props) => props.theme.colors.border};
  user-select: none;
  font-size: 1.2rem;
  padding: 0 0.4rem;
`
