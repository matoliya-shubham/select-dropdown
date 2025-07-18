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
import { PlusIcon, X } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceContent } from "./ResourceContent";
import { useResourceContent } from "@/hooks/useResourceContent";
import { ActionType, FormModeType } from "@/types/DropdownContentType";
import { Badge } from "@/components/ui/badge";

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
  const { handleAddRemoveResource, selectedResources } = useResourceContent();
  return (
    <Popover open={open} onOpenChange={_onOpenChange}>
      <PopoverTrigger asChild>
        <div
          className={cn(
            "flex items-center gap-2 p-2 px-4 mx-auto rounded-md border max-w-[95vw] w-[35rem] cursor-pointer mt-[7rem]",
            open && "rounded-b-none"
          )}
        >
          {selectedResources.length > 0 ? (
            <div className="flex items-center gap-1 flex-wrap">
              {selectedResources.map((resource) => (
                <Badge
                  key={resource.id}
                  variant="secondary"
                  className="cursor-pointer flex items-center gap-1 hover:bg-blue-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAddRemoveResource(resource, ActionType.DELETE);
                  }}
                >
                  {resource.title} <X className="size-3 " />
                </Badge>
              ))}
            </div>
          ) : (
            <span className="text-muted-foreground">Select Resources</span>
          )}
        </div>
      </PopoverTrigger>
      <PopoverContent
        side="bottom"
        className="max-w-[95vw] w-[35rem] mx-auto flex flex-col rounded-none -mt-1 border-t-0 h-[30rem] max-h-[30rem] p-0"
      >
        <ResourceDropdownContent />
      </PopoverContent>
    </Popover>
  );
};
