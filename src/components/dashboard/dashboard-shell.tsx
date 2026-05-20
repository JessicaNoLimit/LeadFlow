import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

type DashboardShellProps = {
  children: React.ReactNode;
  userEmail?: string;
};

export function DashboardShell({
  children,
  userEmail,
}: DashboardShellProps) {
  return (
    <div className="relative min-h-screen bg-[radial-gradient(circle_at_top_left,rgba(215,198,168,0.12),transparent_24%),linear-gradient(180deg,#0a0a0a_0%,#111111_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />
      <DashboardHeader userEmail={userEmail} />
      <div className="relative mx-auto grid w-full max-w-[1600px] gap-6 px-5 py-5 sm:px-6 lg:grid-cols-[280px_minmax(0,1fr)] lg:px-8 lg:py-8">
        <DashboardSidebar />
        <main className="min-w-0">{children}</main>
      </div>
    </div>
  );
}
