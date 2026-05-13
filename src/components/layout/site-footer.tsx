import Link from "next/link";
import { Container } from "@/components/ui/container";

export function SiteFooter() {
  return (
    <footer className="relative z-20 border-t border-white/8">
      <Container className="flex flex-col gap-8 py-10 md:flex-row md:items-end md:justify-between">
        <div className="max-w-md">
          <p className="font-heading text-2xl text-ivory">LeadFlow</p>
          <p className="mt-3 text-sm leading-7 text-mist/76">
            Base frontend editorial preparada para evolucionar hacia una web publica
            premium y un CRM privado de gestion de leads.
          </p>
        </div>

        <div className="text-sm leading-7 text-mist/70 md:text-right">
          <p>Lorenzo Bellucci Studio</p>
          <p>Milan · Destinos internacionales</p>
          <p className="mt-2">
            <Link href="/login" className="transition hover:text-ivory">
              CRM
            </Link>
          </p>
        </div>
      </Container>
    </footer>
  );
}
