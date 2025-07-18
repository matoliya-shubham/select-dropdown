import { FormModeType } from "@/types/DropdownContentType";
import { createSlice } from "@reduxjs/toolkit";

export type ResourceContentFormStateType = {
  formMode: FormModeType;
  isEdit?: boolean;
  openFormModal: boolean;
};
const resourceContentFormInitialState: ResourceContentFormStateType = {
  formMode: FormModeType.CREATE,
  openFormModal: false,
};
const formSlice = createSlice({
  name: "form",
  initialState: resourceContentFormInitialState,
  reducers: {
    onChangeFormMode(state, action) {
      state.formMode = action.payload;
      state.isEdit = action.payload === FormModeType.EDIT;
    },
    toggleOpenFormModal(state, action) {
      state.openFormModal = action.payload;
    },
  },
});

export const { onChangeFormMode, toggleOpenFormModal } = formSlice.actions;
export default formSlice.reducer;
