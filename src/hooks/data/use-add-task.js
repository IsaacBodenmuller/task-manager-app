import { useMutation, useQueryClient } from "@tanstack/react-query"
import { v4 } from "uuid"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (task) => {
      const response = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        body: JSON.stringify({
          id: v4(),
          title: task.title.trim(),
          time: task.time,
          description: task.description.trim(),
          status: "not_started",
        }),
      })
      if (!response.ok) {
        throw new Error("Erro ao criar tarefa.")
      }
      const createdTask = await response.json()
      return createdTask
    },
    onSuccess: (createdTask) => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return [...oldTasks, createdTask]
      })
    },
  })
}
