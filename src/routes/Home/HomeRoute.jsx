import { Box, Grid, Flex, Image, Button } from "@chakra-ui/react"
import { Outlet, Link, useMatch } from "react-router-dom"
import { ColorModeSwitcher } from "../../components"
import logoColor from "../../assets/logo.png"
import { useSession } from "../../providers"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri"

export function HomeRoute() {
  const { session } = useSession()
  const navigate = useNavigate()
  const isHome = useMatch("/app")

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
          <Box
            w="100%"
            bgImg={isHome ? `url(${logoColor})` : "unset"}
            bgSize="60%"
            bgPosition="center"
            bgRepeat="no-repeat"
            opacity={isHome ? "0.2" : "unset"}
          >
            <Outlet />
          </Box>
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
        justify="space-between"
        w="100%"
        fontSize="xl"
        py="10"
        textAlign="center"
        h="100%"
      >
        <Flex direction="column" justify="center" textAlign="center">
          <Box pb="8" px="8">
            <Link to="/">
              <Image src={logoColor} w="100%" />
            </Link>
          </Box>

          <LinkBox url="customers" text="Clientes" />
          <LinkBox url="devices" text="Dispositivos" />
          <LinkBox url="users" text="Usuarios" />
        </Flex>

        <Flex w="100%" justify="center">
          <ColorModeSwitcher />
          <Button
            w="20"
            leftIcon={<LogoutIcon />}
            onClick={() => {
              logout()
            }}
          >
            Sair
          </Button>
        </Flex>
      </Flex>
    </Box>
  )
}

const LinkBox = ({ text, url }) => (
  <Box py="2" color="green.200">
    <Link to={url}>{text}</Link>
  </Box>
)
