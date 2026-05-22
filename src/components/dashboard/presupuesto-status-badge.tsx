import { presupuestoStatuses } from "@/lib/presupuestos";

type PresupuestoStatusBadgeProps = {
  status: string;
};

const badgeStyles: Record<(typeof presupuestoStatuses)[number], string> = {
  borrador: "border-white/10 bg-white/[0.05] text-mist",
  enviado: "border-sand/20 bg-sand/[0.08] text-sand",
  aceptado: "border-[#4b6b57]/30 bg-[#102317]/75 text-[#cde7d2]",
  rechazado: "border-[#8f5959]/25 bg-[#241515]/70 text-[#f3d1d1]",
};

const statusLabels: Record<(typeof presupuestoStatuses)[number], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
};

export function PresupuestoStatusBadge({
  status,
}: PresupuestoStatusBadgeProps) {
  const normalizedStatus = presupuestoStatuses.includes(
    status as (typeof presupuestoStatuses)[number],
  )
    ? (status as (typeof presupuestoStatuses)[number])
    : "borrador";

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${badgeStyles[normalizedStatus]}`}
    >
      {statusLabels[normalizedStatus]}
    </span>
  );
}
