import { useEffect, useRef, useState } from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import {
  ArrowLeftIcon,
  ChevronRightIcon,
  LoaderIcon,
  TrashIcon,
} from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const [errors, setErrors] = useState([])
  const [saveIsLoading, setSaveIsLoading] = useState(false)

  const navigate = useNavigate()

  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }

  const handleDeleteTask = async (taskId) => {
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error("Erro ao deletar tarefa. Por favor tente novamente.")
    }
    handleBackClick()
  }

  const handleUpdateTask = async (taskId) => {
    setSaveIsLoading(true)
    const newErrors = []
    const title = titleRef.current.value
    const time = timeRef.current.value
    const description = descriptionRef.current.value

    if (!title.trim()) {
      newErrors.push({ inputName: "title", message: "O título é obrigatório." })
    }
    if (!time.trim()) {
      newErrors.push({ inputName: "time", message: "O horário é obrigatório." })
    }
    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "A descrição é obrigatória.",
      })
    }

    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }
    console.log("a")
    const taskUpdated = { title, time, description }
    const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
      method: "PATCH",
      body: JSON.stringify(taskUpdated),
    })
    if (!response.ok) {
      setSaveIsLoading(false)
      return toast.error("Erro ao atualizar tarefa. Por favor tente novamente.")
    }

    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success("Tarefa atualizada com sucesso!")

    // handleBackClick()
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      // if (!response.ok) return
      const taskDetails = await response.json()
      setTask(taskDetails)
    }
    fetchTask()
  }, [taskId])

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <div className="flex w-full justify-between">
          <div>
            <button
              onClick={handleBackClick}
              className="mb-3 flex h-8 w-8 items-center justify-center rounded-full bg-brand-primary"
            >
              <ArrowLeftIcon />
            </button>
            <div className="flex items-center gap-1 text-xs">
              <Link className="cursor-pointer text-brand-text-gray" to="/">
                Minhas Tarefas
              </Link>
              <ChevronRightIcon className="text-brand-text-gray" />
              <span className="font-semibold text-brand-primary">
                {task?.title}
              </span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <div className="self-end">
            <Button
              className="h-fit self-end"
              color="danger"
              onClick={() => handleDeleteTask(taskId)}
            >
              <TrashIcon />
              Deletar tarefa
            </Button>
          </div>
        </div>

        <div className="space-y-6 rounded-xl bg-brand-white p-6">
          <div>
            <Input
              id="title"
              label="Título"
              ref={titleRef}
              defaultValue={task?.title}
              errorMessage={titleError?.message}
            />
          </div>
          <div>
            <TimeSelect
              ref={timeRef}
              defaultValue={task?.time}
              errorMessage={timeError?.message}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              ref={descriptionRef}
              defaultValue={task?.description}
              errorMessage={descriptionError?.message}
            />
          </div>
        </div>

        <div className="flex w-full justify-end gap-3">
          <Button
            color="primary"
            size="large"
            onClick={() => handleUpdateTask(taskId)}
            disabled={saveIsLoading}
          >
            {saveIsLoading && <LoaderIcon className="animate-spin" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
