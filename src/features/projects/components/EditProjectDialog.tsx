import { useState, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { type Project } from "../types/project.types";
import { useProjects } from "../hooks/useProjects";
import { Loader2 } from "lucide-react";

interface EditProjectDialogProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
}

export const EditProjectDialog = ({ project, isOpen, onClose }: EditProjectDialogProps) => {
  const { updateProjectMutation } = useProjects();
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Sincronizar el estado interno cuando el proyecto cambia o se abre el modal
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name,
        description: project.description || "",
      });
    }
  }, [project, isOpen]);

  const handleSave = async (e: React.MouseEvent) => {
    e.preventDefault(); // Evitamos que el AlertDialog se cierre automáticamente
    await updateProjectMutation.mutateAsync({
      id: project.id,
      updates: formData,
    });
    onClose();
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={onClose}>
      <AlertDialogContent className="sm:max-w-[525px]">
        <AlertDialogHeader>
          <AlertDialogTitle>Edit Project</AlertDialogTitle>
          <AlertDialogDescription>
            Make changes to your project details here. Click save when you're done.
          </AlertDialogDescription>
        </AlertDialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Project Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Project title"
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Briefly describe the project goals..."
              className="min-h-[100px]"
            />
          </div>
        </div>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={updateProjectMutation.isPending} className="cursor-pointer">
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction
            onClick={handleSave}
            disabled={updateProjectMutation.isPending || !formData.name.trim()}
            className="cursor-pointer"
          >
            {updateProjectMutation.isPending && (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            )}
            Save Changes
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};