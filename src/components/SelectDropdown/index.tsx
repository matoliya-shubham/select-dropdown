import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RichDropdownMenuSearch } from "./ResourceContentSearch";
import { ResourceBreadCrumb } from "./ResourceBreadCrumb";
import { AddResourceModal } from "./AddResourceModal";
import { PlusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceContent } from "./ResourceContent";
import { useResourceContent } from "@/hooks/useResourceContent";
import { FormModeType } from "@/types/DropdownContentType";

// Wrapper component to use context
const ResourceDropdownContent = () => {
  const {
    searchQuery,
    handleSearch,
    isEdit,
    handleFormModeChange,
    handleOpenFormModal,
  } = useResourceContent();

  return (
    <>
      <RichDropdownMenuSearch
        placeholder="Search resources..."
        value={searchQuery}
        onChange={(value) => handleSearch(value)}
        clearSearch={searchQuery ? () => handleSearch("") : undefined}
      />
      <ResourceBreadCrumb />
      <ScrollArea className="h-[20rem] flex-1">
        <ResourceContent />
      </ScrollArea>
      <AddResourceModal
        title={
          <div
            className="flex items-center gap-2"
            onClick={() => {
              handleFormModeChange(FormModeType.CREATE);
              handleSearch("");
              handleOpenFormModal(true);
            }}
          >
            <PlusIcon className="size-4" /> Add Resource
          </div>
        }
        heading={isEdit ? "Update Resource" : "Add Resource"}
        description={isEdit ? "Update a Resource" : "Add a new Resource"}
      />
    </>
  );
};

export const SelectDropdown = () => {
  const [open, setOpen] = useState(false);
  const _onOpenChange = (open: boolean) => setOpen(open);

  return (
    <Popover open={open} onOpenChange={_onOpenChange}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 p-2 px-4 rounded-md border w-[35rem] cursor-pointer mt-[7rem]",
            open && "rounded-b-none"
          )}
        >
          Open
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="w-[35rem] flex flex-col rounded-none -mt-1 border-t-0 h-[30rem] max-h-[30rem] p-0"
      >
        <ResourceDropdownContent />
      </PopoverContent>
    </Popover>
  );
};
