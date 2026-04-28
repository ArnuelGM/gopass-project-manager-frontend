import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { type Task, TaskStatus } from '../types/task.types';

interface TasksListViewProps {
  tasks: Task[];
}

export const TasksListView = ({ tasks }: TasksListViewProps) => {
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

  const formatDate = (date: string) => new Date(date).toLocaleDateString(undefined, {
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="border rounded-md bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Task Title</TableHead>
            <TableHead className="w-[150px] text-right">Created</TableHead>
            <TableHead className="w-[130px] text-right">Status</TableHead>
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
              <TableRow key={task.id}>
                <TableCell className="font-normal">{task.title}</TableCell>
                <TableCell className="text-right">{formatDate(task.createdAt)}</TableCell>
                <TableCell className="text-right">{getStatusBadge(task.status)}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};