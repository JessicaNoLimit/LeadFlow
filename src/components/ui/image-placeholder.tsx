type ImagePlaceholderProps = {
  label: string;
  aspect?: "portrait" | "landscape" | "square";
  className?: string;
};

const aspectMap = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
};

export function ImagePlaceholder({
  label,
  aspect = "portrait",
  className = "",
}: ImagePlaceholderProps) {
  return (
    <div
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.02))] ${aspectMap[aspect]} ${className}`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(215,198,168,0.18),transparent_36%)]" />
      <div className="absolute inset-5 rounded-[1.5rem] border border-dashed border-white/12" />
      <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/55 to-transparent" />
      <div className="absolute left-6 top-6 text-[0.65rem] uppercase tracking-[0.28em] text-mist/70">
        Future Photography
      </div>
      <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between gap-4">
        <div>
          <p className="font-heading text-2xl text-ivory">{label}</p>
          <p className="mt-2 max-w-[16rem] text-sm leading-6 text-mist/70">
            Placeholder premium listo para sustituirse por una imagen final.
          </p>
        </div>
        <div className="h-11 w-11 rounded-full border border-white/10 bg-white/6" />
      </div>
    </div>
  );
}
