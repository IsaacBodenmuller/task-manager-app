import { Toaster } from "sonner"

import Sidebar from "./components/Sidebar"
import { Tasks } from "./components/Tasks"

export default function App() {
  return (
    <div className="flex">
      <Toaster
        toastOptions={{
          style: {
            color: "#35383e",
          },
        }}
      />
      <Sidebar />
      <Tasks />
    </div>
  )
}
