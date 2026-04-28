import { Link } from 'react-router-dom';
import { Folder, Calendar } from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card';
import type { Project } from '@/features/projects/types/project.types';

interface CardProjectItemsProps {
  project: Project
}

export const CardProjectItem = ({ project }: CardProjectItemsProps) => {
  return (
    <Link 
      to={`/projects/${project.id}`}
      className='group'
    >
      <Card>
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
        <CardFooter>
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <Calendar size={14} />
            <span>Created: {new Date(project.createdAt).toLocaleDateString()}</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  )
}