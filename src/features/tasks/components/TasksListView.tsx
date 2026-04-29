import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { TaskStatus, type Task } from '../types/task.types';
import { TaskStatusesMenuChanger } from "./TasksStatusesListChanger";
import { useTasks } from "../hooks/useTasks";
import { Info, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ConfirmDeleteDialog from "@/components/common/ConfirmDeleteDialog";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface TasksListViewProps {
  tasks: Task[];
  projectId: string;
  onTaskClick?: (task: Task) => void
}

export const TasksListView = ({ tasks, projectId, onTaskClick }: TasksListViewProps) => {

  const { updateTaskMutation, deleteTaskMutation } = useTasks(projectId)

  const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  const handleDelete = (id: string) => {
    deleteTaskMutation.mutate(id);
  }

  const handleUpdateTaskStatus = (task: Task, newStatus: TaskStatus) => {
    task.status = newStatus
    updateTaskMutation.mutate({
      taskId: task.id,
      updates: task
    })
  }

  return (
    <div className="border rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead className="w-[200px]">Created</TableHead>
            <TableHead className="w-[130px]">
              <Tooltip>
                <TooltipTrigger className="flex gap-2 items-center">
                  <Info size={14} />
                  Status
                </TooltipTrigger>
                <TooltipContent>
                  <p>Right click on any status to change</p>
                </TooltipContent>
              </Tooltip>
            </TableHead>
            <TableHead className="w-8"/>
          </TableRow>
        </TableHeader>
        <TableBody>
          {tasks.length === 0 ? (
            <TableRow>
              <TableCell colSpan={2} className="text-center py-10 text-gray-500 italic">
                No tasks found for this project.
              </TableCell>
            </TableRow>
          ) : (
            tasks.map((task) => (
              <TableRow key={task.id} className="group" onClick={() => onTaskClick && onTaskClick(task)}>
                <TableCell className="font-normal">{task.title}</TableCell>
                <TableCell>{formatDate(task.createdAt)}</TableCell>
                <TableCell>
                  <TaskStatusesMenuChanger
                    task={task}
                    onChange={handleUpdateTaskStatus}
                  />
                </TableCell>
                <TableCell>
                  <div onClick={(e) => e.stopPropagation()}>
                    <ConfirmDeleteDialog
                      onConfirm={() => handleDelete(task.id)}
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
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};