import React from "react"
import ReactDOM from "react-dom/client"
import "./index.css"
import App from "./App"

import { AppContextProvider } from "./Context/AppContext"
import { StyledEngineProvider } from "@mui/material"

import { QueryClient, QueryClientProvider } from "react-query"

const queryClient = new QueryClient()

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement)
root.render(
  <React.StrictMode>
    <StyledEngineProvider injectFirst>
      <QueryClientProvider client={queryClient}>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </QueryClientProvider>
    </StyledEngineProvider>
  </React.StrictMode>
)
