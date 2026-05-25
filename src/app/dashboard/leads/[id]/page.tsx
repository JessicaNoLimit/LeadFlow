import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadDetailForm } from "@/components/dashboard/lead-detail-form";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { PresupuestoStatusBadge } from "@/components/dashboard/presupuesto-status-badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const commercialFlowSteps = [
  { key: "nuevo", label: "Nuevo" },
  { key: "contactado", label: "Contactado" },
  { key: "presupuesto_enviado", label: "Presupuesto enviado" },
  { key: "aceptado", label: "Aceptado" },
  { key: "rechazado", label: "Rechazado" },
] as const;

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

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
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

async function getLeadById(id: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load lead detail", error);
    throw new Error("No se pudo cargar el lead");
  }

  return data;
}

async function getPresupuestosByLeadId(leadId: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("presupuestos")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load lead presupuestos", error);
    throw new Error("No se pudieron cargar los presupuestos del lead");
  }

  return data as Presupuesto[];
}

function DetailCard({
  eyebrow,
  title,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-7">
      <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">{eyebrow}</p>
      <h2 className="mt-3 font-heading text-3xl text-ivory">{title}</h2>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function DetailItem({
  label,
  value,
}: Readonly<{
  label: string;
  value: string;
}>) {
  return (
    <div>
      <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">{label}</p>
      <p className="mt-2 text-sm leading-7 text-ivory">{value}</p>
    </div>
  );
}

function QuickActionLink({
  href,
  label,
}: Readonly<{
  href: string;
  label: string;
}>) {
  return (
    <a
      href={href}
      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
    >
      {label}
    </a>
  );
}

function getLeadStepState(stepKey: (typeof commercialFlowSteps)[number]["key"], currentStatus: string) {
  if (currentStatus === "archivado") {
    return "pending";
  }

  if (currentStatus === "aceptado") {
    return stepKey === "rechazado"
      ? "pending"
      : stepKey === "aceptado" || stepKey === "nuevo" || stepKey === "contactado" || stepKey === "presupuesto_enviado"
        ? "complete"
        : "pending";
  }

  if (currentStatus === "rechazado") {
    return stepKey === "aceptado"
      ? "pending"
      : stepKey === "rechazado" || stepKey === "nuevo" || stepKey === "contactado" || stepKey === "presupuesto_enviado"
        ? "complete"
        : "pending";
  }

  const currentIndex = commercialFlowSteps.findIndex((step) => step.key === currentStatus);
  const stepIndex = commercialFlowSteps.findIndex((step) => step.key === stepKey);

  if (currentIndex === -1 || stepIndex === -1) {
    return "pending";
  }

  if (stepIndex < currentIndex) {
    return "complete";
  }

  if (stepIndex === currentIndex) {
    return "current";
  }

  return "pending";
}

export default async function LeadDetailPage({
  params,
}: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

  const presupuestos = await getPresupuestosByLeadId(lead.id);

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Ficha del lead
            </p>
            <h1 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
              {lead.nombre}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-mist sm:text-lg">
              Consulta la informacion completa del cliente y registra el avance
              comercial desde una unica vista operativa.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LeadStatusBadge status={lead.estado} />
            <LeadPriorityBadge priority={lead.prioridad} />
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="grid gap-6">
          <DetailCard eyebrow="Cliente" title="Datos principales">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Nombre" value={lead.nombre} />
              <DetailItem label="Email" value={lead.email} />
              <DetailItem label="Telefono" value={renderValue(lead.telefono)} />
              <DetailItem label="Creado" value={formatDateTime(lead.created_at)} />
              <DetailItem label="Actualizado" value={formatDateTime(lead.updated_at)} />
            </div>
          </DetailCard>

          <DetailCard eyebrow="Sesion" title="Detalles del encargo">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Tipo de sesion" value={lead.tipo_sesion} />
              <DetailItem label="Fecha del evento" value={formatDate(lead.fecha_evento)} />
              <DetailItem label="Ubicacion" value={renderValue(lead.ubicacion)} />
              <DetailItem label="Presupuesto" value={renderValue(lead.presupuesto)} />
            </div>
          </DetailCard>

          <DetailCard eyebrow="Mensaje" title="Solicitud recibida">
            <p className="text-sm leading-8 text-mist/82">
              {renderValue(lead.mensaje)}
            </p>
          </DetailCard>

          <DetailCard eyebrow="Pipeline" title="Flujo comercial">
            <p className="text-sm leading-7 text-mist/76">
              Este lead avanza desde la captacion inicial hasta el cierre comercial
              segun el estado sincronizado dentro del CRM.
            </p>

            <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
              {commercialFlowSteps.map((step) => {
                const stepState = getLeadStepState(step.key, lead.estado);
                const styles =
                  stepState === "complete"
                    ? "border-sand/24 bg-sand/[0.08] text-ivory"
                    : stepState === "current"
                      ? "border-[#4b6b57]/30 bg-[#102317]/70 text-[#cde7d2]"
                      : "border-white/8 bg-black/18 text-mist/68";

                return (
                  <div
                    key={step.key}
                    className={`rounded-[1.35rem] border px-4 py-4 transition ${styles}`}
                  >
                    <p className="text-[0.62rem] uppercase tracking-[0.22em]">
                      {stepState === "current"
                        ? "Actual"
                        : stepState === "complete"
                          ? "Completado"
                          : "Pendiente"}
                    </p>
                    <p className="mt-2 text-sm leading-6">{step.label}</p>
                  </div>
                );
              })}
            </div>
          </DetailCard>

          <DetailCard eyebrow="Presupuestos" title="Presupuestos asociados">
            <div className="flex flex-col gap-4 border-b border-white/8 pb-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm leading-7 text-mist/76">
                {presupuestos.length} presupuesto{presupuestos.length === 1 ? "" : "s"} vinculado
                {presupuestos.length === 1 ? "" : "s"} a este lead.
              </p>
              <Link
                href={`/dashboard/presupuestos?leadId=${lead.id}`}
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
              >
                Crear presupuesto para este lead
              </Link>
            </div>

            {presupuestos.length === 0 ? (
              <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-black/18 p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">
                  Sin presupuestos
                </p>
                <p className="mt-3 text-sm leading-7 text-mist/76">
                  Todavia no hay presupuestos vinculados a este lead.
                </p>
              </div>
            ) : (
              <div className="mt-6 grid gap-4">
                <div className="rounded-[1.4rem] border border-white/8 bg-white/[0.03] px-4 py-3 text-sm leading-7 text-mist/76">
                  Los cambios de estado del presupuesto actualizan automaticamente el
                  estado del lead vinculado.
                </div>
                {presupuestos.map((presupuesto) => (
                  <article
                    key={presupuesto.id}
                    className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0">
                        <Link
                          href={`/dashboard/presupuestos/${presupuesto.id}`}
                          className="font-heading text-2xl text-ivory transition hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                        >
                          {presupuesto.titulo}
                        </Link>
                        <p className="mt-2 text-sm text-mist/76">
                          Creado el {formatDateTime(presupuesto.created_at)}
                        </p>
                      </div>

                      <div className="flex flex-wrap items-center gap-3">
                        <PresupuestoStatusBadge status={presupuesto.estado} />
                        <span className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-ivory">
                          {currencyFormatter.format(presupuesto.importe)}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 border-t border-white/8 pt-5">
                      <Link
                        href={`/dashboard/presupuestos/${presupuesto.id}`}
                        className="inline-flex items-center text-sm uppercase tracking-[0.22em] text-sand transition hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                      >
                        Abrir presupuesto
                      </Link>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </DetailCard>
        </div>

        <div className="grid gap-6">
          <DetailCard eyebrow="Acciones" title="Atajos rapidos">
            <div className="grid gap-3">
              <QuickActionLink href={`mailto:${lead.email}`} label="Enviar email" />
              {lead.telefono ? (
                <QuickActionLink href={`tel:${lead.telefono}`} label="Llamar" />
              ) : (
                <span className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-mist/44">
                  Llamada no disponible
                </span>
              )}
              <Link
                href="/dashboard"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
              >
                Volver al dashboard
              </Link>
            </div>
          </DetailCard>

          <DetailCard eyebrow="Seguimiento" title="Contexto interno">
            <div className="grid gap-5">
              <DetailItem label="Estado actual" value={lead.estado.replaceAll("_", " ")} />
              <DetailItem label="Prioridad actual" value={lead.prioridad} />
              <DetailItem
                label="Notas internas"
                value={renderValue(lead.notas_internas)}
              />
            </div>
          </DetailCard>

          <LeadDetailForm lead={lead as Lead} />
        </div>
      </div>
    </div>
  );
}
