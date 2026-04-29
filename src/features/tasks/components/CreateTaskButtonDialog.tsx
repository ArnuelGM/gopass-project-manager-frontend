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
import { Plus, Loader2, CalendarIcon } from 'lucide-react';
import { TaskPriority, TaskStatus, type CreateTaskDto } from "../types/task.types"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"

interface CreateTaskButtonDialogProps {
  projectId: string;
  disabled: boolean;
  isPending: boolean;
  onSubmit?: (data: CreateTaskDto) => void;
}

export const CreateTaskButtonDialog = ({ disabled, onSubmit, isPending, projectId }: CreateTaskButtonDialogProps) => {
  const [date, setDate] = useState<Date | undefined>(undefined)
  const [status, setStatus] = useState<string>(TaskStatus.TODO)
  const [priority, setPriority] = useState<string>(TaskPriority.MEDIUM)
  
  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target)
    const data: CreateTaskDto = {
      title: String(form.get("title")),
      description: String(form.get("description")),
      projectId,
      status: status as TaskStatus,
      priority: priority as TaskPriority,
      finishDate: date ? date.toISOString() : undefined
    }
    onSubmit && onSubmit(data)

    setDate(undefined)
    setStatus(TaskStatus.TODO)
    setPriority(TaskPriority.MEDIUM)
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" disabled={disabled} className="cursor-pointer">
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
                <Label>Status</Label>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TaskStatus.TODO}>To Do</SelectItem>
                    <SelectItem value={TaskStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TaskStatus.ON_HOLD}>On Hold</SelectItem>
                    <SelectItem value={TaskStatus.BLOCKED}>Blocked</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>Priority</Label>
                <Select value={priority} onValueChange={setPriority}>
                  <SelectTrigger>
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value={TaskPriority.LOW}>Low</SelectItem>
                    <SelectItem value={TaskPriority.MEDIUM}>Medium</SelectItem>
                    <SelectItem value={TaskPriority.HIGH}>High</SelectItem>
                  </SelectContent>
                </Select>
              </Field>
              <Field>
                <Label>Finish Date</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </Field>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea className="min-h-[120px]" form="new-task-form" name="description" placeholder="Task description"/>
              </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="new-task-form" className="cursor-pointer">Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
