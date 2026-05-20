import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadDetailForm } from "@/components/dashboard/lead-detail-form";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

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

export default async function LeadDetailPage({
  params,
}: LeadDetailPageProps) {
  const { id } = await params;
  const lead = await getLeadById(id);

  if (!lead) {
    notFound();
  }

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
