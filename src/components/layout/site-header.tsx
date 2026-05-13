import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigationItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-white/8">
      <Container className="flex min-h-20 items-center justify-between gap-6">
        <Link href="/" className="flex flex-col">
          <span className="font-heading text-2xl tracking-[0.08em] text-ivory">
            Lorenzo Bellucci
          </span>
          <span className="text-[0.65rem] uppercase tracking-[0.34em] text-mist/72">
            Studio
          </span>
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="text-sm tracking-[0.18em] text-mist transition hover:text-ivory"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <Link
          href="/contacto"
          className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand hover:text-sand"
        >
          Solicitar propuesta
        </Link>
      </Container>
    </header>
  );
}
