"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  {
    label: "Dashboard",
    href: "/dashboard",
    description: "Resumen general",
  },
  {
    label: "Leads",
    href: "/dashboard/leads",
    description: "Solicitudes recibidas",
  },
  {
    label: "Presupuestos",
    href: "/dashboard/presupuestos",
    description: "Modulo en preparacion",
  },
  {
    label: "Clientes",
    href: "/dashboard/clientes",
    description: "Base de clientes",
  },
  {
    label: "Configuracion",
    href: "/dashboard/configuracion",
    description: "Workspace y conexiones",
  },
] as const;

export function DashboardSidebar() {
  const pathname = usePathname();

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
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex min-w-fit items-center justify-between gap-4 rounded-2xl px-4 py-3 text-left transition lg:min-w-0 ${
                isActive
                  ? "border border-sand/20 bg-sand/[0.08] hover:border-sand/40 hover:bg-sand/[0.12]"
                  : "border border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.05]"
              }`}
            >
              <div>
                <p
                  className={`text-sm uppercase tracking-[0.18em] ${
                    isActive ? "text-ivory" : "text-mist/92"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-1 text-xs uppercase tracking-[0.16em] ${
                    isActive ? "text-sand/70" : "text-mist/50"
                  }`}
                >
                  {isActive ? "Vista activa" : item.description}
                </p>
              </div>
              <span
                className={`transition group-hover:translate-x-0.5 ${
                  isActive ? "text-sand" : "text-mist/40"
                }`}
              >
                {isActive ? "/" : "+"}
              </span>
            </Link>
          );
        })}
      </nav>

      <div className="mt-4 rounded-[1.6rem] border border-white/8 bg-black/20 p-4 lg:mt-auto">
        <p className="text-[0.62rem] uppercase tracking-[0.28em] text-mist/58">
          Estado del workspace
        </p>
        <p className="mt-3 text-sm leading-7 text-mist/74">
          Navegacion principal operativa. Presupuestos, clientes y configuracion
          quedan preparados para crecer dentro del CRM.
        </p>
      </div>
    </aside>
  );
}
