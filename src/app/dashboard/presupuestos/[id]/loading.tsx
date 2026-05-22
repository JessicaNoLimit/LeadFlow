import { Skeleton } from "@/components/ui/skeleton";

export default function DashboardPresupuestoDetailLoading() {
  return (
    <div className="grid gap-6">
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8 lg:p-9">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="grid gap-3">
            <Skeleton className="h-4 w-36 rounded-full" />
            <Skeleton className="h-12 w-[32rem] max-w-full rounded-[1.5rem]" />
            <Skeleton className="h-6 w-[28rem] max-w-full rounded-full" />
          </div>
          <div className="flex gap-3">
            <Skeleton className="h-10 w-28 rounded-full" />
            <Skeleton className="h-10 w-36 rounded-full" />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="grid gap-6">
          <Skeleton className="h-64 rounded-[1.8rem]" />
          <Skeleton className="h-52 rounded-[1.8rem]" />
          <Skeleton className="h-64 rounded-[1.8rem]" />
        </div>
        <div className="grid gap-6">
          <Skeleton className="h-56 rounded-[1.8rem]" />
          <Skeleton className="h-56 rounded-[1.8rem]" />
          <Skeleton className="h-[34rem] rounded-[1.8rem]" />
        </div>
      </div>
    </div>
  );
}
