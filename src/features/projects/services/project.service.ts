import api from '../../../api/axios.config';
import { type Project, type CreateProjectDto } from '../types/project.types';

export const projectService = {
  getProjects: async (): Promise<Project[]> => {
    const { data } = await api.get<Project[]>('/projects');
    return data;
  },

  createProject: async (project: CreateProjectDto): Promise<Project> => {
    const { data } = await api.get<Project>('/projects', { params: project }); // O api.post dependiendo de tu backend
    // Nota: Según el backend que construimos antes, es un POST
    const response = await api.post<Project>('/projects', project);
    return response.data;
  },

  getProjectById: async (id: string): Promise<Project> => {
    const { data } = await api.get<Project>(`/projects/${id}`);
    return data;
  }
};