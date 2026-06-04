import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/container";
import { navigationItems } from "@/lib/navigation";

export function SiteHeader() {
  return (
    <header className="relative z-20 border-b border-white/8">
      <Container className="flex min-h-20 items-center justify-between gap-3 px-4 sm:gap-6 sm:px-10 lg:px-16">
        <Link href="/" className="flex items-center">
          <div className="relative h-12 w-36 sm:h-14 sm:w-[13rem]">
            <Image
              src="/images/brand/bellucci-logo.png"
              alt="Lorenzo Bellucci Studio"
              fill
              priority
              sizes="(max-width: 640px) 144px, 208px"
              className="object-contain object-left"
            />
          </div>
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
          className="inline-flex min-h-11 shrink-0 items-center justify-center rounded-full border border-sand/60 bg-sand/[0.1] px-3 py-2.5 text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-ivory shadow-[0_10px_28px_rgba(215,198,168,0.09)] transition-all duration-700 ease-out hover:border-sand/90 hover:bg-sand/15 hover:text-sand hover:shadow-[0_0_24px_rgba(215,198,168,0.16)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 sm:px-6 sm:text-[0.7rem] sm:tracking-[0.22em]"
        >
          <span className="sm:hidden">Propuesta</span>
          <span className="hidden sm:inline">Solicitar propuesta</span>
        </Link>
      </Container>
    </header>
  );
}
