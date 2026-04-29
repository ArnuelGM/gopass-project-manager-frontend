import { useTasks } from '../hooks/useTasks';
import { type Task, TaskStatus } from '../types/task.types';
import { DroppableColumn } from "./DroppableColumn";
import { DragDropProvider, type DragEndEvent } from "@dnd-kit/react";

interface TasksBoardViewProps {
  tasks: Task[];
  projectId: string;
  onTaskClick?: (task: Task) => void;
}

export const TasksBoardView = ({ tasks, projectId, onTaskClick }: TasksBoardViewProps) => {
  
  const { updateTaskMutation } = useTasks(projectId)

  const columns = [
    { id: TaskStatus.TODO, title: 'To Do', color: 'bg-slate-100/50' },
    { id: TaskStatus.IN_PROGRESS, title: 'In Progress', color: 'bg-blue-50/50' },
    { id: TaskStatus.ON_HOLD, title: 'On Hold', color: 'bg-amber-50/50' },
    { id: TaskStatus.BLOCKED, title: 'Blocked', color: 'bg-red-50/50' },
    { id: TaskStatus.DONE, title: 'Done', color: 'bg-emerald-50/50' },
  ];

  const tasksGroups = Object.groupBy(tasks, t => t.status)

  const handleDragEnd = (event: DragEndEvent) => {
    const { target, source } = event.operation
    const task: Task = source.data as Task
    const originalStatus = task.status
    const newStatus = target.id

    if(newStatus === originalStatus) return;

    task.status = newStatus as TaskStatus

    tasksGroups[originalStatus] = tasksGroups[originalStatus].filter(t => t.id !== task.id)
    tasksGroups[newStatus] = tasksGroups[newStatus] ?? []
    tasksGroups[newStatus].push(task)

    updateTaskMutation.mutate({ taskId: task.id, updates: task })
  };

  return (
    <DragDropProvider 
      onDragEnd={handleDragEnd}
    >
      <div className="flex gap-4 overflow-x-auto p-1 min-h-[calc(100vh-350px)] items-stretch">
        {columns.map((column) => (
          <DroppableColumn
            key={column.id}
            column={column}
            tasks={tasksGroups[column.id] ?? []}
            onTaskClick={onTaskClick}
          />
        ))}
      </div>
    </DragDropProvider>
  );
};