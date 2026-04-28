import api from '../../../api/axios.config';
import { type CreateTaskDto, type Task } from '../types/task.types';

export const taskService = {
  getTasksByProject: async (projectId: string): Promise<Task[]> => {
    const { data } = await api.get<Task[]>(`/tasks/project/${projectId}`);
    return data;
  },

  createTask: async (task: CreateTaskDto): Promise<Task> => {
    const { data } = await api.post<Task>('/tasks', task);
    return data;
  },

  deleteTask: async (id: string): Promise<void> => {
    await api.delete(`/tasks/${id}`);
  }
};