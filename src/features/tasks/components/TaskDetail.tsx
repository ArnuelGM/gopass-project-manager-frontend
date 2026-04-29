import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Calendar, CheckCircle2, Clock, FileText, Info } from "lucide-react";
import { type Task, TaskPriority, TaskStatus } from "../types/task.types";
import { useTasks } from "../hooks/useTasks";
import { TaskStatusesMenuChanger } from "./TasksStatusesListChanger";
import { TaskPriorityMenuChanger } from "./TasksPriorityListChanger";

interface TaskDetailProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetail = ({ task, isOpen, onClose }: TaskDetailProps) => {
  const { taskDetail, updateTaskMutation } = useTasks(task?.projectId || "", task?.id);
  const currentTask = taskDetail || task;

  if (!currentTask) return null;

  const handleMarkAsDone = () => {
    updateTaskMutation.mutate({
      taskId: task.id,
      updates: { 
        status: TaskStatus.DONE,
      },
    });
  };

  const handleUpdateTaskStatus = (task: Task, status: TaskStatus) => {
    updateTaskMutation.mutate({
      taskId: task.id,
      updates: { status },
    });
  }

  const handleUpdateTaskPriority = (task: Task, priority: TaskPriority) => {
    updateTaskMutation.mutate({
      taskId: task.id,
      updates: { priority },
    });
  }

  const formatDate = (date: string | null) => 
    date ? new Date(date).toLocaleDateString(undefined, { dateStyle: 'long' }) : 'Not set';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="space-y-4 text-left">
          <div className="flex items-center gap-2">
            <TaskStatusesMenuChanger
              task={currentTask}
              onChange={handleUpdateTaskStatus}
            />
            <TaskPriorityMenuChanger
              task={currentTask}
              onChange={handleUpdateTaskPriority}
            />
          </div>
          <SheetTitle className="text-2xl font-bold leading-tight">
            {currentTask.title}
          </SheetTitle>
          <SheetDescription className="text-gray-500 italic">
            Task details and management
          </SheetDescription>
        </SheetHeader>

        <div className="px-4 space-y-6">
          {/* Metadata Section */}
          <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
            <div className="flex items-center gap-3 text-sm">
              <Calendar className="text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500 font-medium">Created At</p>
                <p className="text-slate-700">{formatDate(currentTask.createdAt)}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 text-sm">
              <Clock className="text-slate-400" size={18} />
              <div>
                <p className="text-xs text-slate-500 font-medium">Estimated Finish Date</p>
                <p className="text-slate-700">{formatDate(currentTask.finishDate)}</p>
              </div>
            </div>

            {currentTask.status === TaskStatus.DONE && (
              <div className="flex items-center gap-3 text-sm border-t pt-3 mt-1 border-slate-200">
                <CheckCircle2 className="text-green-500" size={18} />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Completed On</p>
                  <p className="text-green-700 font-semibold">{formatDate(currentTask.finishedAt)}</p>
                </div>
              </div>
            )}
          </div>

          <Separator />

          {/* Description Section */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 text-slate-900 font-semibold">
              <FileText size={18} />
              <h3>Description</h3>
            </div>
            <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
              {currentTask.description || "No description provided for this task."}
            </p>
          </div>
        </div>

        <SheetFooter className="mt-6">
          {currentTask.status !== TaskStatus.DONE && (
            <Button 
              className="w-full bg-green-600 hover:bg-green-700 text-white gap-2 cursor-pointer"
              onClick={handleMarkAsDone}
              disabled={updateTaskMutation.isPending}
            >
              <CheckCircle2 size={18} />
              {updateTaskMutation.isPending ? "Updating..." : "Mark as Done"}
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetail;