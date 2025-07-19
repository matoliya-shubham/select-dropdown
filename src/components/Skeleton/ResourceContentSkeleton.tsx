import { Skeleton } from "@/components/ui/skeleton";

export const ResourceContentSkeleton = () => {
  return (
    <div className="flex flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
      <div className="flex items-center gap-2">
        <Skeleton className="h-6 w-24" />
        <Skeleton className="h-6 w-16" />
      </div>
      <div className="flex flex-col gap-2">
        {[...Array(3)].map((_, index) => (
          <div key={index} className="flex items-center gap-2">
            <Skeleton className="h-8 w-full" />
          </div>
        ))}
      </div>
    </div>
  );
};
