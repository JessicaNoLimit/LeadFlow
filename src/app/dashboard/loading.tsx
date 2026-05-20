import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardLoading() {
  return (
    <div className="grid gap-6">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <Skeleton className="h-64 rounded-[2rem]" />
        <Skeleton className="h-64 rounded-[2rem]" />
      </section>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 8 }).map((_, index) => (
          <Skeleton key={index} className="h-44 rounded-[1.7rem]" />
        ))}
      </div>

      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div className="grid gap-3">
            <Skeleton className="h-4 w-24 rounded-full" />
            <Skeleton className="h-10 w-72 max-w-full" />
          </div>
          <Skeleton className="h-6 w-56 max-w-full" />
        </div>

        <div className="mt-8 grid gap-4 xl:grid-cols-[minmax(0,1fr)_13rem_13rem_auto]">
          <Skeleton className="h-20 rounded-[1.6rem]" />
          <Skeleton className="h-20 rounded-[1.6rem]" />
          <Skeleton className="h-20 rounded-[1.6rem]" />
          <Skeleton className="h-20 rounded-[1.6rem]" />
        </div>

        <div className="mt-8 grid gap-3">
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} className="h-20 rounded-[1.4rem]" />
          ))}
        </div>
      </section>
    </div>
  );
}
