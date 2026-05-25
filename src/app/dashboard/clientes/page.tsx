import Link from "next/link";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
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
    return "No indicada";
  }

  return dateFormatter.format(new Date(value));
}

function formatDateTime(value: string | null) {
  if (!value) {
    return "No disponible";
  }

  return dateTimeFormatter.format(new Date(value));
}

function renderValue(value: string | null) {
  return value && value.trim().length > 0 ? value : "No indicado";
}

async function getAcceptedLeads() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("estado", "aceptado")
    .order("updated_at", { ascending: false });

  if (error) {
    console.error("Failed to load accepted leads", error);
    throw new Error("No se pudieron cargar los clientes");
  }

  return data as Lead[];
}

async function getAcceptedBudgets() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("presupuestos")
    .select("id, lead_id, estado")
    .eq("estado", "aceptado");

  if (error) {
    console.error("Failed to load accepted budgets", error);
    throw new Error("No se pudieron cargar las metricas comerciales");
  }

  return data as Pick<Presupuesto, "id" | "lead_id" | "estado">[];
}

function SummaryCard({
  label,
  value,
  helper,
}: Readonly<{
  label: string;
  value: string;
  helper: string;
}>) {
  return (
    <article className="rounded-[1.65rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 shadow-[0_20px_55px_rgba(0,0,0,0.2)]">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">{label}</p>
      <p className="mt-4 font-heading text-4xl text-ivory">{value}</p>
      <p className="mt-3 text-sm leading-7 text-mist/72">{helper}</p>
    </article>
  );
}

export default async function ClientesPage() {
  const [clients, acceptedBudgets] = await Promise.all([
    getAcceptedLeads(),
    getAcceptedBudgets(),
  ]);

  const clientsWithEventDate = clients.filter((lead) => Boolean(lead.fecha_evento)).length;
  const acceptedBudgetLeadIds = new Set(
    acceptedBudgets
      .map((presupuesto) => presupuesto.lead_id)
      .filter((leadId): leadId is string => Boolean(leadId)),
  );
  const clientsWithAcceptedBudget = clients.filter((lead) =>
    acceptedBudgetLeadIds.has(lead.id),
  ).length;
  const latestClient = clients[0] ?? null;

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Clientes confirmados
        </p>
        <h1 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
          Relaciones cerradas y preparadas para el siguiente paso.
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-8 text-mist sm:text-lg">
          En esta version, los clientes se generan automaticamente a partir de
          leads aceptados.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Clientes confirmados"
          value={String(clients.length)}
          helper="Leads que ya han pasado a una fase comercial cerrada."
        />
        <SummaryCard
          label="Eventos con fecha"
          value={String(clientsWithEventDate)}
          helper="Clientes con una fecha de evento ya indicada."
        />
        <SummaryCard
          label="Con presupuesto aceptado"
          value={String(clientsWithAcceptedBudget)}
          helper="Clientes que ya tienen una propuesta aceptada vinculada."
        />
        <SummaryCard
          label="Ultimo cliente"
          value={latestClient ? latestClient.nombre : "Sin registros"}
          helper={
            latestClient
              ? `Confirmado el ${formatDateTime(latestClient.updated_at)}.`
              : "El primer cliente confirmado aparecera aqui."
          }
        />
      </section>

      <section className="rounded-[1.9rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-7">
        <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Vista comercial
            </p>
            <h2 className="mt-3 font-heading text-3xl text-ivory">
              Clientes activos
            </h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-mist/72">
            Accede a cada ficha para revisar el encargo original, el historial
            comercial y las siguientes acciones del cliente.
          </p>
        </div>

        {clients.length === 0 ? (
          <div className="mt-6 rounded-[1.6rem] border border-white/8 bg-black/18 p-6 sm:p-7">
            <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">
              Sin clientes confirmados
            </p>
            <h3 className="mt-3 font-heading text-2xl text-ivory">
              Todavia no hay clientes confirmados.
            </h3>
            <p className="mt-3 max-w-2xl text-sm leading-7 text-mist/72">
              Los leads apareceran aqui cuando su estado sea aceptado.
            </p>
            <Link
              href="/dashboard/leads"
              className="mt-6 inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
            >
              Ver leads
            </Link>
          </div>
        ) : (
          <div className="mt-6 grid gap-4">
            {clients.map((lead) => {
              const hasAcceptedBudget = acceptedBudgetLeadIds.has(lead.id);

              return (
                <article
                  key={lead.id}
                  className="rounded-[1.6rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22 sm:p-6"
                >
                  <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-3">
                        <LeadStatusBadge status={lead.estado} />
                        {hasAcceptedBudget ? (
                          <span className="rounded-full border border-[#4b6b57]/30 bg-[#102317]/70 px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-[#cde7d2]">
                            Presupuesto aceptado
                          </span>
                        ) : null}
                      </div>

                      <Link
                        href={`/dashboard/clientes/${lead.id}`}
                        className="mt-4 inline-block font-heading text-3xl text-ivory transition hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                      >
                        {lead.nombre}
                      </Link>

                      <div className="mt-4 grid gap-3 text-sm leading-7 text-mist/72 sm:grid-cols-2">
                        <p>Email: {lead.email}</p>
                        <p>Telefono: {renderValue(lead.telefono)}</p>
                        <p>Tipo de sesion: {lead.tipo_sesion}</p>
                        <p>Fecha del evento: {formatDate(lead.fecha_evento)}</p>
                        <p>Ubicacion: {renderValue(lead.ubicacion)}</p>
                        <p>Lead creado: {formatDateTime(lead.created_at)}</p>
                      </div>
                    </div>

                    <div className="flex flex-col gap-3 sm:min-w-[220px]">
                      <Link
                        href={`/dashboard/clientes/${lead.id}`}
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                      >
                        Abrir cliente
                      </Link>
                      <Link
                        href={`/dashboard/clientes/${lead.id}`}
                        className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                      >
                        Ver historial comercial
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
