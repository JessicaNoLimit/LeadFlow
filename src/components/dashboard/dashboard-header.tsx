import Image from "next/image";
import { LogoutButton } from "@/components/auth/logout-button";

type DashboardHeaderProps = {
  userEmail?: string;
};

export function DashboardHeader({ userEmail }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[#0d0d0d]/92 backdrop-blur-xl">
      <div className="mx-auto flex min-h-20 w-full max-w-[1600px] items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16">
            <div className="relative h-10 w-10 sm:h-12 sm:w-12">
              <Image
                src="/images/brand/leadflow-logo.png"
                alt="LeadFlow CRM"
                fill
                priority
                sizes="(max-width: 640px) 40px, 48px"
                className="object-contain"
              />
            </div>
          </div>
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
              <p className="font-heading text-xl text-ivory sm:text-2xl">LeadFlow CRM</p>
              <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-mist/70">
                Private
              </span>
            </div>
            <p className="max-w-[14rem] text-[0.62rem] uppercase tracking-[0.2em] text-mist/58 sm:max-w-none sm:text-[0.68rem] sm:tracking-[0.22em]">
              Panel de gestión de leads y presupuestos
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden text-right md:block">
            <p className="text-[0.62rem] uppercase tracking-[0.26em] text-mist/58">
              Usuario autenticado
            </p>
            <p className="mt-1 max-w-[20rem] truncate text-sm text-ivory/90">
              {userEmail ?? "Sin email"}
            </p>
          </div>
          <LogoutButton />
        </div>
      </div>
    </header>
  );
}
