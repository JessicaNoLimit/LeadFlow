import { redirect } from "next/navigation";
import { DashboardLeadsList } from "@/sections/dashboard/dashboard-leads-list";
import { DashboardSummary } from "@/sections/dashboard/dashboard-summary";
import { fetchDashboardLeads } from "@/lib/dashboard";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";

export default async function DashboardPage() {
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const leads = await fetchDashboardLeads();

  return (
    <div className="grid gap-8">
      <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_320px]">
        <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 sm:p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            CRM privado
          </p>

          <h2 className="mt-4 font-heading text-4xl text-ivory">
            Panel de gestión de LeadFlow.
          </h2>

          <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
            Desde este espacio puedes revisar solicitudes reales, consultar el
            estado comercial de cada lead y acceder a su ficha individual.
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
            El acceso a esta zona está restringido a usuarios autenticados
            mediante cookies de sesión gestionadas por Supabase SSR.
          </p>
        </aside>
      </section>

      <DashboardSummary leads={leads} />
      <DashboardLeadsList leads={leads} />
    </div>
  );
}