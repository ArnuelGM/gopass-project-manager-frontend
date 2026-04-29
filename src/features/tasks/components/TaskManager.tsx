import { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { List, LayoutDashboard, Loader2 } from 'lucide-react';
import { useTasks } from '../hooks/useTasks';
import { TasksListView } from './TasksListView';
import { TasksBoardView } from './TasksBoardView';

interface TaskManagerProps {
  projectId: string;
}

const TaskManager = ({ projectId }: TaskManagerProps) => {
  // Persistencia de la vista en localStorage
  const [view, setView] = useState(() => {
    return localStorage.getItem('taskView') || 'list';
  });

  const { data: tasks, isLoading } = useTasks(projectId);

  useEffect(() => {
    localStorage.setItem('taskView', view);
  }, [view]);

  if (isLoading) {
    return (
      <div className="flex justify-center p-10">
        <Loader2 className="animate-spin text-indigo-600" size={32} />
      </div>
    );
  }

  return (
    <div className="w-full space-y-4">
      <Tabs value={view} onValueChange={setView} className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList variant='line'>
            <TabsTrigger value="list" className="flex gap-2">
              <List size={16} /> List
            </TabsTrigger>
            <TabsTrigger value="board" className="flex gap-2">
              <LayoutDashboard size={16} /> Board
            </TabsTrigger>
          </TabsList>
        </div>

        {/* List View */}
        <TabsContent value="list">
          <TasksListView tasks={tasks} projectId={projectId} />
        </TabsContent>

        {/* Board View (Placeholder) */}
        <TabsContent value="board">
          <TasksBoardView tasks={tasks} projectId={projectId} />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default TaskManager;