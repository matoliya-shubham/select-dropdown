import type { ActionReducerMapBuilder } from "@reduxjs/toolkit";
import {
  getAllResourceContentAction,
  addResourceContentAction,
  updateResourceContentAction,
  deleteResourceContentAction,
} from "./resourceContentThunks";
import {
  onChangeCurrentViewAction,
  type ResourceContentStateType,
} from "./resourceContentSlice";

export const resourceContentExtraReducer = (
  builder: ActionReducerMapBuilder<ResourceContentStateType>
) => {
  // Handle async actions for resource content
  builder
    // GET
    .addCase(getAllResourceContentAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(getAllResourceContentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resourceContent = action.payload;
      onChangeCurrentViewAction(state.currentView);
    })
    .addCase(getAllResourceContentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to fetch resource content";
    })
    // ADD
    .addCase(addResourceContentAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(addResourceContentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resourceContent = action.payload;
      onChangeCurrentViewAction(state.currentView);
    })
    .addCase(addResourceContentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to add resource content";
    })
    // UPDATE
    .addCase(updateResourceContentAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(updateResourceContentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resourceContent = action.payload;
      onChangeCurrentViewAction(state.currentView);
    })
    .addCase(updateResourceContentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to update resource content";
    })
    // DELETE
    .addCase(deleteResourceContentAction.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    })
    .addCase(deleteResourceContentAction.fulfilled, (state, action) => {
      state.isLoading = false;
      state.resourceContent = action.payload;
      onChangeCurrentViewAction(state.currentView);
    })
    .addCase(deleteResourceContentAction.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.error.message || "Failed to delete resource content";
    });
};
