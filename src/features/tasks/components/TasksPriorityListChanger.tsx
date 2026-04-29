import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuRadioItem,
  ContextMenuTrigger 
} from "@/components/ui/context-menu";
import { TaskPriority, type Task } from "../types/task.types"
import { Badge } from "@/components/ui/badge";

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
    <ContextMenu>
      <ContextMenuTrigger>
        {getPriorityBadge(task.priority)}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          {TASKS_PRIORITIES.map((taskPriority) => (
            <ContextMenuRadioItem 
              value={taskPriority}
              onClick={(event) => {
                event.stopPropagation();
                if(taskPriority === task.priority) return;
                onChange(task, taskPriority);
              }}
            >
              {getPriorityBadge(taskPriority)}
            </ContextMenuRadioItem>
          ))}
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}