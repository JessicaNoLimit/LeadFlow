import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { LeadManagementForm } from "@/components/dashboard/lead-management-form";
import { fetchDashboardLead } from "@/lib/dashboard";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";

type LeadDetailPageProps = {
  params: Promise<{
    id: string;
  }>;
};

const dateFormatter = new Intl.DateTimeFormat("es-ES", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});

export default async function LeadDetailPage({ params }: LeadDetailPageProps) {
  const { id } = await params;
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  let lead;

  try {
    lead = await fetchDashboardLead(id);
  } catch (error) {
    if ((error as Error & { status?: number }).status === 404) {
      notFound();
    }

    throw error;
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_380px]">
      <section className="rounded-[1.8rem] border border-white/10 bg-white/[0.03] p-6 sm:p-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Lead
            </p>
            <h2 className="mt-3 font-heading text-4xl text-ivory">{lead.nombre}</h2>
          </div>

          <Link
            href="/dashboard"
            className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand hover:text-sand"
          >
            Volver al dashboard
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2">
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Email
            </p>
            <p className="mt-2 text-base text-ivory">{lead.email}</p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Telefono
            </p>
            <p className="mt-2 text-base text-ivory">{lead.telefono || "No indicado"}</p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Tipo de sesion
            </p>
            <p className="mt-2 text-base text-ivory">{lead.tipo_sesion}</p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Fecha del evento
            </p>
            <p className="mt-2 text-base text-ivory">
              {lead.fecha_evento
                ? dateFormatter.format(new Date(lead.fecha_evento))
                : "No indicada"}
            </p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Ubicacion
            </p>
            <p className="mt-2 text-base text-ivory">{lead.ubicacion || "No indicada"}</p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Presupuesto
            </p>
            <p className="mt-2 text-base text-ivory">{lead.presupuesto || "No indicado"}</p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Estado actual
            </p>
            <p className="mt-2 text-base uppercase tracking-[0.18em] text-ivory">
              {lead.estado.replaceAll("_", " ")}
            </p>
          </div>
          <div>
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Prioridad
            </p>
            <p className="mt-2 text-base uppercase tracking-[0.18em] text-ivory">
              {lead.prioridad}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Mensaje del cliente
            </p>
            <p className="mt-2 whitespace-pre-wrap text-base leading-8 text-ivory">
              {lead.mensaje || "No ha dejado mensaje adicional."}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Notas internas actuales
            </p>
            <p className="mt-2 whitespace-pre-wrap text-base leading-8 text-ivory">
              {lead.notas_internas || "Todavia no hay notas internas."}
            </p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/62">
              Fecha de creacion
            </p>
            <p className="mt-2 text-base text-ivory">
              {dateFormatter.format(new Date(lead.created_at))}
            </p>
          </div>
        </div>
      </section>

      <aside className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 sm:p-8">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Gestion del lead
        </p>
        <h3 className="mt-3 font-heading text-3xl text-ivory">
          Actualizar seguimiento
        </h3>
        <p className="mt-4 text-sm leading-7 text-mist/76">
          Ajusta el estado comercial, la prioridad y las notas internas del lead.
        </p>

        <div className="mt-8">
          <LeadManagementForm
            leadId={lead.id}
            initialEstado={lead.estado}
            initialPrioridad={lead.prioridad}
            initialNotasInternas={lead.notas_internas}
          />
        </div>
      </aside>
    </div>
  );
}
