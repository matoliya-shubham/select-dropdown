import {
  FormModeType,
  type AllResourcesLabelType,
  type BreadcrumbItemType,
} from "@/types/DropdownContentType";
import { useCallback, useEffect, useState } from "react";
import { useResourceContentService } from "@/services/useResourceContentService";
import { toast } from "sonner";
import { toastMessages } from "@/constants/label";

export const useResourceContent = () => {
  const [formMode, setFormMode] = useState<FormModeType>(FormModeType.CREATE);
  const {
    getAllResourceContent,
    deleteResourceContent,
    updateResourceContent,
  } = useResourceContentService();
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItemType[]>([
    { title: "All Resources", id: "root" },
  ]);
  const [currentView, setCurrentView] = useState("root");
  const [displayContent, setDisplayContent] = useState<AllResourcesLabelType[]>(
    []
  );
  const [openFormModal, setOpenFormModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [selectedItem, setSelectedItem] = useState<string[] | null>(null);

  const _onOpenFormModal = useCallback((open: boolean) => {
    setOpenFormModal(open);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchQuery("");
  }, []);

  const handleSearch = useCallback(
    (query: string, contentToSearch: AllResourcesLabelType[]) => {
      if (!query.trim()) {
        clearSearch();
        return;
      }

      const lowerCaseQuery = query.toLowerCase();

      const filteredContent = contentToSearch?.reduce<AllResourcesLabelType[]>(
        (result, item) => {
          // Check if the heading matches
          const headingMatches = item.heading
            .toLowerCase()
            .includes(lowerCaseQuery);

          // Filter nested content that matches the query
          const matchingNestedContent = item.nestedContent.filter(
            (nestedItem) =>
              nestedItem.title.toLowerCase().includes(lowerCaseQuery)
          );

          // If either the heading matches or there are matching nested items, include this section
          if (headingMatches || matchingNestedContent?.length > 0) {
            // Create a new item with only the matching nested content
            const newItem = {
              ...item,
              nestedContent: headingMatches
                ? item.nestedContent
                : matchingNestedContent,
            };

            result.push(newItem);
          }

          return result;
        },
        []
      );

      setSearchQuery(query);
      setDisplayContent(filteredContent);
    },
    [clearSearch]
  );

  const fetchResources = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const allResources = await getAllResourceContent();

      const filteredContent: AllResourcesLabelType[] =
        allResources.filter((resource) => resource.parentId === currentView) ||
        [];

      setDisplayContent(filteredContent);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch resources")
      );
    } finally {
      setIsLoading(false);
    }
  }, [currentView]);

  useEffect(() => {
    fetchResources();
  }, [currentView]);

  useEffect(() => {
    if (searchQuery) {
      handleSearch(searchQuery, displayContent);
    }
  }, [searchQuery]);

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
    // Clear any active search when navigating
    setSearchQuery("");
  }, []);

  const handleBreadcrumbClick = useCallback(
    (index: number) => {
      const item = breadcrumbs[index];
      setBreadcrumbs((prev) => prev.slice(0, index + 1));
      setCurrentView(item.id);
      // Clear any active search when navigating via breadcrumb
      setSearchQuery("");
    },
    [breadcrumbs]
  );

  const handleDeleteResource = useCallback(async () => {
    try {
      setIsLoading(true);
      if (!selectedItem) {
        throw new Error("No item selected");
      }
      const [itemId, nestedItemId] = selectedItem || [];
      const itemToDelete = displayContent.find((item) => item.id === itemId);
      const nestedContent =
        itemToDelete?.nestedContent.filter(
          (nestedItem) => nestedItem.id !== nestedItemId
        ) || [];
      await updateResourceContent({
        id: itemToDelete?.id || "",
        parentId: itemToDelete?.parentId || "",
        heading: itemToDelete?.heading || "",
        nestedContent,
      });
      // delete the nested item
      await deleteResourceContent(nestedItemId);
      toast.success(toastMessages.deleteResourceSuccess, {
        position: "top-center",
      });
      fetchResources();
    } catch (error) {
      console.error("Error deleting resource content:", error);
      toast.error(toastMessages.deleteResourceError, {
        position: "top-center",
      });
    } finally {
      setIsLoading(false);
    }
  }, [
    selectedItem,
    deleteResourceContent,
    displayContent,
    updateResourceContent,
    fetchResources,
  ]);

  return {
    breadcrumbs,
    currentView,
    handleAddBreadcrumb,
    handleBreadcrumbClick,
    displayContent,
    handleSearch,
    searchQuery,
    clearSearch,
    setSearchQuery,
    fetchResources,
    isLoading,
    setIsLoading,
    error,
    _onOpenFormModal,
    openFormModal,
    formMode,
    setFormMode,
    selectedItem,
    setSelectedItem,
    handleDeleteResource,
  };
};
