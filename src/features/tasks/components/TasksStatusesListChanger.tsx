import { ContextMenu, ContextMenuContent, ContextMenuGroup, ContextMenuRadioItem, ContextMenuTrigger } from "@/components/ui/context-menu";
import { TaskStatus, type Task } from "../types/task.types"
import { Badge } from "@/components/ui/badge";

export interface TaskStatusesMenuChangerProps {
  task: Task;
  onChange: (task: Task, newStatus: TaskStatus) => void
}

const TASKS_STATUSES: TaskStatus[] = [
  TaskStatus.TODO,
  TaskStatus.ON_HOLD,
  TaskStatus.BLOCKED,
  TaskStatus.IN_PROGRESS,
  TaskStatus.DONE
]

export const TaskStatusesMenuChanger = ({ task, onChange }: TaskStatusesMenuChangerProps) => {

  const getStatusBadge = (status: TaskStatus) => {
    const styles = {
      [TaskStatus.TODO]: "bg-gray-100 text-gray-700 hover:bg-gray-100",
      [TaskStatus.IN_PROGRESS]: "bg-blue-100 text-blue-700 hover:bg-blue-100",
      [TaskStatus.DONE]: "bg-green-100 text-green-700 hover:bg-green-100",
      [TaskStatus.ON_HOLD]: "bg-yellow-100 text-yellow-700 hover:bg-yellow-100",
      [TaskStatus.BLOCKED]: "bg-red-100 text-red-700 hover:bg-red-100",
    };
    return <Badge className={styles[status]}>{status.toUpperCase()}</Badge>;
  };

  return (
    <ContextMenu>
      <ContextMenuTrigger>
        {getStatusBadge(task.status)}
      </ContextMenuTrigger>
      <ContextMenuContent className="w-48">
        <ContextMenuGroup>
          {TASKS_STATUSES.map((taskStatus) => (
            <ContextMenuRadioItem
              value={taskStatus}
              onClick={(event) => {
                event.stopPropagation();
                if (taskStatus === task.status) return;
                onChange(task, taskStatus)
              }}
            >
              {getStatusBadge(taskStatus)}
            </ContextMenuRadioItem>
          ))}
        </ContextMenuGroup>
      </ContextMenuContent>
    </ContextMenu>
  )
}