import { Loader2 } from 'lucide-react';
import { useProjects } from '../features/projects/hooks/useProjects';
import { Card, CardContent } from '@/components/ui/card';
import { CardProjectItem } from '@/features/projects/components/CardProjectItem';
import { CreateProjectButtonDialog } from '@/features/projects/components/CreateProjectButtonDialog';
import type { CreateProjectDto } from '@/features/projects/types/project.types';
import { toast } from 'sonner'

const Dashboard = () => {
  const { projectsQuery, createProjectMutation } = useProjects();
  const { data: projects, isLoading, isError } = projectsQuery;

  const handleCreateProject = async (data: CreateProjectDto) => {
    const {name, description} = data
    if (!name) {
      toast.error("\"name\" field is required")
    }
    try {
      await createProjectMutation.mutateAsync({ name, description });
      toast.success("Project haz been created.")
    } catch (error) {
      toast.error("Error creating project.")
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin text-indigo-600" size={48} />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Projects Dashboard</h1>
          <p className="text-sm text-gray-600">Manage and track your ongoing projects.</p>
        </div>
        <CreateProjectButtonDialog
          disabled={createProjectMutation.isPending}
          isPending={createProjectMutation.isPending}
          onSubmit={handleCreateProject}
        />
      </div>

      {isError && (
        <div className="bg-red-50 text-red-700 p-4 rounded-lg border border-red-200">
          Error loading projects. Please check if the backend is running.
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {projects && projects.length > 0 ? (
          projects.map((project) => (
            <CardProjectItem key={project.id} project={project}/>
          ))
        ) : (
          <Card>
            <CardContent>
              <p className="text-gray-500 italic">No projects found. Create your first one!</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Dashboard;