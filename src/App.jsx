import Sidebar from "./components/Sidebar"
import { Tasks } from "./components/Tasks"

export default function App() {
  return (
    <div className="flex gap-9">
      <Sidebar />
      <Tasks />
    </div>
  )
}
