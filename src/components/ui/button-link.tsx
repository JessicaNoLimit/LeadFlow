import Link from "next/link";

type ButtonLinkProps = {
  href: string;
  label: string;
  variant?: "solid" | "ghost";
};

export function ButtonLink({
  href,
  label,
  variant = "solid",
}: ButtonLinkProps) {
  const baseClassName =
    "inline-flex min-h-14 items-center justify-center rounded-full border px-9 py-4 text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-700 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 sm:px-10";

  const variantClassName =
    variant === "solid"
      ? "border-[#d9c391]/80 bg-[#cdb27a] text-[#080706] shadow-[0_14px_36px_rgba(215,198,168,0.13)] hover:border-[#ead7aa] hover:bg-[#d8bf89] hover:text-[#050403] hover:shadow-[0_0_30px_rgba(215,198,168,0.2)]"
      : "border-white/18 bg-white/[0.045] text-ivory shadow-[0_12px_32px_rgba(0,0,0,0.16)] hover:border-sand/42 hover:bg-white/[0.075] hover:text-sand hover:shadow-[0_0_24px_rgba(215,198,168,0.12)]";

  return (
    <Link href={href} className={`${baseClassName} ${variantClassName}`}>
      {label}
    </Link>
  );
}
