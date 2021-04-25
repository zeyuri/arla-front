import React from "react"
import ReactDOM from "react-dom"
import App from "./App"
import "./index.css"
import { worker } from "./mocks/browser"
import { QueryClient, QueryClientProvider } from "react-query"

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
        <App />
      </QueryClientProvider>
    </React.StrictMode>,
    document.getElementById("root")
  )
})
