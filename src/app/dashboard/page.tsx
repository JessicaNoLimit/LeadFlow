import { headers } from "next/headers";
import { DashboardLeadsList } from "@/sections/dashboard/dashboard-leads-list";
import { DashboardSummary } from "@/sections/dashboard/dashboard-summary";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadsApiResponse =
  | {
      success: true;
      leads: Lead[];
    }
  | {
      success: false;
      error: string;
    };

async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Missing host header");
  }

  return `${protocol}://${host}`;
}

async function getDashboardLeads() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/leads`, {
    cache: "no-store",
  });

  const result = (await response.json()) as LeadsApiResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.success ? "No se pudieron obtener los leads" : result.error,
    );
  }

  return result.leads;
}

export default async function DashboardPage() {
  let leads: Lead[] | null = null;

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
      <DashboardLeadsList leads={leads} />
    </div>
  );
}
