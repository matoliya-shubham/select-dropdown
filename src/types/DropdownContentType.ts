export type BreadcrumbItemType = {
  title: string;
  id: string;
};

export type AllResourcesLabelType = {
  id: string;
  parentId?: string;
  heading: string;
  nestedContent: {
    title: string;
    id: string;
    tooltipContent?: string;
    iconName?: string;
    hasContent: boolean;
  }[];
};

export type AddedResourceType = {
  title: string;
  id: string;
};

export const FormModeType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
} as const;

export const ActionType = {
  ADD: "ADD",
  DELETE: "DELETE",
  UPADATE: "UPDATE",
};
export type FormModeType = (typeof FormModeType)[keyof typeof FormModeType];
