import api from '../../../api/axios.config';
import { type Task } from '../types/task.types';

export const taskService = {
  getTasksByProject: async (projectId: string): Promise<Task[]> => {
    const { data } = await api.get<Task[]>(`/tasks/project/${projectId}`);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};