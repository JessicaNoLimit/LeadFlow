"use client";

import Link from "next/link";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadQuickActions } from "@/components/dashboard/lead-quick-actions";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadsTableProps = {
  leads: Lead[];
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function formatDate(value: string) {
  return dateFormatter.format(new Date(value));
}

const desktopColumns = [
  "Lead",
  "Email",
  "Sesion",
  "Estado",
  "Prioridad",
  "Creado",
  "Acciones",
] as const;

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <>
      <div className="mt-8 hidden overflow-hidden rounded-[1.6rem] border border-white/8 xl:block">
        <div className="grid grid-cols-[1.15fr_1.2fr_0.95fr_0.9fr_0.8fr_0.75fr_1.45fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
          {desktopColumns.map((column) => (
            <p
              key={column}
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/56"
            >
              {column}
            </p>
          ))}
        </div>

        <div className="divide-y divide-white/6">
          {leads.map((lead) => {
            const detailHref = `/dashboard/leads/${lead.id}`;
            const createPresupuestoHref = `/dashboard/presupuestos?leadId=${lead.id}`;

            return (
              <article
                key={lead.id}
                className="grid grid-cols-[1.15fr_1.2fr_0.95fr_0.9fr_0.8fr_0.75fr_1.45fr] items-center gap-4 px-6 py-5 transition duration-200 hover:bg-white/[0.03]"
              >
                <div className="min-w-0">
                  <Link
                    href={detailHref}
                    className="truncate font-heading text-xl text-ivory transition hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                  >
                    {lead.nombre}
                  </Link>
                  <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist/46">
                    Acceso directo a la ficha comercial
                  </p>
                </div>
                <p className="min-w-0 truncate text-sm text-mist/82">{lead.email}</p>
                <p className="min-w-0 truncate text-sm text-mist/82">{lead.tipo_sesion}</p>
                <div>
                  <LeadStatusBadge status={lead.estado} />
                </div>
                <div>
                  <LeadPriorityBadge priority={lead.prioridad} />
                </div>
                <p className="text-sm text-ivory">{formatDate(lead.created_at)}</p>
                <LeadQuickActions
                  leadId={lead.id}
                  status={lead.estado}
                  email={lead.email}
                  telefono={lead.telefono}
                  detailHref={detailHref}
                  createPresupuestoHref={createPresupuestoHref}
                  showCopyEmail={false}
                  showCopyTelefono={false}
                  markAsContactadoLabel="Contactado"
                  className="flex flex-wrap justify-end gap-2"
                />
              </article>
          )})}
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:hidden">
        {leads.map((lead) => (
          <article
            key={lead.id}
            className="group rounded-[1.5rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <Link
                    href={`/dashboard/leads/${lead.id}`}
                    className="truncate font-heading text-2xl text-ivory transition hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                  >
                    {lead.nombre}
                  </Link>
                  <p className="mt-2 text-sm text-mist/80">{lead.email}</p>
                </div>
                <LeadStatusBadge status={lead.estado} />
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Tipo de sesion
                  </p>
                  <p className="mt-1 text-sm text-ivory">{lead.tipo_sesion}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Prioridad
                  </p>
                  <div className="mt-2">
                    <LeadPriorityBadge priority={lead.prioridad} />
                  </div>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Creado
                  </p>
                  <p className="mt-1 text-sm text-ivory">{formatDate(lead.created_at)}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Estado del lead
                  </p>
                  <p className="mt-1 text-sm text-mist/72">
                    Operativa rapida para avanzar el siguiente paso comercial.
                  </p>
                </div>
              </div>

              <LeadQuickActions
                leadId={lead.id}
                status={lead.estado}
                email={lead.email}
                telefono={lead.telefono}
                detailHref={`/dashboard/leads/${lead.id}`}
                createPresupuestoHref={`/dashboard/presupuestos?leadId=${lead.id}`}
                showCopyEmail={false}
                showCopyTelefono={false}
                markAsContactadoLabel="Contactado"
                className="flex flex-wrap gap-2"
              />
            </div>
          </article>
        ))}
      </div>
    </>
  );
}
