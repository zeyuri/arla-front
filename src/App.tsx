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
            <ConsumerList />
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

const Consumer = Codec.interface({
  id: string,
  name: string,
  annotation: string,
  estateId: string,
  cityId: string,
})

type Consumer = GetType<typeof Consumer>

const fetchConsumerList = async (): Promise<Consumer[]> => {
  const { data } = await api.get<{ data: Consumer[] }>("/consumer")
  return data.data
}

const ConsumerList = () => {
  const { data, isLoading } = useQuery("consumer-list", fetchConsumerList)

  return isLoading ? (
    <Box>{"loading"}</Box>
  ) : data ? (
    <VStack as="ul" w="100%" spacing="6">
      {data.map((consumer, i) => (
        <Card
          key={`${consumer.id}${i}`}
          id={consumer.id}
          title={consumer.name}
          subtitle={`${consumer.cityId} / ${consumer.estateId}`}
        />
      ))}
    </VStack>
  ) : null
}
