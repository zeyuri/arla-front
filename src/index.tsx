import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { worker } from "./mocks/browser"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider } from "@chakra-ui/react"

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
        <ChakraProvider>
          <App />
        </ChakraProvider>
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})
