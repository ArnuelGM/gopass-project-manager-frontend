import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Calendar as CalendarIcon, CheckCircle2, Clock, FileText, Pencil, Save, X } from "lucide-react";
import { type Task, TaskStatus } from "../types/task.types";
import { useTasks } from "../hooks/useTasks";
import { TaskStatusesMenuChanger } from "./TasksStatusesListChanger";
import { TaskPriorityMenuChanger } from "./TasksPriorityListChanger";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface TaskDetailProps {
  task: Task | null;
  isOpen: boolean;
  onClose: () => void;
}

const TaskDetail = ({ task, isOpen, onClose }: TaskDetailProps) => {
  const { taskDetail, updateTaskMutation } = useTasks(task?.projectId || "", task?.id);
  const currentTask = taskDetail || task;

  // Estados para controlar qué campo está en modo edición
  const [editingField, setEditingField] = useState<"title" | "description" | "finishDate" | null>(null);

  const { register, handleSubmit, watch, reset, setValue } = useForm({
    defaultValues: {
      title: "",
      description: "",
      finishDate: "",
    },
  });

  // Sincronizar formulario cuando cambia la tarea
  useEffect(() => {
    if (currentTask) {
      reset({
        title: currentTask.title,
        description: currentTask.description || "",
        finishDate: currentTask.finishDate || "",
      });
    }
  }, [currentTask, reset]);

  if (!currentTask) return null;

  // Detectar si hay cambios comparando con currentTask
  const watchedFields = watch();
  const isDirty = 
    watchedFields.title !== currentTask.title ||
    watchedFields.description !== (currentTask.description || "") ||
    watchedFields.finishDate !== (currentTask.finishDate || "");

  const onSaveAll = (data: any) => {
    updateTaskMutation.mutate({
      taskId: currentTask.id,
      updates: data,
    }, {
      onSuccess: () => setEditingField(null)
    });
  };

  const handleMarkAsDone = () => {
    updateTaskMutation.mutate({
      taskId: currentTask.id,
      updates: { status: TaskStatus.DONE },
    });
  };

  const formatDateLabel = (date: string | null) => 
    date ? format(new Date(date), 'PPP') : 'Not set';

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <form onSubmit={handleSubmit(onSaveAll)}>
          <SheetHeader className="space-y-4 text-left">
            <div className="flex items-center gap-2">
              <TaskStatusesMenuChanger
                task={currentTask}
                onChange={(t, status) => updateTaskMutation.mutate({ taskId: t.id, updates: { status } })}
              />
              <TaskPriorityMenuChanger
                task={currentTask}
                onChange={(t, priority) => updateTaskMutation.mutate({ taskId: t.id, updates: { priority } })}
              />
            </div>

            {/* Titulo Editable */}
            <div className="group relative">
              {editingField === "title" ? (
                <div className="flex gap-2 items-center">
                  <Input 
                    {...register("title")} 
                    className="text-2xl font-bold h-auto py-1 px-2 focus-visible:ring-0" 
                    autoFocus
                  />
                  <Button type="button" size="icon" variant="ghost" onClick={() => setEditingField(null)} className="cursor-pointer">
                    <X size={16}/>
                  </Button>
                </div>
              ) : (
                <div className="flex items-center justify-between">
                  <SheetTitle className="text-2xl font-bold leading-tight flex-1">
                    {watchedFields.title}
                  </SheetTitle>
                  <Button type="button" variant="ghost" size="icon" onClick={() => setEditingField("title")} className="opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer">
                    <Pencil size={14} />
                  </Button>
                </div>
              )}
            </div>
            
            <SheetDescription className="text-gray-500 italic">
              Task details and management
            </SheetDescription>
          </SheetHeader>

          <div className="px-4 space-y-6">
            {/* Metadata Section */}
            <div className="grid grid-cols-1 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-100">
              <div className="flex items-center gap-3 text-sm">
                <CalendarIcon className="text-slate-400" size={18} />
                <div>
                  <p className="text-xs text-slate-500 font-medium">Created At</p>
                  <p className="text-slate-700">{formatDateLabel(currentTask.createdAt)}</p>
                </div>
              </div>

              {/* Finish Date Editable */}
              <div className="flex items-center justify-between group">
                <div className="flex items-center gap-3 text-sm">
                  <Clock className="text-slate-400" size={18} />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Estimated Finish Date</p>
                    <p className={cn("text-slate-700", !watchedFields.finishDate && "text-slate-400 italic")}>
                      {formatDateLabel(watchedFields.finishDate)}
                    </p>
                  </div>
                </div>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button type="button" variant="ghost" size="icon" className="opacity-0 group-hover:opacity-100 cursor-pointer">
                      <Pencil size={14} />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="end">
                    <Calendar
                      mode="single"
                      selected={watchedFields.finishDate ? new Date(watchedFields.finishDate) : undefined}
                      onSelect={(date) => setValue("finishDate", date ? date.toISOString() : "")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {currentTask.status === TaskStatus.DONE && (
                <div className="flex items-center gap-3 text-sm border-t pt-3 mt-1 border-slate-200">
                  <CheckCircle2 className="text-green-500" size={18} />
                  <div>
                    <p className="text-xs text-slate-500 font-medium">Completed On</p>
                    <p className="text-green-700 font-semibold">{formatDateLabel(currentTask.finishedAt)}</p>
                  </div>
                </div>
              )}
            </div>

            <Separator />

            {/* Description Section Editable */}
            <div className="space-y-3 group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-slate-900 font-semibold">
                  <FileText size={18} />
                  <h3>Description</h3>
                </div>
                <Button type="button" variant="ghost" size="icon" onClick={() => setEditingField("description")} className="opacity-0 group-hover:opacity-100 cursor-pointer">
                  <Pencil size={14} />
                </Button>
              </div>

              {editingField === "description" ? (
                <div className="space-y-2">
                  <Textarea 
                    {...register("description")} 
                    className="text-sm min-h-[120px]" 
                    autoFocus
                  />
                  <Button 
                    type="button"
                    size="sm" 
                    variant="secondary" 
                    onClick={() => setEditingField(null)}
                    className="cursor-pointer"
                  >
                    Close editor
                  </Button>
                </div>
              ) : (
                <p className={cn("text-slate-600 text-sm leading-relaxed whitespace-pre-wrap", !watchedFields.description && "italic text-slate-400")}>
                  {watchedFields.description || "No description provided."}
                </p>
              )}
            </div>
          </div>

          <SheetFooter className="flex-col gap-3 sm:flex-col mt-6">
            {isDirty && (
              <Button 
                type="submit"
                className="w-full transition-all animate-in fade-in slide-in-from-bottom-2 cursor-pointer"
                disabled={updateTaskMutation.isPending}
              >
                <Save size={18} />
                {updateTaskMutation.isPending ? "Saving..." : "Save Changes"}
              </Button>
            )}

            {currentTask.status !== TaskStatus.DONE && (
              <Button 
                type="button"
                variant="outline"
                className="w-full border-green-600 text-green-700 hover:bg-green-50 gap-2 cursor-pointer"
                onClick={handleMarkAsDone}
                disabled={updateTaskMutation.isPending}
              >
                <CheckCircle2 size={18} />
                Mark as Done
              </Button>
            )}
          </SheetFooter>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default TaskDetail;