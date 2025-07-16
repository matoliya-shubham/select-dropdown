import { useContext } from "react";
import {
  ResourceContext,
  type ResourceContextType,
} from "../context/ResourceContext";

// Custom hook to use the context
export const useResourceContext = (): ResourceContextType => {
  const context = useContext(ResourceContext);
  if (context === undefined) {
    throw new Error(
      "useResourceContext must be used within a ResourceProvider"
    );
  }
  return context;
};
