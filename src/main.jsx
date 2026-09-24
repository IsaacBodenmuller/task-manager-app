import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App.jsx"
import TaskDetails from "./pages/TaskDetails.jsx"

const queryClient = new QueryClient()

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetails />,
  },
])
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: "#35383e",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
)
