import { Card, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Calendar, Trash2 } from "lucide-react";
import { type Task } from '../types/task.types';
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import { useTasks } from "../hooks/useTasks";
import { Button } from "@/components/ui/button";
import { useDraggable } from "@dnd-kit/react";

interface TaskBoardItemProps {
  task: Task;
  onTaskClick?: (task: Task) => void;
}

const TaskBoardItem = ({ task, onTaskClick }: TaskBoardItemProps) => {
  const { deleteTaskMutation } = useTasks(task.projectId);
  const { ref } = useDraggable({ id: task.id, data: task })

  const formattedDate = new Date(task.createdAt).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  const handleDelete = () => {
    deleteTaskMutation.mutate(task.id);
  }

  return (
    <Card className="bg-white border-0 mt-px group" ref={ref} onClick={() => onTaskClick(task)}>
      <CardHeader>
        <CardTitle>
          <h4 className="font-normal text-sm text-gray-800 leading-snug">{task.title}</h4>
        </CardTitle>
      </CardHeader>
      <CardFooter className="px-4 py-2 flex items-center justify-between">
        <div className="flex items-center gap-2 text-[12px] font-medium text-gray-400">
          <Calendar size={12} />
          <span>Created on {formattedDate}</span>
        </div>

        <div onClick={(e) => e.stopPropagation()}>
          <ConfirmDeleteDialog
            onConfirm={handleDelete}
            isLoading={deleteTaskMutation.isPending}
            trigger={
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-4 w-4 text-gray-400 hover:text-red-600 hover:bg-red-50 transition-colors opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </Button>
            }
          />
        </div>
      </CardFooter>
    </Card>
  );
};

export default TaskBoardItem;