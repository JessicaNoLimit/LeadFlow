import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type DashboardSummaryProps = {
  leads: Lead[];
};

const summaryItems = [
  { label: "Total de leads", key: "total" },
  { label: "Nuevos", key: "nuevo" },
  { label: "Contactados", key: "contactado" },
  { label: "Presupuestos enviados", key: "presupuesto_enviado" },
  { label: "Aceptados", key: "aceptado" },
  { label: "Rechazados", key: "rechazado" },
] as const;

export function DashboardSummary({ leads }: DashboardSummaryProps) {
  const counters = {
    total: leads.length,
    nuevo: leads.filter((lead) => lead.estado === "nuevo").length,
    contactado: leads.filter((lead) => lead.estado === "contactado").length,
    presupuesto_enviado: leads.filter(
      (lead) => lead.estado === "presupuesto_enviado",
    ).length,
    aceptado: leads.filter((lead) => lead.estado === "aceptado").length,
    rechazado: leads.filter((lead) => lead.estado === "rechazado").length,
  };

  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-6">
      {summaryItems.map((item) => (
        <article
          key={item.key}
          className="rounded-[1.6rem] border border-white/10 bg-black/18 p-5"
        >
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-mist/72">
            {item.label}
          </p>
          <p className="mt-4 font-heading text-4xl text-ivory">
            {counters[item.key]}
          </p>
        </article>
      ))}
    </section>
  );
}
