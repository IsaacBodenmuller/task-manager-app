import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 } from "uuid"

import { LoaderIcon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({
  isOpen,
  handleClose,
  onSubmitSuccess,
  onSubmitError,
}) => {
  const [errors, setErrors] = useState([])
  const [createIsLoading, setCreateIsLoading] = useState(false)

  const nodeRef = useRef()
  const titleRef = useRef()
  const timeRef = useRef()
  const descriptionRef = useRef()

  const handleSaveClick = async () => {
    setCreateIsLoading(true)
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
      return setCreateIsLoading(false)
    }

    const task = { id: v4(), title, time, description, status: "not_started" }
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      setCreateIsLoading(false)
      return onSubmitError()
    }
    onSubmitSuccess(task)
    setCreateIsLoading(false)
    handleClose()
  }

  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div
            ref={nodeRef}
            className="fixed bottom-0 left-0 top-0 flex h-screen w-screen items-center justify-center backdrop-blur"
          >
            <div className="rounded-xl bg-white p-5 text-center shadow">
              <h2 className="text-xl font-semibold text-brand-dark-blue">
                Nova tarefa
              </h2>
              <p className="mb-4 mt-1 text-sm text-brand-text-gray">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Insira o título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                  disabled={createIsLoading}
                />
                <TimeSelect
                  errorMessage={timeError?.message}
                  ref={timeRef}
                  disabled={createIsLoading}
                />
                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descreva a tarefa"
                  errorMessage={descriptionError?.message}
                  ref={descriptionRef}
                  disabled={createIsLoading}
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full"
                    color="secondary"
                    onClick={() => handleClose()}
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="w-full"
                    onClick={() => handleSaveClick()}
                    disabled={createIsLoading}
                  >
                    {createIsLoading && (
                      <LoaderIcon className="animate-spin text-brand-white" />
                    )}
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

AddTaskDialog.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmitSuccess: PropTypes.func.isRequired,
  onSubmitError: PropTypes.func.isRequired,
}

export default AddTaskDialog
