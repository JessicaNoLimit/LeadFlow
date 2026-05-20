type MetricCardProps = {
  label: string;
  value: string | number;
  description: string;
  badge?: string;
  accent?: "sand" | "blue" | "green" | "rose";
};

const accentClassNames = {
  sand: {
    border: "group-hover:border-sand/18",
    badge: "border-sand/18 bg-sand/[0.08] text-sand",
    glow: "bg-[radial-gradient(circle_at_top,rgba(215,198,168,0.16),transparent_58%)]",
  },
  blue: {
    border: "group-hover:border-[#678aa6]/18",
    badge: "border-[#678aa6]/18 bg-[#678aa6]/[0.10] text-[#c6dfec]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(103,138,166,0.18),transparent_58%)]",
  },
  green: {
    border: "group-hover:border-[#64866f]/18",
    badge: "border-[#64866f]/18 bg-[#64866f]/[0.10] text-[#cde7d2]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(100,134,111,0.18),transparent_58%)]",
  },
  rose: {
    border: "group-hover:border-[#966a6a]/18",
    badge: "border-[#966a6a]/18 bg-[#966a6a]/[0.10] text-[#efc4c4]",
    glow: "bg-[radial-gradient(circle_at_top,rgba(150,106,106,0.18),transparent_58%)]",
  },
} as const;

export function MetricCard({
  label,
  value,
  description,
  badge,
  accent = "sand",
}: MetricCardProps) {
  const accentClasses = accentClassNames[accent];

  return (
    <article
      className={`group relative overflow-hidden rounded-[1.7rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] p-5 shadow-[0_20px_48px_rgba(0,0,0,0.18)] transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_24px_58px_rgba(0,0,0,0.24)] ${accentClasses.border}`}
    >
      <div className={`pointer-events-none absolute inset-0 opacity-0 transition duration-300 group-hover:opacity-100 ${accentClasses.glow}`} />
      <div className="relative flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-mist/62">
            {label}
          </p>
          <p className="mt-4 font-heading text-4xl text-ivory sm:text-[2.6rem]">
            {value}
          </p>
        </div>

        {badge ? (
          <span
            className={`rounded-full border px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.22em] ${accentClasses.badge}`}
          >
            {badge}
          </span>
        ) : null}
      </div>

      <p className="relative mt-4 max-w-[20rem] text-sm leading-7 text-mist/74">
        {description}
      </p>
    </article>
  );
}
