import React, { createContext, type ReactNode } from "react";
import { useResourceContent } from "@/hooks/useResourceContent";
import type {
  AllResourcesLabelType,
  BreadcrumbItemType,
  FormModeType,
} from "@/types/DropdownContentType";

// Define the shape of the context
export interface ResourceContextType {
  breadcrumbs: BreadcrumbItemType[];
  currentView: string;
  displayContent: AllResourcesLabelType[];
  handleAddBreadcrumb: (item: BreadcrumbItemType) => void;
  handleBreadcrumbClick: (index: number) => void;
  handleSearch: (
    query: string,
    contentToSearch: AllResourcesLabelType[]
  ) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  fetchResources: () => void;
  isLoading: boolean;
  error: Error | null;
  _onOpenFormModal: (open: boolean) => void;
  openFormModal: boolean;
  formMode: FormModeType;
  setFormMode: (mode: FormModeType) => void;
  selectedItem: string[] | null;
  setSelectedItem: (item: string[] | null) => void;
  handleDeleteResource: () => void;
  setIsLoading: (loading: boolean) => void;
}

// Create the context with a default value
// eslint-disable-next-line react-refresh/only-export-components
export const ResourceContext = createContext<ResourceContextType | undefined>(
  undefined
);

// Provider component
export const ResourceProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  // Use the hook to get all the state and handlers
  const resourceContentProps = useResourceContent();

  return (
    <ResourceContext.Provider value={resourceContentProps}>
      {children}
    </ResourceContext.Provider>
  );
};
