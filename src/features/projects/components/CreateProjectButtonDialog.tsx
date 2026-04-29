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
import type { CreateProjectDto } from "../types/project.types"
import { Textarea } from "@/components/ui/textarea"

interface CreateProjectButtonDialogProps {
  disabled: boolean;
  isPending: boolean;
  onSubmit?: (data: CreateProjectDto) => void;
}

export const CreateProjectButtonDialog = ({ disabled, onSubmit, isPending }: CreateProjectButtonDialogProps) => {

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target)
    const data = {
      name: String(form.get("name")),
      description: String(form.get("description"))
    }
    onSubmit && onSubmit(data)
  }

  return (
    <Dialog>
        <DialogTrigger asChild>
          <Button size="lg" disabled={disabled} className="cursor-pointer">
            {isPending ? <Loader2 className="animate-spin" size={20} /> : <Plus size={20} />}
            New Project
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>New Project</DialogTitle>
            <DialogDescription>
              Create a new project.
            </DialogDescription>
          </DialogHeader>
          <form id="new-project-form" onSubmit={handleSubmit}>
            <FieldGroup>
              <Field>
                <Label htmlFor="name">Name</Label>
                <Input name="name" form="new-project-form" placeholder="Project name" type="text" />
              </Field>
              <Field>
                <Label htmlFor="description">Description</Label>
                <Textarea className="min-h-[120px]" form="new-project-form" name="description" placeholder="Project description"/>
              </Field>
            </FieldGroup>
          </form>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline" className="cursor-pointer">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" form="new-project-form" className="cursor-pointer">Save</Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
    </Dialog>
  )
}
