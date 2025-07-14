import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AllResourcesLabel, RelatedResourcesLabel } from "@/constants/label";
import { ChevronRight, Info } from "lucide-react";
import type {
  AllResourcesLabelType,
  BreadcrumbItemType,
} from "@/types/DropdownContentType";

interface ResourceContentProps {
  currentView: string;
  onItemClick: (item: BreadcrumbItemType) => void;
}

const RootResourceStructure = ({
  onItemClick,
  itemArray,
}: {
  onItemClick: (item: BreadcrumbItemType) => void;
  itemArray: AllResourcesLabelType[];
}) => {
  if (!itemArray || itemArray.length === 0) {
    return (
      <div className="p-4">
        <p>No content available for this view.</p>
      </div>
    );
  }
  return (
    <div className="flex flex-col">
      {itemArray.map((item) => {
        return (
          <div key={item.id}>
            <h2 className="p-2 font-semibold pl-4">{item.heading}</h2>
            <div className="flex flex-col">
              {item.nestedContent.map((nestedItem) => {
                return (
                  <div
                    key={nestedItem.id}
                    className={`flex group items-center justify-between p-2 pl-10 hover:bg-blue-50 hover:border-blue-500 pr-4 ${
                      nestedItem.hasContent ? "cursor-pointer" : ""
                    }`}
                    onClick={() => {
                      if (nestedItem.hasContent) {
                        onItemClick({
                          title: nestedItem.title,
                          id: nestedItem.id,
                        });
                      }
                    }}
                  >
                    <div className="flex items-center gap-2">
                      {nestedItem.icon && (
                        <nestedItem.icon className="size-4" />
                      )}
                      <h3>{nestedItem.title}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      {nestedItem?.tooltipContent && (
                        <Tooltip>
                          <TooltipTrigger
                            className={`hidden group-hover:block`}
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
    </div>
  );
};
export const ResourceContent = ({
  currentView,
  onItemClick,
}: ResourceContentProps) => {
  // Function to render content based on the current view
  const renderContent = () => {
    // Root view shows all resources
    if (currentView === "root") {
      return (
        <RootResourceStructure
          onItemClick={onItemClick}
          itemArray={AllResourcesLabel}
        />
      );
    } else {
      const relatedResources =
        RelatedResourcesLabel.filter((item) => item.parentId === currentView) ||
        [];
      return (
        <RootResourceStructure
          onItemClick={onItemClick}
          itemArray={relatedResources}
        />
      );
    }
  };

  return renderContent();
};
