import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { AllResourcesLabel } from "@/constants/label";
import { ChevronRight, Info } from "lucide-react";

export const ResourceContent = () => {
  return (
    <div className="flex flex-col ">
      {AllResourcesLabel.map((item, index) => {
        return (
          <div key={index}>
            <h2 className="p-2 font-semibold pl-4">{item.heading}</h2>
            <div className="flex flex-col ">
              {item.nestedContent.map((nestedItem, nestedIndex) => {
                return (
                  <div
                    key={nestedIndex}
                    className={`flex group items-center justify-between p-2 pl-10 borderpl-4 hover:bg-blue-50 hover:border-blue-500 pr-4 ${
                      nestedItem.hasContent && "cursor-pointer"
                    }`}
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
