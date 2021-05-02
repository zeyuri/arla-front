import { ColorModeSwitcher } from "./components"
import { Box, VStack, Grid, Flex, Heading, Container } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import { HomeRoute, CustomerList, CustomersCreateRoute } from "./routes"

function App() {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Container maxW="container.lg">
          <Header />
          <VStack spacing={8}>
            <Routes>
              <Route path="/" element={<HomeRoute />} />
              <Route path="/customers" element={<CustomerList />} />
              <Route
                path="/customers/create"
                element={<CustomersCreateRoute />}
              />
            </Routes>
          </VStack>
        </Container>
      </Grid>
    </Box>
  )
}

export default App

const Header = () => (
  <Flex as="header" justify="space-between" align="center">
    <Heading>Arla</Heading>
    <Flex as="nav">
      <Link to="/customers">Clientes</Link>
    </Flex>
    <ColorModeSwitcher />
  </Flex>
)
