const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  presupuesto_enviado: "Presupuesto enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
  archivado: "Archivado",
};

function getStatusClassName(status: string) {
  switch (status) {
    case "aceptado":
      return "border-[#31553b]/70 bg-[#142219] text-[#cde7d2]";
    case "rechazado":
      return "border-[#5a2f2f]/70 bg-[#241515] text-[#efc4c4]";
    case "presupuesto_enviado":
      return "border-[#5f4a26]/70 bg-[#241d13] text-[#f0dfbc]";
    case "contactado":
      return "border-[#2f4a5b]/70 bg-[#131d24] text-[#c6dfec]";
    case "archivado":
      return "border-white/10 bg-[#161616] text-mist/82";
    default:
      return "border-white/10 bg-white/[0.05] text-mist";
  }
}

type LeadStatusBadgeProps = {
  status: string;
};

export function LeadStatusBadge({ status }: LeadStatusBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] ${getStatusClassName(
        status,
      )}`}
    >
      {statusLabels[status] ?? status.replaceAll("_", " ")}
    </span>
  );
}
