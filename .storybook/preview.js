import { worker } from "../src/mocks/browser"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"
import { ReactQueryDevtools } from "react-query/devtools"

const queryClient = new QueryClient()

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
}

const withProviders = (Story, context) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <Story {...context} />
        <ReactQueryDevtools />
      </ChakraProvider>
    </QueryClientProvider>
  )
}

export const decorators = [withProviders]

if (typeof global.process === "undefined") {
  // Start the mocking when each story is loaded.
  // Repetitive calls to the `.start()` method do not register a new worker,
  // but check whether there's an existing once, reusing it, if so.
  worker.start()
}
