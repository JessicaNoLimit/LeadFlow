import Link from "next/link";

const navigationItems = [
  { label: "Dashboard", href: "/dashboard", enabled: true },
  { label: "Leads", href: "#", enabled: false },
  { label: "Presupuestos", href: "#", enabled: false },
  { label: "Clientes", href: "#", enabled: false },
  { label: "Configuracion", href: "#", enabled: false },
] as const;

export function DashboardSidebar() {
  return (
    <aside className="rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.32)] lg:sticky lg:top-[6rem] lg:h-[calc(100vh-7.5rem)] lg:p-5">
      <div className="border-b border-white/8 px-2 pb-4">
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-sand">
          Navegacion CRM
        </p>
        <p className="mt-3 text-sm leading-7 text-mist/72">
          Espacio preparado para la operativa interna de LeadFlow.
        </p>
      </div>

      <nav className="mt-4 flex gap-3 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible">
        {navigationItems.map((item) =>
          item.enabled ? (
            <Link
              key={item.label}
              href={item.href}
              aria-current="page"
              className="group flex min-w-fit items-center justify-between gap-4 rounded-2xl border border-sand/20 bg-sand/[0.08] px-4 py-3 text-left transition hover:border-sand/40 hover:bg-sand/[0.12] lg:min-w-0"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-ivory">
                  {item.label}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-sand/70">
                  Vista activa
                </p>
              </div>
              <span className="text-sand transition group-hover:translate-x-0.5">
                /
              </span>
            </Link>
          ) : (
            <span
              key={item.label}
              aria-disabled="true"
              className="flex min-w-fit items-center justify-between gap-4 rounded-2xl border border-white/8 bg-white/[0.025] px-4 py-3 text-left opacity-72 lg:min-w-0"
            >
              <div>
                <p className="text-sm uppercase tracking-[0.18em] text-mist/92">
                  {item.label}
                </p>
                <p className="mt-1 text-xs uppercase tracking-[0.16em] text-mist/50">
                  Proximamente
                </p>
              </div>
              <span className="text-mist/40">+</span>
            </span>
          ),
        )}
      </nav>

      <div className="mt-4 rounded-[1.6rem] border border-white/8 bg-black/20 p-4 lg:mt-auto">
        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-mist/58">
          Estado del workspace
        </p>
        <p className="mt-3 text-sm leading-7 text-mist/74">
          Dashboard operativo. El resto de modulos quedan listos como siguientes
          extensiones del CRM.
        </p>
      </div>
    </aside>
  );
}
