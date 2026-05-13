import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type DashboardLeadsListProps = {
  leads: Lead[];
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "short",
  year: "numeric",
});

function getStatusClassName(status: string) {
  switch (status) {
    case "aceptado":
      return "border-[#31553b] bg-[#142219] text-[#cde7d2]";
    case "rechazado":
      return "border-[#5a2f2f] bg-[#241515] text-[#efc4c4]";
    case "presupuesto_enviado":
      return "border-[#5f4a26] bg-[#241d13] text-[#f0dfbc]";
    case "contactado":
      return "border-[#2f4a5b] bg-[#131d24] text-[#c6dfec]";
    default:
      return "border-white/10 bg-white/[0.05] text-mist";
  }
}

function getPriorityClassName(priority: string) {
  switch (priority) {
    case "alta":
      return "text-[#efc4c4]";
    case "baja":
      return "text-[#c6dfec]";
    default:
      return "text-mist";
  }
}

export function DashboardLeadsList({ leads }: DashboardLeadsListProps) {
  if (leads.length === 0) {
    return (
      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-8">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Leads
        </p>
        <h2 className="mt-4 font-heading text-3xl text-ivory">
          Todavia no hay solicitudes registradas.
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/76">
          Cuando entren nuevas solicitudes desde la web publica, apareceran aqui
          ordenadas por fecha de creacion.
        </p>
      </section>
    );
  }

  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Leads
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Solicitudes recibidas
          </h2>
        </div>
        <p className="text-sm leading-7 text-mist/72">
          Listado real consumido desde la API interna de LeadFlow.
        </p>
      </div>

      <div className="mt-8 grid gap-4">
        {leads.map((lead) => (
          <article
            key={lead.id}
            className="rounded-[1.5rem] border border-white/10 bg-black/18 p-5"
          >
            <div className="flex flex-col gap-4 xl:flex-row xl:items-start xl:justify-between">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-3">
                  <h3 className="font-heading text-2xl text-ivory">{lead.nombre}</h3>
                  <span
                    className={`rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] ${getStatusClassName(
                      lead.estado,
                    )}`}
                  >
                    {lead.estado.replaceAll("_", " ")}
                  </span>
                </div>
                <div className="mt-3 flex flex-wrap gap-x-6 gap-y-2 text-sm text-mist/80">
                  <p>{lead.email}</p>
                  <p>{lead.telefono || "Sin telefono"}</p>
                  <p>{lead.tipo_sesion}</p>
                </div>
              </div>

              <div className="grid gap-3 text-sm sm:grid-cols-3 xl:min-w-[26rem]">
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
                    Presupuesto
                  </p>
                  <p className="mt-1 text-ivory">{lead.presupuesto || "No indicado"}</p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
                    Prioridad
                  </p>
                  <p className={`mt-1 uppercase tracking-[0.18em] ${getPriorityClassName(lead.prioridad)}`}>
                    {lead.prioridad}
                  </p>
                </div>
                <div>
                  <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
                    Creado
                  </p>
                  <p className="mt-1 text-ivory">
                    {dateFormatter.format(new Date(lead.created_at))}
                  </p>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
