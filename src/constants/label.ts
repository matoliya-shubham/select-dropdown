import {
  File,
  GitFork,
  Globe2,
  RemoveFormatting,
  Settings2,
} from "lucide-react";

export const DBCollectionName = "resourceContentData";

export const ResourceCategoryOptions = [
  {
    value: "bOQTyyYn940sWaIR8B8d",
    label: "Record Variables",
  },
  {
    value: "elBsPVLn6kbsmGCTZNYT",
    label: "Global Constants",
  },
  {
    value: "r1xkoa8wMmxOmZU7nSMm",
    label: "Global Variables",
  },
  {
    value: "0G8Ms3I4ytw15xY5B1Ou",
    label: "Relationship Fields v1",
  },
  {
    value: "xyzDKCwKD4VlqC1uvSMq",
    label: "Relationship Fields v2",
  },
  {
    value: "YxseGXwKp5EFsJdPSGTG",
    label: "Relationship Fields v3",
  },
];

export const IconMap = {
  File: File,
  Settings: Settings2,
  Formatting: RemoveFormatting,
  Globe: Globe2,
  GitFork: GitFork,
};

export const toastMessages = {
  addResourceSuccess: "Resource added successfully",
  addResourceError: "Error adding resource",
  deleteResourceSuccess: "Resource deleted successfully",
  deleteResourceError: "Error deleting resource",
  updateResourceSuccess: "Resource updated successfully",
  updateResourceError: "Error updating resource",
};
