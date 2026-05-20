import type { Database } from "@/lib/supabase/types";
import { MetricCard } from "@/components/dashboard/metric-card";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type DashboardSummaryProps = {
  leads: Lead[];
};

const summaryItems = [
  {
    label: "Total de leads",
    key: "total",
    description: "Solicitudes registradas",
    badge: "Pipeline",
    accent: "sand",
  },
  {
    label: "Nuevos",
    key: "nuevo",
    description: "Pendientes de primera revision",
    badge: "Inicio",
    accent: "blue",
  },
  {
    label: "Contactados",
    key: "contactado",
    description: "Conversaciones iniciadas",
    badge: "Activos",
    accent: "blue",
  },
  {
    label: "Presupuestos enviados",
    key: "presupuesto_enviado",
    description: "Propuestas en seguimiento",
    badge: "Seguimiento",
    accent: "sand",
  },
  {
    label: "Aceptados",
    key: "aceptado",
    description: "Oportunidades ganadas",
    badge: "Ganados",
    accent: "green",
  },
  {
    label: "Rechazados",
    key: "rechazado",
    description: "Oportunidades cerradas",
    badge: "Cerrados",
    accent: "rose",
  },
  {
    label: "Leads este mes",
    key: "este_mes",
    description: "Entradas del mes actual",
    badge: "Actual",
    accent: "sand",
  },
  {
    label: "Conversion",
    key: "conversion",
    description: "Leads aceptados sobre el total",
    badge: "Ratio",
    accent: "green",
  },
] as const;

export function DashboardSummary({ leads }: DashboardSummaryProps) {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();

  const leadsThisMonth = leads.filter((lead) => {
    const createdAt = new Date(lead.created_at);

    return (
      createdAt.getMonth() === currentMonth &&
      createdAt.getFullYear() === currentYear
    );
  }).length;

  const counters = {
    total: leads.length,
    nuevo: leads.filter((lead) => lead.estado === "nuevo").length,
    contactado: leads.filter((lead) => lead.estado === "contactado").length,
    presupuesto_enviado: leads.filter(
      (lead) => lead.estado === "presupuesto_enviado",
    ).length,
    aceptado: leads.filter((lead) => lead.estado === "aceptado").length,
    rechazado: leads.filter((lead) => lead.estado === "rechazado").length,
    este_mes: leadsThisMonth,
    conversion:
      leads.length === 0
        ? "0%"
        : `${Math.round(
            (leads.filter((lead) => lead.estado === "aceptado").length /
              leads.length) *
              100,
          )}%`,
  };

  return (
    <section className="grid gap-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Resumen ejecutivo
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory sm:text-4xl">
            Estado actual del negocio en una sola vista.
          </h2>
        </div>
        <p className="max-w-xl text-sm leading-7 text-mist/72">
          Lectura rapida del pipeline comercial con volumen, seguimiento y
          conversion real calculada sobre los leads recibidos.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {summaryItems.map((item) => (
        <MetricCard
          key={item.key}
          label={item.label}
          value={counters[item.key]}
          description={item.description}
          badge={item.badge}
          accent={item.accent}
        />
      ))}
      </div>
    </section>
  );
}
