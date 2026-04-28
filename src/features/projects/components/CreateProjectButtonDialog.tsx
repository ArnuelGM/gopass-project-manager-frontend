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

interface CreateProjectButtonDialogProps {
  disabled: boolean;
  isPending: boolean;
  onSubmit?: (data: unknown) => void;
}

export const CreateProjectButtonDialog = ({ disabled, isPending }: CreateProjectButtonDialogProps) => {

  const hadleSubmit = (event) => {
    event.preventDefault();
    const form = new FormData(event.target)
    console.log(event)
    console.log(form)
  }

  return (
    <Dialog>
      <form onSubmit={hadleSubmit}>
        <DialogTrigger asChild>
          <Button size="lg" disabled={disabled}>
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
          <FieldGroup>
            <Field>
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="Project name" type="text" />
            </Field>
            <Field>
              <Label htmlFor="description">Description</Label>
              <Input id="description" name="description" />
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  )
}
