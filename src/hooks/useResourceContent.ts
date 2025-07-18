import {
  onChnageSelectedItemAction,
  onChangeCurrentViewAction,
  handleSearchQueryAction,
  handleAddBreadcrumbAction,
  handleBreadCrumbClickAction,
} from "@/features/resourceContent/resourceContentSlice";
import { useAppDispatch, useAppSelector } from "./useReduxHooks";
import { useCallback, useEffect } from "react";
import {
  onChangeFormMode,
  toggleOpenFormModal,
} from "@/features/form/resourceContentFormSlice";
import type {
  AllResourcesLabelType,
  BreadcrumbItemType,
} from "@/types/DropdownContentType";
import {
  addResourceContentAction,
  deleteResourceContentAction,
  getAllResourceContentAction,
  updateResourceContentAction,
} from "@/features/resourceContent/resourceContentThunks";
import type { AddResourceSchema } from "@/schema/addResourceSchema";

export const useResourceContent = () => {
  const {
    resourceContent,
    isLoading,
    error,
    selectedItem,
    displayContent,
    searchQuery,
    currentView,
    breadCrumb,
  } = useAppSelector((state) => state.resourceContent);
  const { formMode, openFormModal, isEdit } = useAppSelector(
    (state) => state.form
  );
  const dispatch = useAppDispatch();

  const handleViewChange = useCallback(
    (newView: string) => {
      dispatch(onChangeCurrentViewAction(newView));
    },
    [dispatch]
  );

  const handleSearch = useCallback(
    (query: string) => {
      dispatch(handleSearchQueryAction(query));
    },
    [dispatch]
  );

  const handleDeleteResource = useCallback(() => {
    dispatch(deleteResourceContentAction());
  }, [dispatch]);

  const handleAddBreadcrumb = useCallback(
    (newBreadcrumb: BreadcrumbItemType) => {
      dispatch(handleAddBreadcrumbAction(newBreadcrumb));
    },
    [dispatch]
  );

  const handleSelectedItems = useCallback(
    (items: string[]) => {
      dispatch(onChnageSelectedItemAction(items));
    },
    [dispatch]
  );

  const handleBreadcrumbClick = useCallback(
    (breadcrumbIndex: number) => {
      dispatch(handleBreadCrumbClickAction(breadcrumbIndex));
    },
    [dispatch]
  );

  const handleFormModeChange = useCallback(
    (mode: string) => {
      dispatch(onChangeFormMode(mode));
    },
    [dispatch]
  );

  const fetchResources = useCallback(() => {
    dispatch(getAllResourceContentAction());
  }, [dispatch]);

  const addResourceContent = useCallback(
    (resource: AllResourcesLabelType) => {
      dispatch(addResourceContentAction(resource));
    },
    [dispatch]
  );

  const updateResourceContent = useCallback(
    (resource: AddResourceSchema) => {
      dispatch(updateResourceContentAction(resource));
    },
    [dispatch]
  );

  const handleOpenFormModal = useCallback(
    (isOpen: boolean) => {
      dispatch(toggleOpenFormModal(isOpen));
    },
    [dispatch]
  );

  useEffect(() => {
    fetchResources();
  }, []);

  return {
    isEdit,
    resourceContent,
    searchQuery,
    breadCrumb,
    currentView,
    handleAddBreadcrumb,
    handleBreadcrumbClick,
    displayContent,
    handleSearch,
    fetchResources,
    handleFormModeChange,
    handleViewChange,
    isLoading,
    error,
    openFormModal,
    handleOpenFormModal,
    formMode,
    selectedItem,
    handleSelectedItems,
    handleDeleteResource,
    addResourceContent,
    updateResourceContent,
  };
};
