import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ChevronRight, Info, PencilLine, Trash } from "lucide-react";
import { useResourceContext } from "@/hooks/useResourceContext";
import { IconMap } from "@/constants/label";
import { FormModeType } from "@/types/DropdownContentType";
import { WarningAlertDialog } from "./WarningAlertDialog";
import { useState } from "react";

export const ResourceContent = () => {
  const [open, setOpen] = useState(false);
  const {
    handleAddBreadcrumb,
    displayContent,
    isLoading,
    error,
    setFormMode,
    _onOpenFormModal,
    setSelectedItem,
    handleDeleteResource,
  } = useResourceContext();
  if (!displayContent || displayContent.length === 0) {
    return (
      <div className="p-4">
        <p>No content available for this view.</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4">
        <p>{error.message}</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="p-4">
        <p>Loading...</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {displayContent.map((item) => {
        return (
          <div key={item.id}>
            <h2 className="p-2 font-semibold pl-4">{item.heading}</h2>
            <div className="flex flex-col">
              {item.nestedContent.map((nestedItem) => {
                const Icon =
                  IconMap[nestedItem.iconName as keyof typeof IconMap];
                return (
                  <div
                    key={nestedItem.id}
                    className={`flex group items-center justify-between p-2 pl-10 hover:bg-blue-50 hover:border-blue-500 pr-4 ${
                      nestedItem.hasContent ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (nestedItem.hasContent) {
                        handleAddBreadcrumb({
                          title: nestedItem.title,
                          id: nestedItem.id,
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {Icon && <Icon className="size-4" />}
                      <h3>{nestedItem.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <PencilLine
                        onClick={(e) => {
                          e.stopPropagation();
                          setFormMode(FormModeType.EDIT);
                          setSelectedItem([item.id, nestedItem.id]);
                          _onOpenFormModal(true);
                        }}
                        className="size-4 text-gray-700 cursor-pointer hidden group-hover:block hover:text-blue-700"
                      />
                      <Trash
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedItem([item.id, nestedItem.id]);
                          setOpen(true);
                        }}
                        className="size-4 text-gray-700 cursor-pointer hidden group-hover:block hover:text-red-700"
                      />
                      {nestedItem?.tooltipContent && (
                        <Tooltip>
                          <TooltipTrigger
                            className={`hidden group-hover:block`}
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Info className="size-4 text-gray-500" />
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{nestedItem?.tooltipContent}</p>
                          </TooltipContent>
                        </Tooltip>
                      )}
                      {nestedItem.hasContent && (
                        <ChevronRight className="size-5" />
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
      <WarningAlertDialog
        onAction={handleDeleteResource}
        onCancel={() => {}}
        open={open}
        onOpenChange={setOpen}
        description={"Are you sure you want to delete this resource?"}
        title={"Warning"}
        secondaryButtonLabel={"Delete"}
        primaryButtonLabel={"Cancel"}
        isActionInProgress={isLoading}
      />
    </div>
  );
};
