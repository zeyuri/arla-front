import { Container, Heading } from "@chakra-ui/react"

function PageContainer({ title, children }) {
  return (
    <Container as="main" maxW="container.md" py="10">
      <Heading as="h1">{title}</Heading>
      {children}
    </Container>
  )
}

export default PageContainer
