import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { RichDropdownMenuSearch } from "./RichDropdownMenuSearch";
import { ResourceBreadCrumb } from "./ResourceBreadCrumb";
import { AddResourceModal } from "./AddResourceModal";
import { PlusIcon } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ResourceContent } from "./ResourceContent";
import type { BreadcrumbItemType } from "@/types/DropdownContentType";

export const SelectDropdown = () => {
  const [open, setOpen] = useState(false);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([
    { title: "All Resources", id: "root" },
  ]);
  const [currentView, setCurrentView] = useState("root");

  const _onOpenChange = (open: boolean) => setOpen(open);

  // Handle adding a new breadcrumb item
  const handleAddBreadcrumb = (item: BreadcrumbItemType) => {
    setBreadcrumbs((prev) => {
      // Check if this item already exists in the breadcrumbs
      const existingIndex = prev.findIndex((crumb) => crumb.id === item.id);

      if (existingIndex !== -1) {
        // If it exists, truncate the array up to this item
        return prev.slice(0, existingIndex + 1);
      } else {
        // Otherwise add it to the end
        return [...prev, item];
      }
    });
    setCurrentView(item.id);
  };

  // Handle clicking on a breadcrumb to navigate
  const handleBreadcrumbClick = (index: number) => {
    const item = breadcrumbs[index];
    setBreadcrumbs((prev) => prev.slice(0, index + 1));
    setCurrentView(item.id);
  };

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
        <RichDropdownMenuSearch
          placeholder="Search"
          onChange={(value) => console.log(value)}
        />
        <ResourceBreadCrumb
          breadcrumbs={breadcrumbs}
          onBreadcrumbClick={handleBreadcrumbClick}
        />
        <ScrollArea className="h-[20rem] flex-1">
          <ResourceContent
            currentView={currentView}
            onItemClick={handleAddBreadcrumb}
          />
        </ScrollArea>
        <AddResourceModal
          title={
            <div className="flex items-center gap-2">
              <PlusIcon className="size-4" /> Add Resource
            </div>
          }
          heading="Add Resource"
          description="Add a new resource"
        />
      </PopoverContent>
    </Popover>
  );
};
