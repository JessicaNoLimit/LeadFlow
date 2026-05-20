import Link from "next/link";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
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
] as const;

export function LeadsTable({ leads }: LeadsTableProps) {
  return (
    <>
      <div className="mt-8 hidden overflow-hidden rounded-[1.6rem] border border-white/8 xl:block">
        <div className="grid grid-cols-[1.2fr_1.35fr_1fr_0.95fr_0.8fr_0.75fr] gap-4 border-b border-white/8 bg-white/[0.03] px-6 py-4">
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
          {leads.map((lead) => (
            <Link
              key={lead.id}
              href={`/dashboard/leads/${lead.id}`}
              data-lead-id={lead.id}
              className="group grid grid-cols-[1.2fr_1.35fr_1fr_0.95fr_0.8fr_0.75fr] items-center gap-4 px-6 py-5 transition duration-200 hover:bg-white/[0.03] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-sand/45"
            >
              <div className="min-w-0">
                <p className="truncate font-heading text-xl text-ivory transition group-hover:text-sand">
                  {lead.nombre}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.18em] text-mist/46">
                  Preparado para vista detalle
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
            </Link>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-4 xl:hidden">
        {leads.map((lead) => (
          <Link
            key={lead.id}
            href={`/dashboard/leads/${lead.id}`}
            data-lead-id={lead.id}
            className="group rounded-[1.5rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
          >
            <div className="flex flex-col gap-4">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="min-w-0">
                  <h3 className="truncate font-heading text-2xl text-ivory transition group-hover:text-sand">
                    {lead.nombre}
                  </h3>
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
                    Registro listo para enlazar a detalle individual.
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
