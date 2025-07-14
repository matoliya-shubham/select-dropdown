import type { AllResourcesLabelType } from "@/types/DropdownContentType";
import {
  File,
  GitFork,
  Globe2,
  RemoveFormatting,
  Settings2,
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

export const AllResourcesLabel: AllResourcesLabelType[] = [
  {
    id: "1234",
    heading: "Record Variables",
    nestedContent: [
      {
        id: "1235",
        title: "Account",
        tooltipContent: "Tooltip Content Account",
        icon: File,
        hasContent: true,
      },
      {
        id: "1236",
        title: "Contact",
        tooltipContent: "Tooltip Content Contact",
        icon: File,
        hasContent: true,
      },
    ],
  },
  {
    id: "1237",
    heading: "Global Constants",
    nestedContent: [
      {
        id: "1238",
        title: "False",
        icon: Settings2,
        hasContent: false,
      },
      {
        id: "1239",
        title: "True",
        icon: Settings2,
        hasContent: false,
      },
      {
        id: "1240",
        title: "Blank Value (Empty String)",
        icon: RemoveFormatting,
        hasContent: false,
      },
    ],
  },
  {
    id: "1241",
    heading: "Global Variables",
    nestedContent: [
      {
        id: "1242",
        title: "API",
        icon: Globe2,
        hasContent: true,
      },
      {
        id: "1243",
        title: "Custom Hierarchy Settings",
        icon: GitFork,
        hasContent: true,
      },
    ],
  },
];

export const RelatedResourcesLabel: AllResourcesLabelType[] = [
  {
    id: "1244",
    parentId: "1235",
    heading: "Relationship Fields",
    nestedContent: [
      {
        id: "1246",
        title: "Created By ID",
        tooltipContent: "Tooltip Content Created By ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1247",
        title: "D&B company ID",
        tooltipContent: "Tooltip Content D&B company ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1287",
        title: "Last Modified By ID",
        tooltipContent: "Tooltip Content Last Modified By ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1248",
        title: "Master Record ID",
        tooltipContent: "Tooltip Content Master Record ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1249",
        title: "Operating Hour ID",
        tooltipContent: "Tooltip Content Operating Hour ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1250",
        title: "Owner ID",
        tooltipContent: "Tooltip Content Owner ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1251",
        title: "Parent Account ID",
        tooltipContent: "Tooltip Content Parent Account ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1252",
        title: "Created By ID",
        tooltipContent: "Tooltip Content Created By ID",
        icon: File,
        hasContent: false,
      },
    ],
  },
  {
    id: "1284",
    parentId: "1246",
    heading: "Relationship Fields",
    nestedContent: [
      {
        id: "1253",
        title: "Account ID",
        tooltipContent: "Tooltip Content Account ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1254",
        title: "Contact ID",
        tooltipContent: "Tooltip Content Contact ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1255",
        title: "Created By ID",
        tooltipContent: "Tooltip Content Last Modified By ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1256",
        title: "Individual ID",
        tooltipContent: "Tooltip Content Master Record ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1257",
        title: "Last Modified By ID",
        tooltipContent: "Tooltip Content Last Modified By ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1258",
        title: "Manager ID",
        tooltipContent: "Tooltip Content Manager ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1259",
        title: "Profile ID",
        tooltipContent: "Tooltip Content Profile ID",
        icon: File,
        hasContent: true,
      },
      {
        id: "1260",
        title: "Record Type ID",
        tooltipContent: "Tooltip Content Record Type ID",
        icon: File,
        hasContent: false,
      },
    ],
  },
  {
    id: "1261",
    parentId: "1253",
    heading: "Relationship Fields",
    nestedContent: [
      {
        id: "1265",
        title: "Individual ID",
        tooltipContent: "Tooltip Content Master Record ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1267",
        title: "Manager ID",
        tooltipContent: "Tooltip Content Manager ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1268",
        title: "Profile ID",
        tooltipContent: "Tooltip Content Profile ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1264",
        title: "Created By ID",
        tooltipContent: "Tooltip Content Last Modified By ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1266",
        title: "Last Modified By ID",
        tooltipContent: "Tooltip Content Last Modified By ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1269",
        title: "Record Type ID",
        tooltipContent: "Tooltip Content Record Type ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1262",
        title: "Account ID",
        tooltipContent: "Tooltip Content Account ID",
        icon: File,
        hasContent: false,
      },
      {
        id: "1263",
        title: "Contact ID",
        tooltipContent: "Tooltip Content Contact ID",
        icon: File,
        hasContent: false,
      },
    ],
  },
];
