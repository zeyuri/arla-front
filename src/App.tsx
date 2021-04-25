// import { Codec, string, GetType } from "purify-ts/Codec"
// import api from "./api"
// import { useQuery } from "react-query"
import { Box, Text, Link, VStack, Code, Grid } from "@chakra-ui/react"
import { Logo, ColorModeSwitcher } from "./components"

function App(): JSX.Element {
  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Logo h="40vmin" pointerEvents="none" />
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
      </Grid>
    </Box>
  )
}

export default App

// const Consumer = Codec.interface({
//   id: string,
//   name: string,
//   annotation: string,
//   estateId: string,
//   cityId: string,
// })

// type Consumer = GetType<typeof Consumer>

// const fetchConsumerList = async (): Promise<Consumer[]> => {
//   const { data } = await api.get<Consumer[]>("/consumer")
//   return data
// }

// const { data, error } = useQuery("consumer-list", fetchConsumerList)
