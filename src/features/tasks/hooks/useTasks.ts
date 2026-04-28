import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/task.service';
import type { CreateTaskDto } from '../types/task.types';

export const useTasks = (projectId: string) => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => taskService.getTasksByProject(projectId),
    enabled: !!projectId,
  });

  const createTaskMutation = useMutation({
    mutationFn: (newTask: CreateTaskDto) => taskService.createTask(newTask),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  return {
    ...tasksQuery,
    createTaskMutation,
    deleteTaskMutation
  }
};