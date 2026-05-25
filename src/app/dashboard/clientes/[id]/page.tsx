import type { ReactNode } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LeadQuickActions } from "@/components/dashboard/lead-quick-actions";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import { PresupuestoStatusBadge } from "@/components/dashboard/presupuesto-status-badge";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

type ClientDetailPageProps = {
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

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
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

async function getAcceptedLeadById(id: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .eq("estado", "aceptado")
    .maybeSingle();

  if (error) {
    console.error("Failed to load client detail", error);
    throw new Error("No se pudo cargar la ficha del cliente");
  }

  return data as Lead | null;
}

async function getPresupuestosByLeadId(leadId: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("presupuestos")
    .select("*")
    .eq("lead_id", leadId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to load client budget history", error);
    throw new Error("No se pudo cargar el historial comercial");
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
  children: ReactNode;
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

function ActionLink({
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

export default async function ClientDetailPage({
  params,
}: ClientDetailPageProps) {
  const { id } = await params;
  const client = await getAcceptedLeadById(id);

  if (!client) {
    notFound();
  }

  const presupuestos = await getPresupuestosByLeadId(client.id);

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Ficha de cliente
            </p>
            <h1 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
              {client.nombre}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-mist sm:text-lg">
              Consulta los datos confirmados del cliente y el historial comercial
              vinculado desde una unica vista.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <LeadStatusBadge status={client.estado} />
            <span className="rounded-full border border-[#4b6b57]/30 bg-[#102317]/70 px-4 py-2 text-[0.68rem] uppercase tracking-[0.22em] text-[#cde7d2]">
              Cliente confirmado
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="grid gap-6">
          <DetailCard eyebrow="Cliente" title="Datos principales">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Nombre" value={client.nombre} />
              <DetailItem label="Email" value={client.email} />
              <DetailItem label="Telefono" value={renderValue(client.telefono)} />
              <DetailItem label="Estado actual" value={client.estado.replaceAll("_", " ")} />
              <DetailItem label="Lead creado" value={formatDateTime(client.created_at)} />
              <DetailItem label="Ultima actualizacion" value={formatDateTime(client.updated_at)} />
            </div>
          </DetailCard>

          <DetailCard eyebrow="Sesion" title="Detalles del encargo">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Tipo de sesion" value={client.tipo_sesion} />
              <DetailItem label="Fecha del evento" value={formatDate(client.fecha_evento)} />
              <DetailItem label="Ubicacion" value={renderValue(client.ubicacion)} />
              <DetailItem label="Presupuesto orientativo" value={renderValue(client.presupuesto)} />
            </div>
          </DetailCard>

          <DetailCard eyebrow="Solicitud original" title="Mensaje recibido">
            <p className="text-sm leading-8 text-mist/82">
              {renderValue(client.mensaje)}
            </p>
          </DetailCard>

          <div id="historial-comercial" />
          <DetailCard eyebrow="Historial" title="Historial comercial">
            {presupuestos.length === 0 ? (
              <div className="rounded-[1.5rem] border border-white/8 bg-black/18 p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">
                  Sin presupuestos
                </p>
                <p className="mt-3 text-sm leading-7 text-mist/76">
                  Todavia no hay presupuestos asociados a este cliente.
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
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
          <DetailCard eyebrow="Acciones" title="Acciones rapidas">
            <LeadQuickActions
              leadId={client.id}
              status={client.estado}
              email={client.email}
              telefono={client.telefono}
              createPresupuestoHref={`/dashboard/presupuestos?leadId=${client.id}`}
              presupuestosHref="#historial-comercial"
              className="grid gap-3"
            />

            <div className="mt-3 grid gap-3">
              <ActionLink href={`mailto:${client.email}`} label="Enviar email" />
              {client.telefono ? (
                <ActionLink href={`tel:${client.telefono}`} label="Llamar" />
              ) : (
                <span className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-mist/44">
                  Llamada no disponible
                </span>
              )}
              <Link
                href="/dashboard/clientes"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
              >
                Volver a clientes
              </Link>
            </div>
          </DetailCard>

          <DetailCard eyebrow="Relacion" title="Resumen del cliente">
            <div className="grid gap-5">
              <DetailItem label="Estado confirmado" value={client.estado.replaceAll("_", " ")} />
              <DetailItem label="Tipo de sesion" value={client.tipo_sesion} />
              <DetailItem label="Fecha del evento" value={formatDate(client.fecha_evento)} />
              <DetailItem label="Ubicacion" value={renderValue(client.ubicacion)} />
            </div>
          </DetailCard>
        </div>
      </div>
    </div>
  );
}
