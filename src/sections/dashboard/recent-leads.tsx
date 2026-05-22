import Link from "next/link";
import { LeadPriorityBadge } from "@/components/dashboard/lead-priority-badge";
import { LeadStatusBadge } from "@/components/dashboard/lead-status-badge";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type RecentLeadsProps = {
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

export function RecentLeads({ leads }: RecentLeadsProps) {
  const recentLeads = [...leads]
    .sort(
      (firstLead, secondLead) =>
        new Date(secondLead.created_at).getTime() -
        new Date(firstLead.created_at).getTime(),
    )
    .slice(0, 4);

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Leads recientes
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Ultimas solicitudes incorporadas al CRM.
          </h2>
        </div>
        <Link
          href="/dashboard/leads"
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/24 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:bg-sand/[0.12] hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
        >
          Ver todos los leads
        </Link>
      </div>

      {recentLeads.length === 0 ? (
        <div className="mt-8 rounded-[1.6rem] border border-white/8 bg-black/18 p-8">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sand">
            Sin actividad
          </p>
          <h3 className="mt-4 font-heading text-3xl text-ivory">
            Aun no hay leads para mostrar.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
            Cuando entren nuevas solicitudes desde la web publica apareceran aqui
            como acceso rapido para revision inmediata.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {recentLeads.map((lead) => (
            <Link
              key={lead.id}
              href={`/dashboard/leads/${lead.id}`}
              className="group rounded-[1.5rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)] transition duration-200 hover:-translate-y-0.5 hover:border-sand/18 hover:bg-black/22 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
            >
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div className="min-w-0">
                  <p className="truncate font-heading text-2xl text-ivory transition group-hover:text-sand">
                    {lead.nombre}
                  </p>
                  <p className="mt-2 truncate text-sm text-mist/80">{lead.email}</p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <LeadStatusBadge status={lead.estado} />
                  <LeadPriorityBadge priority={lead.prioridad} />
                  <span className="text-sm text-mist/72">
                    {formatDate(lead.created_at)}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </section>
  );
}
