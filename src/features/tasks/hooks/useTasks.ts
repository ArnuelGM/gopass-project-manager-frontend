import { useQuery } from '@tanstack/react-query';
import { taskService } from '../services/task.service';

export const useTasks = (projectId: string) => {
  return useQuery({
    queryKey: ['tasks', projectId],
    queryFn: () => taskService.getTasksByProject(projectId),
    enabled: !!projectId,
  });
};