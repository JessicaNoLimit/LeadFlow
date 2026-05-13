import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardLeadsList } from "@/sections/dashboard/dashboard-leads-list";
import { DashboardSummary } from "@/sections/dashboard/dashboard-summary";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";
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
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let leads: Lead[] | null = null;

  try {
    leads = await getDashboardLeads();
  } catch {
    leads = null;
  }

  if (!leads) {
    return (
      <section className="rounded-[1.8rem] border border-[#5a2f2f] bg-[#241515] p-8">
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
    <div className="grid gap-6">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 sm:p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Sesion activa
          </p>
          <h2 className="mt-4 font-heading text-4xl text-ivory">
            Bienvenido al entorno privado de LeadFlow.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
            Ya puedes revisar los leads reales captados desde la web publica.
            Esta base deja preparado el CRM para la siguiente fase operativa.
          </p>
        </div>

        <aside className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Usuario autenticado
          </p>
          <p className="mt-5 font-heading text-2xl text-ivory">
            {user.email ?? "Sin email"}
          </p>
          <p className="mt-4 text-sm leading-7 text-mist/76">
            El acceso a esta zona esta restringido a usuarios autenticados mediante
            cookies de sesion gestionadas por Supabase SSR.
          </p>
        </aside>
      </section>

      <DashboardSummary leads={leads} />
      <DashboardLeadsList leads={leads} />
    </div>
  );
}
