import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { type Task, TaskStatus } from '../types/task.types';
import TaskBoardItem from './TaskBoardItem';

interface TasksBoardViewProps {
  tasks: Task[];
}

export const TasksBoardView = ({ tasks }: TasksBoardViewProps) => {
  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'bg-gray-100/50' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-blue-50/50' },
    { id: TaskStatus.ON_HOLD, title: 'On Hold', color: 'bg-yellow-50/50' },
    { id: TaskStatus.BLOCKED, title: 'Blocked', color: 'bg-red-50/50' },
    { id: TaskStatus.DONE, title: 'Done', color: 'bg-green-50/50' },
  ];

  return (
    <div className="flex gap-4 overflow-x-auto p-1 min-h-[calc(100vh-350px)] items-stretch">
      {columns.map((column) => {
        const columnTasks = tasks.filter((t) => t.status === column.id);

        return (
          <div key={column.id} className="flex-1 min-w-[280px] flex flex-col">
            <Card className={`${column.color} border-none shadow-none flex flex-col h-full overflow-hidden`}>
              <CardHeader className="py-4 px-4 shrink-0">
                <CardTitle className="text-xs font-bold flex justify-between items-center text-gray-500 uppercase tracking-widest">
                  {column.title}
                  <span className="bg-white/80 px-2.5 py-0.5 rounded-full text-[10px] border border-gray-200 text-gray-600">
                    {columnTasks.length}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="px-3 pb-4 flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
                <div className="flex flex-col gap-3">
                  {columnTasks.length > 0 ? (
                    columnTasks.map((task) => (
                      <TaskBoardItem key={task.id} task={task} />
                    ))
                  ) : (
                    <div className="flex flex-col items-center justify-center py-10 border border-dashed border-gray-300 rounded-lg opacity-40">
                      <p className="text-[10px] text-gray-500 uppercase font-semibold">
                        No tasks
                      </p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      })}
    </div>
  );
};