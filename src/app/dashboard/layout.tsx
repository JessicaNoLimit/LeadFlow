import { ReactNode } from "react";
import Link from "next/link";
import { LogoutButton } from "@/components/auth/logout-button";
import { Container } from "@/components/ui/container";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <section className="py-12 sm:py-14 lg:py-16">
      <Container>
        <div className="rounded-[2.2rem] border border-white/10 bg-white/[0.035]">
          <div className="flex flex-col gap-5 border-b border-white/8 px-6 py-6 sm:px-8 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-sand">
                CRM privado
              </p>
              <h1 className="mt-3 font-heading text-3xl text-ivory">
                LeadFlow Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <Link
                href="/"
                className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand hover:text-sand"
              >
                Ver web
              </Link>
              <LogoutButton />
            </div>
          </div>

          <div className="px-6 py-8 sm:px-8 sm:py-10">{children}</div>
        </div>
      </Container>
    </section>
  );
}
