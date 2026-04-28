import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { taskService } from '../services/task.service';

export const useTasks = (projectId: string) => {
  const queryClient = useQueryClient();

  const tasksQuery = useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => taskService.getTasksByProject(projectId),
    enabled: !!projectId,
  });

  const deleteTaskMutation = useMutation({
    mutationFn: (id: string) => taskService.deleteTask(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['tasks', projectId] });
    },
  });

  return {
    ...tasksQuery,
    deleteTaskMutation
  }
};