import { Box, Grid, Flex, Image } from "@chakra-ui/react"
import { Outlet, Link } from "react-router-dom"
import { ColorModeSwitcher } from "../../components"
import logourl from "../../assets/logoBranca.png"

export function HomeRoute() {
  return (
    <Box>
      <Grid minH="100vh">
        <Flex>
          <Header />
          <Outlet />
        </Flex>
      </Grid>
    </Box>
  )
}

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
        </Link>
      </Box>

      <LinkBox url="customers" text="Clientes" />
      <LinkBox url="devices" text="Dispositivos" />
      <LinkBox url="users" text="Usuarios" />
      <LinkBox url="dashboards" text="Paineis" />

      <ColorModeSwitcher />
    </Flex>
  </Box>
)

const LinkBox = ({ text, url }) => (
  <Box py="2" color="green.200">
    <Link to={url}>{text}</Link>
  </Box>
)
