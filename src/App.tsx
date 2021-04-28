import { Codec, string, GetType } from "purify-ts/Codec"
import api from "./api"
import { useQuery } from "react-query"
import { ColorModeSwitcher, Card } from "./components"
import {
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Flex,
  Heading,
  Container,
} from "@chakra-ui/react"

function App(): JSX.Element {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <Container maxW="container.lg">
          <Header />
          <VStack spacing={8}>
            <CustomerList />
            <Text>
              Edit <Code fontSize="xl">src/App.js</Code> and save to reload.
            </Text>
            <Link
              color="teal.500"
              href="https://chakra-ui.com"
              fontSize="2xl"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn Chakra
            </Link>
          </VStack>
        </Container>
      </Grid>
    </Box>
  )
}

export default App

const Header = () => (
  <Flex as="header" justify="space-between">
    <Heading>Arla</Heading>
    <ColorModeSwitcher />
  </Flex>
)

const Customer = Codec.interface({
  id: string,
  name: string,
  annotation: string,
  estateId: string,
  cityId: string,
})

type Customer = GetType<typeof Customer>

const fetchCustomerList = async (): Promise<Customer[]> => {
  const { data } = await api.get<{ data: Customer[] }>("/customer")
  return data.data
}

const CustomerList = () => {
  const { data, isLoading } = useQuery("customer-list", fetchCustomerList)

  return isLoading ? (
    <Box>{"loading"}</Box>
  ) : data ? (
    <VStack as="ul" w="100%" spacing="6">
      {data.map((customer, i) => (
        <Card
          key={`${customer.id}${i}`}
          id={customer.id}
          title={customer.name}
          subtitle={`${customer.cityId} / ${customer.estateId}`}
        />
      ))}
    </VStack>
  ) : null
}
