import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { worker } from "./mocks/browser"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import theme from "./theme"

const queryClient = new QueryClient()

function prepare() {
  if (process.env.NODE_ENV === "development") {
    return worker.start()
  }
  return Promise.resolve()
}

void prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider resetCSS theme={theme}>
          <ColorModeScript initialColorMode={theme.config.initialColorMode} />
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})
