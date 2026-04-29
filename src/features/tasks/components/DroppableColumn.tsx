import { useDroppable } from '@dnd-kit/react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type Task, TaskStatus } from '../types/task.types';
import TaskBoardItem from './TaskBoardItem';

interface DroppableColumnProps {
  column: { id: TaskStatus; title: string; color: string };
  tasks: Task[];
  onTaskClick?: (task: Task) => void;
}

export const DroppableColumn = ({ column, tasks, onTaskClick }: DroppableColumnProps) => {
  const { ref, isDropTarget } = useDroppable({
    id: column.id,
    data: column
  });

  return (
    <div className="flex-1 min-w-[280px] flex flex-col h-full">
      <Card 
        ref={ref}
        className={`${column.color} border-none shadow-none flex flex-col h-full overflow-hidden transition-all duration-200 ${
          isDropTarget ? 'ring-2 ring-indigo-500 ring-offset-2 bg-indigo-50/30' : ''
        }`}
      >
        <CardHeader className="py-4 px-4 shrink-0">
          <CardTitle className="text-xs font-bold flex justify-between items-center text-gray-500 uppercase tracking-widest">
            {column.title}
            <span className="bg-white px-2 py-0.5 rounded-full text-[10px] border border-gray-200">
              {tasks.length}
            </span>
          </CardTitle>
        </CardHeader>

        <CardContent className="px-3 pb-4 flex-1 overflow-y-auto scrollbar-thin">
          <div className="flex flex-col gap-3 min-h-[150px]">
            {tasks.map((task) => (
              <TaskBoardItem key={task.id} task={task} onTaskClick={onTaskClick} />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};