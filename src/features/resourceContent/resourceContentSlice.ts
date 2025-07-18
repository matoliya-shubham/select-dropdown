import type {
  AllResourcesLabelType,
  BreadcrumbItemType,
} from "@/types/DropdownContentType";
import { createSlice } from "@reduxjs/toolkit";
import { resourceContentExtraReducer } from "./resourceContentExtraReducer";

export type ResourceContentStateType = {
  resourceContent: AllResourcesLabelType[];
  isLoading: boolean;
  error: string | null;
  selectedItem: string[] | null;
  displayContent: AllResourcesLabelType[];
  searchQuery: string;
  currentView: string;
  breadCrumb: BreadcrumbItemType[];
};
const resourceContentInitialState: ResourceContentStateType = {
  resourceContent: [],
  isLoading: false,
  error: null,
  selectedItem: null,
  displayContent: [],
  searchQuery: "",
  currentView: "root",
  breadCrumb: [{ title: "All Resources", id: "root" }],
};

const resourceContentSlice = createSlice({
  name: "resourceContent",
  initialState: resourceContentInitialState,
  // Actions to handle resource content
  reducers: {
    onChangeResourceContentAction(state, action) {
      state.resourceContent = action.payload;
    },
    onChnageSelectedItemAction(state, action) {
      state.selectedItem = action.payload;
    },
    onChangeCurrentViewAction(state, action) {
      state.currentView = action.payload;
      state.displayContent =
        state.resourceContent.filter(
          (item) => item.parentId === action.payload
        ) || [];
    },
    handleSearchQueryAction(state, action) {
      state.searchQuery = action.payload;
      const lowerCaseQuery = action.payload?.toLowerCase();
      if (!lowerCaseQuery) {
        resourceContentSlice.caseReducers.onChangeCurrentViewAction(state, {
          payload: state.currentView,
          type: "",
        });
        return;
      }
      state.displayContent = state.displayContent?.reduce<
        AllResourcesLabelType[]
      >((result, item) => {
        // Check if the heading matches
        const headingMatches = item.heading
          .toLowerCase()
          .includes(lowerCaseQuery);

        // Filter nested content that matches the query
        const matchingNestedContent = item.nestedContent.filter((nestedItem) =>
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
      }, []);
    },
    handleAddBreadcrumbAction(state, action) {
      const newBreadcrumb = action.payload;
      // Check if the breadcrumb already exists
      const existingIndex = state.breadCrumb.findIndex(
        (crumb) => crumb.id === newBreadcrumb.id
      );
      if (existingIndex !== -1) {
        // If it exists, truncate the array up to this item
        state.breadCrumb = state.breadCrumb.slice(0, existingIndex + 1);
      } else {
        // Otherwise add it to the end
        state.breadCrumb = [...state.breadCrumb, newBreadcrumb];
      }
      // Update current view and display content based on the new breadcrumb
      resourceContentSlice.caseReducers.onChangeCurrentViewAction(state, {
        payload: newBreadcrumb.id,
        type: "",
      });
      state.searchQuery = "";
    },
    handleBreadCrumbClickAction(state, action) {
      const clickedBreadcrumbIndex = action.payload;
      const item = state.breadCrumb[clickedBreadcrumbIndex];
      // Remove the breadcrumb with the specified id
      state.breadCrumb = state.breadCrumb.slice(0, clickedBreadcrumbIndex + 1);
      resourceContentSlice.caseReducers.onChangeCurrentViewAction(state, {
        payload: item.id,
        type: "",
      });
      state.searchQuery = "";
    },
  },
  extraReducers: resourceContentExtraReducer,
});

export const {
  onChangeResourceContentAction,
  onChnageSelectedItemAction,
  onChangeCurrentViewAction,
  handleSearchQueryAction,
  handleAddBreadcrumbAction,
  handleBreadCrumbClickAction,
} = resourceContentSlice.actions;
export default resourceContentSlice.reducer;
