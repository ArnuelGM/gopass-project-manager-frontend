import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar } from "lucide-react";
import { type Task } from '../types/task.types';

interface TaskBoardItemProps {
  task: Task;
}

/**
 * Representación individual de una tarea dentro de los carriles del tablero.
 */
const TaskBoardItem = ({ task }: TaskBoardItemProps) => {
  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <Card className="bg-white border-0 mt-px">
      <CardHeader>
        <CardTitle>
          <h4 className="font-normal text-sm text-gray-800 leading-snug">{task.title}</h4>
        </CardTitle>
      </CardHeader>
      <CardFooter className="px-4 py-2 flex items-center gap-2 text-[10px] font-medium text-gray-400">
        <Calendar size={12} />
        <span>Created: {formattedDate}</span>
      </CardFooter>
    </Card>
  );
};

export default TaskBoardItem;