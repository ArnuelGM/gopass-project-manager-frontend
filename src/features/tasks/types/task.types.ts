export const TaskStatus = {
  TODO: 'todo',
  IN_PROGRESS: 'in-progress',
  DONE: 'done',
  ON_HOLD: 'on-hold',
  BLOCKED: 'blocked',
} as const;

// Esto crea el tipo basado en los valores del objeto
export type TaskStatus = (typeof TaskStatus)[keyof typeof TaskStatus];

export interface Task {
  id: string;
  projectId: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  createdAt: string;
  finishDate: string | null;
  finishedAt: string | null;
}

export interface CreateTaskDto {
  title: string;
  projectId: string;
  description?: string | null;
  status?: TaskStatus;
  finishDate?: string | null;
}