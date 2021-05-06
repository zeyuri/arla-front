import { ColorModeSwitcher } from "./components"
import { Box, Grid, Flex, Image } from "@chakra-ui/react"
import { Routes, Route, Link } from "react-router-dom"
import {
  HomeRoute,
  CustomerList,
  CustomersCreateRoute,
  CustomersEditRoute,
  DevicesListRoute,
  DevicesCreateRoute,
  UserEditRoute,
  UserCreateRoute,
  UserListRoute,
  DashboardRoute,
} from "./routes"
import logourl from "./assets/logoBranca.png"

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
            <Route path="/devices/create" element={<DevicesCreateRoute />} />
            <Route path="/users" element={<UserListRoute />} />
            <Route path="/users/create" element={<UserCreateRoute />} />
            <Route path="/users/edit/:userId" element={<UserEditRoute />} />
            <Route path="/dashboards" element={<DashboardRoute />} />
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
      <Box pb="8" px="8">
        <Link to="/">
          <Image src={logourl} w="100%" />
          {/* <Heading>
            Arla
            <br />
            Agro
          </Heading> */}
        </Link>
      </Box>

      <LinkBox url="/customers" text="Clientes" />
      <LinkBox url="/devices" text="Dispositivos" />
      <LinkBox url="/users" text="Usuarios" />
      <LinkBox url="/dashboards" text="Paineis" />

      <ColorModeSwitcher />
    </Flex>
  </Box>
)

const LinkBox = ({ text, url }) => (
  <Box py="2" color="green.200">
    <Link to={url}>{text}</Link>
  </Box>
)
