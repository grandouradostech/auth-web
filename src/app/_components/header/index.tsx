import { ReactNode } from "react"
import { Container } from "./styles"

export default function HeaderText({
  children,
  description,
}: {
  children: ReactNode
  description?: string
}) {
  return (
    <Container>
      <h1>{children}</h1>
      <p>{description && description}</p>
    </Container>
  )
}
