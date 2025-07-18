import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { AddResourceForm } from "./AddResourceForm";
import { useResourceContent } from "@/hooks/useResourceContent";

export const AddResourceModal = ({
  title,
  heading,
  description,
}: {
  title: React.ReactNode;
  heading: string;
  description: string;
}) => {
  const { openFormModal, handleOpenFormModal } = useResourceContent();
  return (
    <div className="flex items-center border-t hover:bg-gray-100 cursor-pointer h-10">
      <Dialog open={openFormModal} onOpenChange={handleOpenFormModal}>
        <DialogTrigger className="cursor-pointer w-full p-4">
          {title}
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{heading}</DialogTitle>
            <DialogDescription>{description}</DialogDescription>
          </DialogHeader>
          <AddResourceForm />
        </DialogContent>
      </Dialog>
    </div>
  );
};
