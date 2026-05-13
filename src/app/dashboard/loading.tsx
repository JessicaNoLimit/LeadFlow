export default function DashboardLoading() {
  return (
    <div className="grid gap-6">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
        {Array.from({ length: 6 }).map((_, index) => (
          <div
            key={index}
            className="h-28 animate-pulse rounded-[1.6rem] border border-white/10 bg-white/[0.04]"
          />
        ))}
      </div>
      <div className="h-72 animate-pulse rounded-[1.8rem] border border-white/10 bg-white/[0.04]" />
    </div>
  );
}
