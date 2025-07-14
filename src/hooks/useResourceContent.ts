import { AllResourcesLabel, RelatedResourcesLabel } from "@/constants/label";
import type {
  AllResourcesLabelType,
  BreadcrumbItemType,
} from "@/types/DropdownContentType";
import { useCallback, useEffect, useState } from "react";

// Provider component
export const useResourceContent = () => {
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([
    { title: "All Resources", id: "root" },
  ]);
  const [currentView, setCurrentView] = useState("root");
  const [displayContent, setDisplayContent] = useState<AllResourcesLabelType[]>(
    []
  );

  useEffect(() => {
    if (currentView === "root") {
      setDisplayContent(AllResourcesLabel);
    } else {
      const relatedResources =
        RelatedResourcesLabel.filter((item) => item.parentId === currentView) ||
        [];
      setDisplayContent(relatedResources);
    }
  }, [currentView]);

  // Handle adding a new breadcrumb item and update the current view
  const handleAddBreadcrumb = useCallback((item: BreadcrumbItemType) => {
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
  }, []);

  // Handle clicking on a breadcrumb to navigate
  const handleBreadcrumbClick = useCallback(
    (index: number) => {
      const item = breadcrumbs[index];
      setBreadcrumbs((prev) => prev.slice(0, index + 1));
      setCurrentView(item.id);
    },
    [breadcrumbs]
  );

  return {
    breadcrumbs,
    currentView,
    handleAddBreadcrumb,
    handleBreadcrumbClick,
    displayContent,
  };
};
