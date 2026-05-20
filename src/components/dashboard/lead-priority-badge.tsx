const priorityLabels: Record<string, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};

function getPriorityClassName(priority: string) {
  switch (priority) {
    case "alta":
      return "border-[#6a4545]/60 bg-[#221616] text-[#efc4c4]";
    case "baja":
      return "border-[#3e5668]/60 bg-[#151d23] text-[#c6dfec]";
    default:
      return "border-white/10 bg-white/[0.04] text-mist";
  }
}

type LeadPriorityBadgeProps = {
  priority: string;
};

export function LeadPriorityBadge({ priority }: LeadPriorityBadgeProps) {
  return (
    <span
      className={`inline-flex rounded-full border px-3 py-1 text-[0.68rem] uppercase tracking-[0.22em] ${getPriorityClassName(
        priority,
      )}`}
    >
      {priorityLabels[priority] ?? priority}
    </span>
  );
}
