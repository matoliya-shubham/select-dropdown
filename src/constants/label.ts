import {
  CaseSensitive,
  File,
  GitFork,
  Globe2,
  Settings2,
  type LucideProps,
} from "lucide-react";

export const ResourceCategory = {
  RecordVariables: "RecordVariables",
  GlobalConstants: "GlobalConstants",
  GlobalVariables: "GlobalVariables",
} as const;

export const ResourceCategoryOptions = [
  {
    value: ResourceCategory.RecordVariables,
    label: "Record Variables",
  },
  {
    value: ResourceCategory.GlobalConstants,
    label: "Global Constants",
  },
  {
    value: ResourceCategory.GlobalVariables,
    label: "Global Variables",
  },
];

export type AllResourcesLabelType = {
  heading: string;
  nestedContent: {
    title: string;
    tooltipContent?: string;
    icon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    hasContent: boolean;
  }[];
};
export const AllResourcesLabel: AllResourcesLabelType[] = [
  {
    heading: "Record Variables",
    nestedContent: [
      {
        title: "Account",
        tooltipContent: "Tooltip Content Account",
        icon: File,
        hasContent: true,
      },
      {
        title: "Contact",
        tooltipContent: "Tooltip Content Contact",
        icon: File,
        hasContent: true,
      },
    ],
  },
  {
    heading: "Global Constants",
    nestedContent: [
      {
        title: "False",
        icon: Settings2,
        hasContent: false,
      },
      {
        title: "True",
        icon: Settings2,
        hasContent: false,
      },
      {
        title: "Blank Value (Empty String)",
        icon: CaseSensitive,
        hasContent: false,
      },
    ],
  },
  {
    heading: "Global Variables",
    nestedContent: [
      {
        title: "API",
        icon: Globe2,
        hasContent: true,
      },
      {
        title: "Custom Hierarchy Settings",
        icon: GitFork,
        hasContent: true,
      },
    ],
  },
];
