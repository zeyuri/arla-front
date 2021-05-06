import { Container, Heading } from "@chakra-ui/react"

export function PageContainer({ title, children }) {
  return (
    <Container as="main" maxW="container.lg" py="10">
      <Heading as="h1" color="green.300">
        {title}
      </Heading>
      {children}
    </Container>
  )
}
