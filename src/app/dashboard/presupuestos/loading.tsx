import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPresupuestosLoading() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8 lg:p-9">
        <div className="grid gap-3">
          <Skeleton className="h-4 w-28 rounded-full" />
          <Skeleton className="h-12 w-[38rem] max-w-full rounded-[1.5rem]" />
          <Skeleton className="h-6 w-[32rem] max-w-full rounded-full" />
        </div>
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-40 rounded-[1.7rem]" />
        ))}
      </div>

      <section className="grid gap-6 xl:grid-cols-2">
        <Skeleton className="h-[32rem] rounded-[1.8rem]" />
        <Skeleton className="h-[32rem] rounded-[1.8rem]" />
      </section>

      <section className="grid gap-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Skeleton key={index} className="h-48 rounded-[1.5rem]" />
        ))}
      </section>
    </div>
  );
}
