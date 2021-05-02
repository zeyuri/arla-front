import { ColorModeSwitcher } from "./components"
import { Box, VStack, Grid, Flex, Heading, Container } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import {
  HomeRoute,
  CustomerList,
  CustomersCreateRoute,
  DevicesListRoute,
} from "./routes"
import { EditUserRoute, UserCreateRoute, UserListRoute } from "./routes/Users"

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
              <Route path="/devices" element={<DevicesListRoute />} />
              <Route path="/users" element={<UserListRoute />} />
              <Route path="/users/create" element={<UserCreateRoute />} />
              <Route path="/users/edit/:userId" element={<EditUserRoute />} />
            </Routes>
          </VStack>
        </Container>
      </Grid>
    </Box>
  )
}

export default App

const Header = () => (
  <Flex as="header" justify="space-between">
    <Flex
      as="nav"
      justify="space-around"
      w="100%"
      align="flex-end"
      fontSize="sm"
    >
      <Link to="/">
        <Heading>Arla</Heading>
      </Link>
      <Link to="/customers">Clientes</Link>
      <Link to="/devices">Dispositivos</Link>
      <Link to="/users">Usuarios</Link>

      <ColorModeSwitcher />
    </Flex>
  </Flex>
)
