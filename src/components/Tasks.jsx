import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloud-sun.svg?react"
import MoonIcon from "../assets/icons/moon.svg?react"

export function Tasks() {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00adb5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar tarefa
            <TrashIcon />
          </Button>
          <Button>
            Nova tarefa
            <AddIcon />
          </Button>
        </div>
      </div>

      {/* Lista de Tarefas */}

      <div className="rounded-xl bg-white p-6">
        {/* Manhã */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <SunIcon />
            <p className="text-sm text-[#9a9c9f]">Manhã</p>
          </div>
        </div>

        {/* Tarde */}
        <div className="my-6 space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <CloudSunIcon />
            <p className="text-sm text-[#9a9c9f]">Tarde</p>
          </div>
        </div>

        {/* Noite */}
        <div className="space-y-3">
          <div className="flex gap-2 border-b border-solid border-[#f4f4f5] pb-1">
            <MoonIcon />
            <p className="text-sm text-[#9a9c9f]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}
