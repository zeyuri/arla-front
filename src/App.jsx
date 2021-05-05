import { ColorModeSwitcher } from "./components"
import { Box, Grid, Flex, Heading } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import {
  HomeRoute,
  CustomerList,
  CustomersCreateRoute,
  CustomersEditRoute,
  DevicesListRoute,
  EditUserRoute,
  UserCreateRoute,
  UserListRoute,
} from "./routes"

function App() {
  return (
    <Box>
      <Grid minH="100vh">
        <Flex>
          <Header />
          <Routes>
            <Route path="/" element={<HomeRoute />} />
            <Route path="/customers" element={<CustomerList />} />
            <Route
              path="/customers/create"
              element={<CustomersCreateRoute />}
            />
            <Route
              path="/customers/edit/:customerId"
              element={<CustomersEditRoute />}
            />
            <Route path="/devices" element={<DevicesListRoute />} />
            <Route path="/users" element={<UserListRoute />} />
            <Route path="/users/create" element={<UserCreateRoute />} />
            <Route path="/users/edit/:userId" element={<EditUserRoute />} />
          </Routes>
        </Flex>
      </Grid>
    </Box>
  )
}

export default App

const Header = () => (
  <Box as="header" w="64" h="100%" bg="blackAlpha.700">
    <Flex
      as="nav"
      direction="column"
      justify="center"
      w="100%"
      fontSize="xl"
      py="10"
      textAlign="center"
    >
      <Box pb="8">
        <Link to="/">
          <Heading>
            Arla
            <br />
            Agro
          </Heading>
        </Link>
      </Box>

      <LinkBox url="/customers" text="Clientes" />
      <LinkBox url="/devices" text="Dispositivos" />
      <LinkBox url="/users" text="Usuarios" />

      <ColorModeSwitcher />
    </Flex>
  </Box>
)

const LinkBox = ({ text, url }) => (
  <Box py="2">
    <Link to={url}>{text}</Link>
  </Box>
)
