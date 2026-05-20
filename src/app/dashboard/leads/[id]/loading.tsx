import { Skeleton } from "@/components/ui/skeleton";

export default function LeadDetailLoading() {
  return (
    <div className="grid gap-6 lg:gap-7">
      <Skeleton className="h-56 rounded-[2rem]" />

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="grid gap-6">
          <Skeleton className="h-64 rounded-[1.8rem]" />
          <Skeleton className="h-64 rounded-[1.8rem]" />
          <Skeleton className="h-52 rounded-[1.8rem]" />
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-48 rounded-[1.8rem]" />
          <Skeleton className="h-56 rounded-[1.8rem]" />
          <Skeleton className="h-[32rem] rounded-[1.8rem]" />
        </div>
      </div>
    </div>
  );
}
