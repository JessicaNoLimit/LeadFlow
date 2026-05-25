import Link from "next/link";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

const dateTimeFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

function formatDate(value: string | null) {
  if (!value) {
    return "No indicado";
  }

  return dateFormatter.format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "No indicado";
  }

  return dateTimeFormatter.format(new Date(value));
}

function renderValue(value: string | null) {
  return value && value.trim().length > 0 ? value : "No indicado";
}

async function getClientesPageData() {
  const supabase = createSupabaseServerClient();
  const [
    { data: leads, error: leadsError },
    { data: presupuestos, error: presupuestosError },
  ] = await Promise.all([
    supabase
      .from("leads")
      .select("*")
      .eq("estado", "aceptado")
      .order("updated_at", { ascending: false }),
    supabase
      .from("presupuestos")
      .select("*")
      .eq("estado", "aceptado")
      .not("lead_id", "is", null),
  ]);

  if (leadsError || presupuestosError) {
    throw new Error("No se pudo cargar el modulo de clientes.");
  }

  return {
    leads: (leads ?? []) as Lead[],
    presupuestos: (presupuestos ?? []) as Presupuesto[],
  };
}

function SummaryCard({
  label,
  value,
  description,
}: Readonly<{
  label: string;
  value: string | number;
  description: string;
}>) {
  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/56">
        {label}
      </p>
      <p className="mt-4 font-heading text-3xl text-ivory">{value}</p>
      <p className="mt-3 text-sm leading-7 text-mist/72">{description}</p>
    </article>
  );
}

export default async function DashboardClientesPage() {
  let leads: Lead[] | null = null;
  let presupuestos: Presupuesto[] | null = null;

  try {
    const pageData = await getClientesPageData();
    leads = pageData.leads;
    presupuestos = pageData.presupuestos;
  } catch {
    leads = null;
    presupuestos = null;
  }

  if (!leads || !presupuestos) {
    return (
      <section className="rounded-[2rem] border border-[#5a2f2f] bg-[#241515]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#efc4c4]">
          Error de carga
        </p>
        <h1 className="mt-4 font-heading text-3xl text-ivory">
          No se pudo cargar el modulo de clientes.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#efc4c4]">
          Revisa la disponibilidad de Supabase y vuelve a intentarlo en unos minutos.
        </p>
      </section>
    );
  }

  const leadsWithEventDate = leads.filter((lead) => Boolean(lead.fecha_evento)).length;
  const acceptedBudgetLeadIds = new Set(
    presupuestos.map((presupuesto) => presupuesto.lead_id).filter(Boolean),
  );
  const leadsWithAcceptedBudget = leads.filter((lead) =>
    acceptedBudgetLeadIds.has(lead.id),
  ).length;
  const latestClient = leads[0] ?? null;

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Clientes
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
          Vista operativa de clientes confirmados dentro del CRM.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
          En esta version, los clientes se generan automaticamente a partir de
          leads aceptados.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Clientes confirmados"
          value={leads.length}
          description="Leads que ya han pasado al estado aceptado."
        />
        <SummaryCard
          label="Eventos con fecha indicada"
          value={leadsWithEventDate}
          description="Clientes con fecha de evento registrada en la ficha."
        />
        <SummaryCard
          label="Con presupuesto aceptado"
          value={leadsWithAcceptedBudget}
          description="Clientes que ya tienen una propuesta aceptada vinculada."
        />
        <SummaryCard
          label="Ultimo cliente confirmado"
          value={latestClient ? latestClient.nombre : "Sin datos"}
          description={
            latestClient
              ? `Confirmado el ${formatDateTime(latestClient.updated_at)}.`
              : "Aun no hay confirmaciones registradas."
          }
        />
      </section>

      {leads.length === 0 ? (
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Sin clientes
          </p>
          <h2 className="mt-4 font-heading text-3xl text-ivory">
            Todavia no hay clientes confirmados.
          </h2>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
            Los leads apareceran aqui cuando su estado sea aceptado.
          </p>
          <div className="mt-8">
            <Link
              href="/dashboard/leads"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
            >
              Ver leads
            </Link>
          </div>
        </section>
      ) : (
        <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
                Clientes confirmados
              </p>
              <h2 className="mt-3 font-heading text-3xl text-ivory">
                Leads aceptados convertidos en cartera activa
              </h2>
            </div>
            <p className="max-w-xl text-sm leading-7 text-mist/72">
              Esta vista concentra los leads cerrados favorablemente para seguir su
              contexto comercial sin crear todavia una tabla independiente.
            </p>
          </div>

          <div className="mt-8 grid gap-4">
            {leads.map((lead) => (
              <article
                key={lead.id}
                className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22"
              >
                <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                  <div className="min-w-0">
                    <Link
                      href={`/dashboard/leads/${lead.id}`}
                      className="font-heading text-2xl text-ivory transition hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                    >
                      {lead.nombre}
                    </Link>
                    <p className="mt-2 text-sm text-mist/76">{lead.email}</p>
                  </div>

                  <span className="inline-flex items-center rounded-full border border-[#4b6b57]/30 bg-[#102317]/70 px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-[#cde7d2]">
                    Cliente confirmado
                  </span>
                </div>

                <div className="mt-5 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-2 xl:grid-cols-4">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Telefono
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {renderValue(lead.telefono)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Tipo de sesion
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {lead.tipo_sesion}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Fecha del evento
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {formatDate(lead.fecha_evento)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Ubicacion
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {renderValue(lead.ubicacion)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-2">
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Lead creado
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {formatDateTime(lead.created_at)}
                    </p>
                  </div>
                  <div>
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                      Ultima actualizacion
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">
                      {formatDateTime(lead.updated_at)}
                    </p>
                  </div>
                </div>

                <div className="mt-5 border-t border-white/8 pt-5">
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="inline-flex items-center text-sm uppercase tracking-[0.22em] text-sand transition hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                  >
                    Abrir ficha del lead
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
