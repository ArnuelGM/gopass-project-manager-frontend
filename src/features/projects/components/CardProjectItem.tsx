import { Link } from 'react-router-dom';
import { Folder, Calendar, Trash2, SquarePen } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import type { Project } from '@/features/projects/types/project.types';
import ConfirmDeleteDialog from '@/components/common/ConfirmDeleteDialog';
import { Button } from '@/components/ui/button';
import { useProjects } from '../hooks/useProjects';
import { EditProjectDialog } from './EditProjectDialog';
import { useState } from 'react';

interface CardProjectItemsProps {
  project: Project
}

export const CardProjectItem = ({ project }: CardProjectItemsProps) => {
  
  const { deleteProjectMutation, projectQuery } = useProjects(project.id)
  const { data: projectData } = projectQuery
  const [isEditOpen, setIsEditOpen] = useState(false)

  const handleDeleteProject = () => {
    deleteProjectMutation.mutate(project.id);
  }

  return (
    <>
      <Link 
        to={`/projects/${project.id}`}
        className='group'
      >
        <Card className="group">
          <CardHeader>
            <CardTitle>
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-indigo-50 text-indigo-600 rounded-lg group-hover:bg-indigo-600 group-hover:text-white transition-colors">
                  <Folder size={24} />
                </div>
                <h2 className="font-bold text-lg text-gray-900">{project.name}</h2>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 text-sm line-clamp-2 mb-4">{project.description}</p>
          </CardContent>
          <CardFooter className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-gray-400">
              <Calendar size={14} />
              <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
            </div>
            <div 
              className="flex items-center gap-2"
              onClick={(e) => {
              // Prevent navigation to project detail page
              e.preventDefault();
            }}>
              <Button 
                onClick={() => setIsEditOpen(true)}
                variant="ghost" 
                size="icon" 
                className="cursor-pointer h-4 w-4 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <SquarePen size={20}/>
              </Button>
              <ConfirmDeleteDialog
                onConfirm={handleDeleteProject}
                isLoading={deleteProjectMutation.isPending}
                itemName={project.name}
                trigger={
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="cursor-pointer h-4 w-4 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </Button>
                }
              />
            </div>
          </CardFooter>
        </Card>
      </Link>
      {project && (
        <EditProjectDialog
          project={projectData} 
          isOpen={isEditOpen} 
          onClose={() => setIsEditOpen(false)} 
        />
      )}
    </>
  )
}