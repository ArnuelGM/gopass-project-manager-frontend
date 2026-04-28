import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Field, FieldGroup } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus, Loader2 } from 'lucide-react';
import type { CreateTaskDto } from "../types/task.types"

interface CreateTaskButtonDialogProps {
  projectId: string;
  disabled: boolean;
  isPending: boolean;
  onSubmit?: (data: CreateTaskDto) => void;
}

export const CreateTaskButtonDialog = ({ disabled, onSubmit, isPending, projectId }: CreateTaskButtonDialogProps) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target)
    const data = {
      title: String(form.get("title")),
      description: String(form.get("description")),
      projectId
    }
    onSubmit && onSubmit(data)
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" disabled={disabled}>
            {isPending ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            Add New Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New task</DialogTitle>
            <DialogDescription>
              Create a new task.
            </DialogDescription>
          </DialogHeader>
          <form id="new-task-form" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="title">Title</Label>
                <Input name="title" form="new-task-form" placeholder="Task title" type="text" />
              </Field>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Input form="new-task-form" name="description" type="text" placeholder="Task description" />
              </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="new-task-form">Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
