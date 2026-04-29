import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import type { CreateTaskDto, Task } from '../types/task.types';

export const useTasks = (projectId: string, taskId?: string) => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => taskService.getTasksByProject(projectId),
    enabled: !!projectId,
  });

  const taskDetailQuery = useQuery({
    queryKey: ['task', taskId],
    queryFn: () => taskService.getTaskById(taskId!), // Asumiendo que existe en el service
    enabled: !!taskId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskDto) => taskService.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  const updateTaskMutation = useMutation({
    mutationFn: ({ taskId, updates }: { taskId: string, updates: Partial<Task> }) => 
      taskService.updateTask(taskId, updates),
    onSuccess: (updatedTask) => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
      queryClient.setQueryData(['task', updatedTask.id], updatedTask);
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  return {
    // Datos y estados de carga
    tasks: tasksQuery.data || [],
    isLoading: tasksQuery.isLoading,
    isError: tasksQuery.isError,
    
    // Detalle de tarea individual
    taskDetail: taskDetailQuery.data,
    isDetailLoading: taskDetailQuery.isLoading,

    // Operaciones
    createTaskMutation,
    updateTaskMutation,
    deleteTaskMutation,
  }
};