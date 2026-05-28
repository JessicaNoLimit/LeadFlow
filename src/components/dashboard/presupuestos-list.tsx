import Link from "next/link";
import { PresupuestoStatusBadge } from "@/components/dashboard/presupuesto-status-badge";
import { formatCurrencyEs } from "@/lib/pricing";
import type { Database } from "@/lib/supabase/types";

type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];
type Lead = Database["public"]["Tables"]["leads"]["Row"];

type PresupuestosListProps = {
  presupuestos: Presupuesto[];
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

export function PresupuestosList({
  presupuestos,
  leads,
}: PresupuestosListProps) {
  const leadMap = new Map(leads.map((lead) => [lead.id, lead]));

  if (presupuestos.length === 0) {
    return (
      <section className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 shadow-[0_24px_70px_rgba(0,0,0,0.2)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Presupuestos
        </p>
        <h2 className="mt-4 font-heading text-3xl text-ivory">
          Aun no hay presupuestos registrados.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
          Crea el primer presupuesto manual desde el formulario para empezar a
          organizar propuestas comerciales dentro del CRM.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.025))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Listado
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Presupuestos creados
          </h2>
        </div>
        <p className="text-sm leading-7 text-mist/72">
          {presupuestos.length} presupuesto{presupuestos.length === 1 ? "" : "s"}{" "}
          registrado{presupuestos.length === 1 ? "" : "s"} en Supabase.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {presupuestos.map((presupuesto) => {
          const linkedLead = presupuesto.lead_id
            ? leadMap.get(presupuesto.lead_id) ?? null
            : null;
          const clientName =
            linkedLead?.nombre ?? presupuesto.cliente_nombre ?? "Cliente manual";
          const clientEmail =
            linkedLead?.email ?? presupuesto.cliente_email ?? "Email no indicado";

          return (
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
                    {presupuesto.descripcion ?? "Sin descripcion adicional."}
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <PresupuestoStatusBadge status={presupuesto.estado} />
                  <span
                    title="Importe final con IVA incluido al 21%."
                    className="rounded-full border border-white/10 bg-white/[0.04] px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] text-ivory"
                  >
                    {formatCurrencyEs(presupuesto.importe)}
                    <span className="ml-2 text-mist/54">IVA incluido</span>
                  </span>
                </div>
              </div>

              <div className="mt-5 grid gap-4 border-t border-white/8 pt-5 sm:grid-cols-3">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Cliente
                  </p>
                  {linkedLead ? (
                    <Link
                      href={`/dashboard/leads/${linkedLead.id}`}
                      className="mt-2 inline-flex text-sm text-sand transition hover:text-ivory"
                    >
                      {clientName}
                    </Link>
                  ) : (
                    <div className="mt-2 grid gap-1">
                      <p className="text-sm text-ivory">{clientName}</p>
                      <p className="text-sm text-mist/72">{clientEmail}</p>
                    </div>
                  )}
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Email
                  </p>
                  <p className="mt-2 text-sm text-ivory">
                    {clientEmail}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/58">
                    Fecha de creacion
                  </p>
                  <p className="mt-2 text-sm text-ivory">
                    {formatDate(presupuesto.created_at)}
                  </p>
                </div>
              </div>

              <div className="mt-5 border-t border-white/8 pt-5">
                <Link
                  href={`/dashboard/presupuestos/${presupuesto.id}`}
                  className="inline-flex items-center text-sm uppercase tracking-[0.22em] text-sand transition hover:text-ivory focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45"
                >
                  Abrir ficha comercial
                </Link>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
