import { useParams, Link } from 'react-router-dom';
import { ChevronLeft, Calendar, Info, Loader2, AlertCircle, EllipsisVertical, SquarePen, Trash2 } from 'lucide-react';
import { useProjects } from '../features/projects/hooks/useProjects';
import TaskManager from '@/features/tasks/components/TaskManager';
import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog';
import { CreateTaskButtonDialog } from '@/features/tasks/components/CreateTaskButtonDialog';
import { useTasks } from '@/features/tasks/hooks/useTasks';
import type { CreateTaskDto } from '@/features/tasks/types/task.types';
import { toast } from 'sonner'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { useState } from 'react';
import { EditProjectDialog } from '@/features/projects/components/EditProjectDialog';

const ProjectDetails = () => {
  const { id } = useParams<{ id: string }>();
  const { projectQuery, deleteProjectMutation } = useProjects(id);
  const { data: project, isLoading, isError } = projectQuery;
  const { createTaskMutation } = useTasks(project?.id)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false);

  const handleDelete = () => {
    if (id) {
      deleteProjectMutation.mutate(id);
    }
  };

  const hanldeCreateTask = (data: CreateTaskDto) => {
    if(project?.id) {
      if (!data.title) {
        toast.error("The field \"title\" is required.")
        return;
      }
      createTaskMutation.mutate(data)
    }
  }

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-64 gap-4">
        <Loader2 className="animate-spin text-indigo-600" size={40} />
        <p className="text-gray-500 animate-pulse">Loading project details...</p>
      </div>
    );
  }

  if (isError || !project) {
    return (
      <div className="bg-red-50 border border-red-200 text-red-700 p-6 rounded-xl flex items-center gap-4">
        <AlertCircle size={24} />
        <div>
          <h3 className="font-bold">Error</h3>
          <p>Could not load project details. Please verify the ID or your connection.</p>
          <Link to="/projects" className="text-sm underline mt-2 block">Back to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header & Back Button */}
      <div className="flex items-center gap-4">
        <Link 
          to="/projects" 
          className="p-2 hover:bg-white hover:shadow-sm rounded-full transition-all border border-transparent hover:border-gray-200"
        >
          <ChevronLeft size={24} className="text-gray-600" />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">{project.name}</h1>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar size={14} />
            <span>Created on {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </div>
        <div className='ml-auto'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size='icon'>
                <EllipsisVertical size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => setIsEditOpen(true)}>
                <SquarePen size={20}/> Edit
              </DropdownMenuItem>
              <DropdownMenuSeparator/>
              <DropdownMenuItem variant='destructive' onClick={() => setOpenModalDelete(true)}>
                <Trash2 /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Project Info Card */}
      <div>
        <div className="flex items-start gap-3 mb-4">
          <div className="p-2 bg-blue-50 text-blue-600 rounded-lg">
            <Info size={20} />
          </div>
          <div>
            <pre className="text-gray-700 mt-1 leading-relaxed font-sans">
              {project.description || 'No description provided for this project.'}
            </pre>
          </div>
        </div>
      </div>

      {/* Tasks Section Placeholder */}
      <div className="bg-gray-50 border-t border-gray-100">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-lg font-bold text-gray-900">Project Tasks</h3>
          <CreateTaskButtonDialog
            projectId={project.id}
            onSubmit={hanldeCreateTask}
            isPending={createTaskMutation.isPending}
            disabled={createTaskMutation.isPending}
          />
        </div>

        {id && <TaskManager projectId={id} />}
      </div>

      <ConfirmDeleteDialog
        inline
        open={openModalDelete}
        onOpenChange={setOpenModalDelete}
        onConfirm={handleDelete}
        itemName={project.name}
      />

      {project && (
        <EditProjectDialog
          project={project} 
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
        />
      )}
    </div>
  );
};

export default ProjectDetails;