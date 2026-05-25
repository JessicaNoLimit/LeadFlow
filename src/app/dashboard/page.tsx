import Link from "next/link";
import { RecentLeads } from "@/sections/dashboard/recent-leads";
import { DashboardSummary } from "@/sections/dashboard/dashboard-summary";
import { getDashboardLeads } from "@/lib/dashboard/get-dashboard-leads";

export default async function DashboardPage() {
  let leads: Awaited<ReturnType<typeof getDashboardLeads>> | null = null;

  try {
    leads = await getDashboardLeads();
  } catch {
    leads = null;
  }

  if (!leads) {
    return (
      <section className="rounded-[2rem] border border-[#5a2f2f] bg-[#241515]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#efc4c4]">
          Error de carga
        </p>
        <h2 className="mt-4 font-heading text-3xl text-ivory">
          No se pudieron cargar los leads del CRM.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#efc4c4]">
          Revisa la disponibilidad de la API interna y vuelve a intentarlo en unos minutos.
        </p>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.22)] sm:p-7">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              LeadFlow CRM
            </p>
            <h1 className="mt-3 font-heading text-4xl text-ivory sm:text-5xl">
              LeadFlow CRM
            </h1>
          </div>

          <div className="flex flex-col gap-3 lg:items-end">
            <p className="text-sm uppercase tracking-[0.22em] text-mist/76 sm:text-[0.78rem] lg:text-right">
              Captacion → Seguimiento → Presupuesto → Cierre
            </p>
            <Link
              href="/dashboard/leads"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
            >
              Ver leads
            </Link>
          </div>
        </div>
      </section>

      <DashboardSummary leads={leads} />
      <RecentLeads leads={leads} />
    </div>
  );
}
