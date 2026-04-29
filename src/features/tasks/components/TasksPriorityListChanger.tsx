import { TaskPriority, type Task } from "../types/task.types"
import { Badge } from "@/components/ui/badge";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

export interface TaskPriorityMenuChangerProps {
  task: Task;
  onChange: (task: Task, newPriority: TaskPriority) => void
}

const TASKS_PRIORITIES: TaskPriority[] = [
  TaskPriority.HIGH,
  TaskPriority.MEDIUM,
  TaskPriority.LOW
]

export const TaskPriorityMenuChanger = ({ task, onChange }: TaskPriorityMenuChangerProps) => {

  const getPriorityBadge = (priority: TaskPriority) => {
    const styles = {
      [TaskPriority.HIGH]: "bg-red-500 text-white",
      [TaskPriority.MEDIUM]: "bg-green-500 text-white",
      [TaskPriority.LOW]: "bg-blue-400 text-white",
    };
    return <Badge className={`${styles[priority]} rounded-none py-2 px-3`}>{priority.toUpperCase()}</Badge>;
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className="cursor-pointer">
        {getPriorityBadge(task.priority)}
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {TASKS_PRIORITIES.map((taskPriority) => (
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={(event) => {
              event.stopPropagation();
              if(taskPriority === task.priority) return;
              onChange(task, taskPriority);
            }}
          >
            {getPriorityBadge(taskPriority)}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}