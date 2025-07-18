import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useResourceContent } from "@/hooks/useResourceContent";

export const ResourceBreadCrumb = () => {
  const { breadCrumb, handleBreadcrumbClick } = useResourceContent();
  return (
    <div className="p-2 px-4 border-b bg-gray-100">
      <Breadcrumb>
        <BreadcrumbList>
          {breadCrumb.map((crumb, index) => (
            <div key={crumb.id} className="flex items-center gap-1">
              <BreadcrumbItem>
                {index === breadCrumb.length - 1 ? (
                  <BreadcrumbPage>{crumb.title}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink
                    onClick={() => handleBreadcrumbClick(index)}
                    className="cursor-pointer hover:underline"
                  >
                    {crumb.title}
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {index < breadCrumb.length - 1 && <BreadcrumbSeparator />}
            </div>
          ))}
        </BreadcrumbList>
      </Breadcrumb>
    </div>
  );
};
