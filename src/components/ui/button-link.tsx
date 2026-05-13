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
    "inline-flex items-center justify-center rounded-full border px-6 py-3 text-sm tracking-[0.18em] uppercase transition duration-300";

  const variantClassName =
    variant === "solid"
      ? "border-sand bg-sand text-ink hover:bg-transparent hover:text-sand"
      : "border-white/14 bg-white/4 text-ivory hover:border-white/28 hover:bg-white/8";

  return (
    <Link href={href} className={`${baseClassName} ${variantClassName}`}>
      {label}
    </Link>
  );
}
