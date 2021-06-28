import { Box, Grid, Flex, Image, Button } from "@chakra-ui/react"
import { Outlet, Link } from "react-router-dom"
import { ColorModeSwitcher } from "../../components"
import logourl from "../../assets/logoBranca.png"
import { useSession } from "../../providers"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"

export function HomeRoute() {
  const { session } = useSession()
  const navigate = useNavigate()

  useEffect(() => {
    if (!session.isAdmin && !session.hasSession) {
      navigate("/login")
    }
  }, [navigate, session])

  if (!session.isAdmin && !session.hasSession) {
    return null
  }

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

const Header = () => {
  const { logout } = useSession()
  return (
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
        <Flex w="100%" justify="center">
          <Button
            w="20"
            onClick={() => {
              logout()
            }}
          >
            Sair
          </Button>
        </Flex>

        <ColorModeSwitcher />
      </Flex>
    </Box>
  )
}

const LinkBox = ({ text, url }) => (
  <Box py="2" color="green.200">
    <Link to={url}>{text}</Link>
  </Box>
)
