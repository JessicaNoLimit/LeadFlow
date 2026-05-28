import Link from "next/link";
import { notFound } from "next/navigation";
import { PresupuestoDetailForm } from "@/components/dashboard/presupuesto-detail-form";
import { PresupuestoStatusBadge } from "@/components/dashboard/presupuesto-status-badge";
import { PrintBudgetButton } from "@/components/dashboard/print-budget-button";
import { calculateIncludedVat, formatCurrencyEs } from "@/lib/pricing";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];
type Lead = Database["public"]["Tables"]["leads"]["Row"];

type PresupuestoDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const dateTimeFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
});

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

function formatDateTime(value: string | null) {
  if (!value) {
    return "No indicado";
  }

  return dateTimeFormatter.format(new Date(value));
}

function formatDate(value: string | null) {
  if (!value) {
    return "No indicado";
  }

  return dateFormatter.format(new Date(value));
}

function renderValue(value: string | null) {
  return value && value.trim().length > 0 ? value : "No indicado";
}

async function getPresupuestoById(id: string) {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("presupuestos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load presupuesto detail", error);
    throw new Error("No se pudo cargar el presupuesto");
  }

  return data;
}

async function getLeadById(id: string | null) {
  if (!id) {
    return null;
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error("Failed to load linked lead", error);
    throw new Error("No se pudo cargar el lead vinculado");
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

function PriceBreakdown({
  base,
  iva,
  total,
}: Readonly<{
  base: number;
  iva: number;
  total: number;
}>) {
  return (
    <div className="rounded-2xl border border-sand/16 bg-sand/[0.06] p-5">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">
        Importe final
      </p>
      <div className="mt-4 grid gap-3">
        <div className="flex items-center justify-between gap-4 text-sm leading-7 text-mist/78">
          <span>Base imponible</span>
          <span className="text-ivory">{formatCurrencyEs(base)}</span>
        </div>
        <div className="flex items-center justify-between gap-4 text-sm leading-7 text-mist/78">
          <span>IVA incluido (21%)</span>
          <span className="text-ivory">{formatCurrencyEs(iva)}</span>
        </div>
        <div className="border-t border-white/8 pt-4">
          <div className="flex items-end justify-between gap-4">
            <span className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
              Total
            </span>
            <span className="font-heading text-3xl text-ivory">
              {formatCurrencyEs(total)}
            </span>
          </div>
          <p className="mt-2 text-xs leading-6 text-mist/60">
            Importe final con IVA incluido.
          </p>
        </div>
      </div>
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

export default async function PresupuestoDetailPage({
  params,
}: PresupuestoDetailPageProps) {
  const { id } = await params;
  const presupuesto = await getPresupuestoById(id);

  if (!presupuesto) {
    notFound();
  }

  const linkedLead = (await getLeadById(presupuesto.lead_id)) as Lead | null;
  const clienteRelacionado =
    linkedLead?.nombre ?? presupuesto.cliente_nombre ?? "No indicado";
  const emailRelacionado =
    linkedLead?.email ?? presupuesto.cliente_email ?? "No indicado";
  const telefonoRelacionado =
    linkedLead?.telefono ?? presupuesto.cliente_telefono ?? "No indicado";
  const leadStatus = linkedLead?.estado?.replaceAll("_", " ") ?? "No indicado";
  const canSendEmail = Boolean(linkedLead?.email || presupuesto.cliente_email);
  const sendHint = canSendEmail
    ? undefined
    : "Vincula este presupuesto a un lead con email o indica un cliente manual para enviarlo.";
  const fechaSesion = presupuesto.fecha_evento ? formatDate(presupuesto.fecha_evento) : null;
  const pricing = calculateIncludedVat(presupuesto.importe);

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Ficha del presupuesto
            </p>
            <h1 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
              {presupuesto.titulo}
            </h1>
            <p className="mt-4 max-w-3xl text-base leading-8 text-mist sm:text-lg">
              Vista comercial preparada para revisar importe, contexto del cliente y
              siguiente accion sobre la propuesta.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                href="/dashboard/presupuestos"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 print:hidden"
              >
                Volver a presupuestos
              </Link>
              {linkedLead ? (
                <Link
                  href={`/dashboard/leads/${linkedLead.id}`}
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/20 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/40 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 print:hidden"
                >
                  Abrir lead
                </Link>
              ) : null}
              <div className="print:hidden">
                <PrintBudgetButton />
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <PresupuestoStatusBadge status={presupuesto.estado} />
            <span className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-[0.72rem] uppercase tracking-[0.22em] text-ivory">
              {formatCurrencyEs(pricing.total)}
            </span>
          </div>
        </div>
      </section>

      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.2fr)_380px]">
        <div className="print-budget-content grid gap-6">
          <DetailCard eyebrow="Propuesta comercial" title="Presentacion para cliente">
            <div className="rounded-[1.7rem] border border-sand/16 bg-[linear-gradient(180deg,rgba(215,198,168,0.08),rgba(255,255,255,0.02))] p-6">
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
                Lorenzo Bellucci Studio
              </p>
              <h2 className="mt-4 font-heading text-4xl text-ivory">
                {presupuesto.titulo}
              </h2>
              <p className="mt-4 max-w-3xl text-sm leading-8 text-mist/82">
                {renderValue(presupuesto.descripcion)}
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                    Cliente
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ivory">
                    {clienteRelacionado}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                    Email
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ivory">
                    {emailRelacionado}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                    Telefono
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ivory">
                    {telefonoRelacionado}
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                    Total propuesta
                  </p>
                  <p className="mt-2 font-heading text-3xl text-ivory">
                    {formatCurrencyEs(pricing.total)}
                  </p>
                  <p className="mt-1 text-xs leading-6 text-mist/60">
                    IVA incluido al 21%.
                  </p>
                </div>
                <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                    Fecha de creacion
                  </p>
                  <p className="mt-2 text-sm leading-7 text-ivory">
                    {formatDateTime(presupuesto.created_at)}
                  </p>
                </div>
                {fechaSesion ? (
                  <div className="rounded-2xl border border-white/8 bg-black/18 p-4">
                    <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                      Fecha prevista de sesion
                    </p>
                    <p className="mt-2 text-sm leading-7 text-ivory">{fechaSesion}</p>
                  </div>
                ) : null}
              </div>

              <div className="mt-6">
                <PriceBreakdown {...pricing} />
              </div>

              <div className="mt-6 rounded-[1.5rem] border border-white/8 bg-black/18 p-5">
                <p className="text-[0.68rem] uppercase tracking-[0.24em] text-sand">
                  Condiciones basicas
                </p>
                <div className="mt-4 grid gap-3">
                  <p className="text-sm leading-7 text-mist/82">
                    Presupuesto orientativo sujeto a confirmacion final.
                  </p>
                  <p className="text-sm leading-7 text-mist/82">
                    Validez de la propuesta: 15 dias.
                  </p>
                  <p className="text-sm leading-7 text-mist/82">
                    La reserva queda confirmada tras aceptacion y contacto directo con el estudio.
                  </p>
                </div>
              </div>

              <div className="mt-6 border-t border-white/8 pt-6">
                <p className="text-sm leading-7 text-mist/82">
                  Lorenzo Bellucci Studio
                </p>
              </div>
            </div>
          </DetailCard>

          <DetailCard eyebrow="Propuesta" title="Resumen comercial">
            <div className="grid gap-5 sm:grid-cols-2">
              <DetailItem label="Titulo" value={presupuesto.titulo} />
              <DetailItem
                label="Estado actual"
                value={presupuesto.estado.replaceAll("_", " ")}
              />
              <DetailItem label="Total" value={formatCurrencyEs(pricing.total)} />
              <DetailItem
                label="Fecha de creacion"
                value={formatDateTime(presupuesto.created_at)}
              />
              {fechaSesion ? (
                <DetailItem
                  label="Fecha prevista de sesion"
                  value={fechaSesion}
                />
              ) : null}
              <DetailItem
                label="Ultima actualizacion"
                value={formatDateTime(presupuesto.updated_at)}
              />
              <div className="sm:col-span-2">
                <PriceBreakdown {...pricing} />
              </div>
            </div>
          </DetailCard>

          <DetailCard eyebrow="Contenido" title="Descripcion de la propuesta">
            <p className="text-sm leading-8 text-mist/82">
              {renderValue(presupuesto.descripcion)}
            </p>
          </DetailCard>

          <DetailCard eyebrow="Relacion comercial" title="Lead y cliente vinculados">
            <div className="grid gap-5 sm:grid-cols-2">
              <div>
                <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
                  Lead vinculado
                </p>
                {linkedLead ? (
                  <Link
                    href={`/dashboard/leads/${linkedLead.id}`}
                    className="mt-2 inline-flex text-sm leading-7 text-sand transition hover:text-ivory"
                  >
                    {linkedLead.nombre}
                  </Link>
                ) : (
                  <p className="mt-2 text-sm leading-7 text-ivory">No indicado</p>
                )}
              </div>
              <DetailItem label="Cliente relacionado" value={clienteRelacionado} />
              <DetailItem label="Email relacionado" value={emailRelacionado} />
              <DetailItem label="Telefono relacionado" value={telefonoRelacionado} />
            </div>
          </DetailCard>

          <DetailCard eyebrow="Pipeline" title={linkedLead ? "Lead vinculado" : "Cliente manual"}>
            {linkedLead ? (
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem label="Nombre del lead" value={linkedLead.nombre} />
                <DetailItem label="Estado actual del lead" value={leadStatus} />
                <div className="sm:col-span-2">
                  <div className="flex flex-wrap gap-3">
                    <Link
                      href={`/dashboard/leads/${linkedLead.id}`}
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/20 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/40 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                    >
                      Abrir lead
                    </Link>
                    <Link
                      href="/dashboard/presupuestos"
                      className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                    >
                      Volver a presupuestos
                    </Link>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-5 sm:grid-cols-2">
                <DetailItem label="Nombre del cliente" value={clienteRelacionado} />
                <DetailItem label="Email del cliente" value={emailRelacionado} />
                <DetailItem label="Telefono del cliente" value={telefonoRelacionado} />
              </div>
            )}
          </DetailCard>
        </div>

        <div className="grid gap-6 print:hidden">
          <DetailCard eyebrow="Acciones" title="Atajos rapidos">
            <div className="grid gap-3">
              {emailRelacionado !== "No indicado" ? (
                <QuickActionLink
                  href={`mailto:${emailRelacionado}`}
                  label="Contactar por email"
                />
              ) : (
                <span className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/8 bg-white/[0.02] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-mist/44">
                  Email no disponible
                </span>
              )}
              <Link
                href="/dashboard/presupuestos"
                className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
              >
                Volver a presupuestos
              </Link>
              {linkedLead ? (
                <Link
                  href={`/dashboard/leads/${linkedLead.id}`}
                  className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                >
                  Ver lead relacionado
                </Link>
              ) : null}
            </div>
          </DetailCard>

          <PresupuestoDetailForm
            presupuesto={presupuesto as Presupuesto}
            canSendEmail={canSendEmail}
            sendHint={sendHint}
          />
        </div>
      </div>
    </div>
  );
}
