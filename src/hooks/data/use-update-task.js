import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useUpdateTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (task) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        body: JSON.stringify({
          title: task.title.trim(),
          time: task.time,
          decription: task.description.time(),
        }),
      })
      if (!response.ok) {
        console.log(response.json())
        throw new Error("Erro ao atualizar tarefa.")
      }
      const updatedTask = await response.json()
      return updatedTask
    },
    onSuccess: (updatedTask) => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return oldTasks.map((oldTask) => {
          if (oldTask.id === taskId) {
            return updatedTask
          }
          return oldTask
        })
      })
    },
  })
}
