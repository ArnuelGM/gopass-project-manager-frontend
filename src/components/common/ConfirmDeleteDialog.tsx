import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Trash2, Loader2 } from "lucide-react";
import { useEffect, useState, type ReactElement } from "react";

interface ConfirmDeleteDialogProps {
  itemName?: string;
  onConfirm: () => void;
  isLoading?: boolean;
  trigger?: ReactElement;
  inline?: boolean;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const ConfirmDeleteDialog = ({ 
  itemName, 
  onConfirm, 
  isLoading = false,
  trigger,
  inline = false,
  open = false,
  onOpenChange
}: ConfirmDeleteDialogProps) => {
  const [isOpen, setIsOpen] = useState(inline && open)

  useEffect(() => {
    setIsOpen(open)
  }, [open])

  useEffect(() => {
    onOpenChange && onOpenChange(isOpen)
  }, [isOpen])

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      {!inline && 
        <AlertDialogTrigger asChild>
          {trigger || (
            <Button variant="destructive" size="icon" className="rounded-full">
              <Trash2 size={18} />
            </Button>
          )}
        </AlertDialogTrigger>
      }
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete 
            {itemName ? (<span className="font-bold text-gray-900"> {itemName } </span>) : " this item " }
            and all its related data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={isLoading} className="cursor-pointer">Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={(e) => {
              e.preventDefault();
              onConfirm();
            }}
            disabled={isLoading}
            className="bg-red-600 hover:bg-red-700 focus:ring-red-600 min-w-[100px] cursor-pointer"
          >
            {isLoading ? (
              <Loader2 className="animate-spin mr-2" size={16} />
            ) : null}
            {isLoading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;