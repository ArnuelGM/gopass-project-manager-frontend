import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { projectService } from '../services/project.service';
import { type CreateProjectDto } from '../types/project.types';
import { useNavigate } from 'react-router-dom';

export const useProjects = (projectId?: string) => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

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

  const deleteProjectMutation = useMutation({
    mutationFn: (id: string) => projectService.deleteProject(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      navigate('/projects'); // Redirigir al dashboard tras eliminar
    },
  });

  return {
    projectsQuery,
    projectQuery,
    createProjectMutation,
    deleteProjectMutation,
  };
};