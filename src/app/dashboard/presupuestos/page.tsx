import { PresupuestoCreateForm } from "@/components/dashboard/presupuesto-create-form";
import { PresupuestosList } from "@/components/dashboard/presupuestos-list";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

async function getPresupuestosPageData() {
  const supabase = createSupabaseServerClient();

  const [{ data: presupuestos, error: presupuestosError }, { data: leads, error: leadsError }] =
    await Promise.all([
      supabase
        .from("presupuestos")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("leads").select("*").order("created_at", { ascending: false }),
    ]);

  if (presupuestosError || leadsError) {
    throw new Error("No se pudo cargar el modulo de presupuestos.");
  }

  return {
    presupuestos: presupuestos as Presupuesto[],
    leads: leads as Lead[],
  };
}

function SummaryCard({
  label,
  value,
  description,
}: {
  label: string;
  value: string | number;
  description: string;
}) {
  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-black/18 p-5 shadow-[0_18px_40px_rgba(0,0,0,0.18)]">
      <p className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/56">
        {label}
      </p>
      <p className="mt-4 font-heading text-3xl text-ivory">{value}</p>
      <p className="mt-3 text-sm leading-7 text-mist/72">{description}</p>
    </article>
  );
}

type DashboardPresupuestosPageProps = {
  searchParams?: Promise<{
    leadId?: string;
  }>;
};

export default async function DashboardPresupuestosPage({
  searchParams,
}: DashboardPresupuestosPageProps) {
  const resolvedSearchParams = searchParams ? await searchParams : undefined;
  const initialLeadId = resolvedSearchParams?.leadId?.trim() || "";
  let presupuestos: Presupuesto[] | null = null;
  let leads: Lead[] | null = null;

  try {
    const pageData = await getPresupuestosPageData();
    presupuestos = pageData.presupuestos;
    leads = pageData.leads;
  } catch {
    presupuestos = null;
    leads = null;
  }

  if (!presupuestos || !leads) {
    return (
      <section className="rounded-[2rem] border border-[#5a2f2f] bg-[#241515]/95 p-8 shadow-[0_24px_70px_rgba(0,0,0,0.28)]">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-[#efc4c4]">
          Error de carga
        </p>
        <h1 className="mt-4 font-heading text-3xl text-ivory">
          No se pudo cargar el modulo de presupuestos.
        </h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-[#efc4c4]">
          Verifica la tabla de Supabase y vuelve a intentarlo en unos minutos.
        </p>
      </section>
    );
  }

  const acceptedCount = presupuestos.filter(
    (presupuesto) => presupuesto.estado === "aceptado",
  ).length;
  const sentCount = presupuestos.filter(
    (presupuesto) => presupuesto.estado === "enviado",
  ).length;
  const draftCount = presupuestos.filter(
    (presupuesto) => presupuesto.estado === "borrador",
  ).length;
  const totalAmount = presupuestos.reduce(
    (sum, presupuesto) => sum + presupuesto.importe,
    0,
  );

  const totalAmountLabel = new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(totalAmount);

  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Presupuestos
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
          Modulo operativo para crear y revisar propuestas comerciales.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
          Gestiona presupuestos vinculados a leads, revisa su estado comercial y
          mantén una lectura clara del volumen propuesto dentro del CRM.
        </p>
      </section>

      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <SummaryCard
          label="Total de presupuestos"
          value={presupuestos.length}
          description="Propuestas registradas en el CRM."
        />
        <SummaryCard
          label="Borradores"
          value={draftCount}
          description="Presupuestos pendientes de envio."
        />
        <SummaryCard
          label="Enviados y aceptados"
          value={sentCount + acceptedCount}
          description="Seguimiento comercial activo o ya cerrado."
        />
        <SummaryCard
          label="Importe acumulado"
          value={totalAmountLabel}
          description="Suma total de importes registrados."
        />
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        <PresupuestoCreateForm leads={leads} initialLeadId={initialLeadId} />
        <div className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Flujo minimo
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Registro manual y seguimiento inicial
          </h2>
          {initialLeadId ? (
            <div className="mt-4 rounded-2xl border border-sand/18 bg-sand/[0.06] px-4 py-3 text-sm leading-7 text-mist/82">
              Estas creando un presupuesto vinculado a este lead.
            </div>
          ) : null}
          <p className="mt-4 text-sm leading-7 text-mist/76">
            Este MVP permite crear presupuestos reales en Supabase, asignarlos a un
            lead de forma opcional y clasificarlos por estado sin introducir pasos
            extra como PDF, email o pagos.
          </p>
          <div className="mt-6 grid gap-3">
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-mist/78">
              Los presupuestos aparecen ordenados por fecha de creacion.
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-mist/78">
              El lead vinculado es opcional para no bloquear propuestas manuales.
            </div>
            <div className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-mist/78">
              El estado inicial recomendado es borrador y puede definirse al crear.
            </div>
          </div>
        </div>
      </section>

      <PresupuestosList presupuestos={presupuestos} leads={leads} />
    </div>
  );
}
