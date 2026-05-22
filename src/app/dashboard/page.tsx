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
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1.25fr)_minmax(320px,0.75fr)]">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Vista general
          </p>
          <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
            Panel privado para gestionar leads con una estructura clara y operativa.
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
            Supervisa captacion, seguimiento comercial y estado de presupuestos desde
            un entorno independiente de la web publica.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard/leads"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
            >
              Ver todos los leads
            </Link>
          </div>
        </div>

        <aside className="grid gap-4 rounded-[2rem] border border-white/10 bg-black/22 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:grid-cols-2 xl:grid-cols-1">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-mist/58">
              Lectura inmediata
            </p>
            <p className="mt-3 font-heading text-3xl text-ivory">
              Prioriza revision, seguimiento y cierre sin salir del panel.
            </p>
            <p className="mt-3 text-sm leading-7 text-mist/72">
              El resumen inferior concentra volumen, etapas clave y conversion para
              decidir el siguiente movimiento comercial.
            </p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-mist/58">
              Fuente
            </p>
            <p className="mt-3 text-lg text-ivory">Supabase + API interna</p>
            <p className="mt-3 text-sm leading-7 text-mist/72">
              Datos sincronizados desde el formulario publico sin mezclar shells.
            </p>
          </div>
        </aside>
      </section>

      <DashboardSummary leads={leads} />
      <RecentLeads leads={leads} />
    </div>
  );
}
