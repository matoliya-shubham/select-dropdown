import { toastMessages } from "@/constants/label";
import type { AddResourceSchema } from "@/schema/addResourceSchema";
import {
  addResourceContentService,
  deleteResourceContentService,
  getAllResourceContentService,
  updateResourceContentService,
} from "@/services/resourceContentService";
import type { RootState } from "@/store";
import { type AllResourcesLabelType } from "@/types/DropdownContentType";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "sonner";
import { v4 as uuidv4 } from "uuid";

export const getAllResourceContentAction = createAsyncThunk(
  "resourceContent/getAll",
  async () => {
    try {
      const responce = await getAllResourceContentService();
      if (!responce) {
        throw new Error("Failed to fetch resource content");
      }
      toast.success(toastMessages.addResourceError, {
        position: "top-center",
      });
      return responce;
    } catch (error) {
      console.error("Error fetching resource content:", error);
      throw error;
    }
  }
);

export const addResourceContentAction = createAsyncThunk<
  AllResourcesLabelType[], // Return type,
  AllResourcesLabelType, // Args type,
  { state: RootState }
>(
  "resourceContent/add",
  async (itemToAdd, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const { resourceContent } = getState().resourceContent;
      await addResourceContentService(itemToAdd);
      toast.success(toastMessages.addResourceSuccess, {
        position: "top-center",
      });
      return fulfillWithValue([...resourceContent, itemToAdd]);
    } catch (error) {
      rejectWithValue(`Error adding resource content: ${error}`);
      toast.error(toastMessages.addResourceError, {
        position: "top-center",
      });
      throw error;
    }
  }
);

export const updateResourceContentAction = createAsyncThunk<
  AllResourcesLabelType[], // Return type,
  AddResourceSchema, // Args type,
  { state: RootState }
>(
  "resourceContent/update",
  async (formData, { fulfillWithValue, rejectWithValue, getState }) => {
    try {
      const { resourceContent, displayContent, selectedItem } =
        getState().resourceContent;
      const { isEdit } = getState().form;
      const [itemId, nestedItemId] = selectedItem || [];
      const formItem = {
        title: formData.name,
        id: uuidv4(),
        hasContent: false,
        iconName: formData.icon,
        tooltipContent: "",
      };
      const itemToAdd = displayContent.find((item) => item.id === itemId);
      const nestedContent = isEdit
        ? itemToAdd?.nestedContent.map((nestedItem) => {
            if (nestedItem.id === nestedItemId) {
              return formItem;
            }
            return nestedItem;
          }) || []
        : [...(itemToAdd?.nestedContent || []), formItem];
      const itemToUpdate = {
        id: itemToAdd?.id || "",
        parentId: itemToAdd?.parentId || "",
        heading: itemToAdd?.heading || "",
        nestedContent,
      };
      await updateResourceContentService(itemToUpdate);

      toast.success(toastMessages.updateResourceSuccess, {
        position: "top-center",
      });
      return fulfillWithValue(
        resourceContent.map((item) => {
          if (item.id === itemToUpdate.id) {
            return itemToUpdate;
          }
          return item;
        })
      );
    } catch (error) {
      rejectWithValue(`Error updating resource content: ${error}`);
      toast.error(toastMessages.updateResourceError, {
        position: "top-center",
      });
      throw error;
    }
  }
);

export const deleteResourceContentAction = createAsyncThunk<
  AllResourcesLabelType[], // Return type,
  void, // Args type,
  { state: RootState }
>(
  "resourceContent/delete",
  async (_, { getState, rejectWithValue, fulfillWithValue }) => {
    try {
      const resourceContent = getState().resourceContent;
      const [itemId, nestedItemId] = resourceContent.selectedItem || [];
      const itemToDelete = resourceContent.displayContent.find(
        (item) => item.id === itemId
      );
      const nestedContent =
        itemToDelete?.nestedContent.filter(
          (nestedItem) => nestedItem.id !== nestedItemId
        ) || [];
      const itemToUpdate = {
        id: itemToDelete?.id || "",
        parentId: itemToDelete?.parentId || "",
        heading: itemToDelete?.heading || "",
        nestedContent,
      };
      await updateResourceContentService(itemToUpdate);
      // delete the nested item
      if (
        resourceContent.resourceContent.some((item) => item.id === nestedItemId)
      ) {
        await deleteResourceContentService(nestedItemId);
      }
      toast.success(toastMessages.deleteResourceSuccess, {
        position: "top-center",
      });
      return fulfillWithValue(
        resourceContent.resourceContent.map((item) => {
          if (item.id === itemToUpdate.id) {
            return itemToUpdate;
          }
          return item;
        })
      );
    } catch (error) {
      rejectWithValue(`Error deleting resource content: ${error}`);
      toast.error(toastMessages.deleteResourceError, {
        position: "top-center",
      });
      throw error;
    }
  }
);
