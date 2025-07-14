import type { LucideProps } from "lucide-react";

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
    icon?: React.ForwardRefExoticComponent<
      Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>
    >;
    hasContent: boolean;
  }[];
};
