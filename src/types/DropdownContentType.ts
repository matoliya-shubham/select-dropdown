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

export const FormModeType = {
  CREATE: "CREATE",
  EDIT: "EDIT",
} as const;

export type FormModeType = (typeof FormModeType)[keyof typeof FormModeType];
