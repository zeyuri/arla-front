import {
  Select,
  Box,
  Flex,
  SimpleGrid,
  Image,
  Container,
  Button,
} from "@chakra-ui/react"
import { ReactComponent as PowerBiIcon } from "./powerBiIcon.svg"
import { useNavigate } from "react-router-dom"
import { useSession } from "../../providers"
import logoColor from "../../assets/logo.png"
import { RiLogoutBoxRLine as LogoutIcon } from "react-icons/ri"

const mockedDevices = [
  {
    value: "dsadasdasdasdas",
    label: "Fark 500",
  },
  {
    value: "dsadasdasdasdas",
    label: "Fark 800k",
  },
  {
    value: "dsadasdasdasdas",
    label: "Fark 1000",
  },
  {
    value: "dsadasdasdasdas",
    label: "Fark Super GTX",
  },
]

export function DashboardRoute() {
  const navigate = useNavigate()
  const { session, logout } = useSession()

  if (!session.hasSession) {
    navigate("/login")
    return null
  }

  if (session.isAdmin) {
    navigate("/app")
    return null
  }

  return (
    <>
      <Header />

      <Container as="main" maxW="container.lg">
        <Box py="10">
          <Select size="lg">
            {mockedDevices.map((device) => (
              <option key={device.value} value={device.value}>
                {device.label}
              </option>
            ))}
          </Select>
        </Box>
        <Box borderRadius="lg" w="100%" bg="whiteAlpha.300" minH="40vh" p="10">
          <SimpleGrid columns={3} spacing={16} w="100%" h="100%">
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
            <Flex
              w="100%"
              h="100%"
              color="green.400"
              align="center"
              justify="center"
              borderWidth="1px"
              py="20"
            >
              <PowerBiIcon />
            </Flex>
          </SimpleGrid>
        </Box>
      </Container>
      <Flex as="footer" justify="center" py="6" bg="blackAlpha.100">
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
    </>
  )
}

const Header = () => (
  <Flex as="header" bg="blackAlpha.100" justify="center" pt="8" pb="3">
    <Box w={{ base: "30vw" }}>
      <Image src={logoColor} w="100%" />
    </Box>
  </Flex>
)
