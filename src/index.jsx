import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import { QueryClient, QueryClientProvider } from "react-query"
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react"
import { BrowserRouter } from "react-router-dom"
import { ReactQueryDevtools } from "react-query/devtools"
import { AxiosProvider, SessionProvider } from "./providers"

import theme from "./theme"

const queryClient = new QueryClient()

function prepare() {
  // if (process.env.NODE_ENV === "development") {
  //   return worker.start()
  // }
  return Promise.resolve()
}

void prepare().then(() => {
  ReactDOM.render(
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <SessionProvider>
          <AxiosProvider>
            <ChakraProvider resetCSS theme={theme}>
              <ColorModeScript
                initialColorMode={theme.config.initialColorMode}
              />
              <BrowserRouter>
                <App />
              </BrowserRouter>
            </ChakraProvider>
          </AxiosProvider>
        </SessionProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})
