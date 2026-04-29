import api from '../../../api/axios.config';
import { type Project, type CreateProjectDto } from '../types/project.types';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects');
    return data;
  },

  createProject: async (project: CreateProjectDto): Promise<Project> => {
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  updateProject: async (id: string, updates: Partial<Project>): Promise<Project> => {
    const { data } = await api.patch<Project>(`/projects/${id}`, updates);
    return data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
  },

  deleteProject: async (id: string): Promise<void> => {
    await api.delete(`/projects/${id}`);
  }
};