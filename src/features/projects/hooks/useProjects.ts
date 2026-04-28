import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import { type CreateProjectDto } from '../types/project.types';

export const useProjects = (projectId?: string) => {
  const queryClient = useQueryClient();

  // Query para obtener todos los proyectos
  const projectsQuery = useQuery({
    queryKey: ['projects'],
    queryFn: projectService.getProjects,
  });

  // Query para un proyecto específico
  const projectQuery = useQuery({
    queryKey: ['project', projectId],
    queryFn: () => projectService.getProjectById(projectId!),
    enabled: !!projectId, // Solo se ejecuta si el ID existe
  });

  // Mutation para crear un nuevo proyecto
  const createProjectMutation = useMutation({
    mutationFn: (newProject: CreateProjectDto) => projectService.createProject(newProject),
    onSuccess: () => {
      // Invalida la caché para refrescar la lista automáticamente
      queryClient.invalidateQueries({ queryKey: ['projects'] });
    },
  });

  return {
    projectsQuery,
    projectQuery,
    createProjectMutation,
  };
};