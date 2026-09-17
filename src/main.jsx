import "./index.css"

import React from "react"
import ReactDOM from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App.jsx"
import TaskDetails from "./pages/task-details.jsx"

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
    <Toaster
      toastOptions={{
        style: {
          color: "#35383e",
        },
      }}
    />
    <RouterProvider router={router} />
  </React.StrictMode>
)
