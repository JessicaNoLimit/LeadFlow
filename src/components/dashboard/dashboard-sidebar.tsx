"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

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
    description: "Propuestas operativas",
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
  const activeLinkRef = useRef<HTMLAnchorElement | null>(null);

  useEffect(() => {
    activeLinkRef.current?.scrollIntoView({
      block: "nearest",
      inline: "center",
    });
  }, [pathname]);

  return (
    <aside className="w-full min-w-0 overflow-hidden rounded-[2rem] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.32)] lg:sticky lg:top-[6rem] lg:h-[calc(100vh-7.5rem)] lg:p-5">
      <div className="min-w-0 border-b border-white/8 px-2 pb-4">
        <p className="text-[0.62rem] uppercase tracking-[0.32em] text-sand">
          Navegacion CRM
        </p>
        <p className="mt-3 text-sm leading-7 text-mist/72">
          Operativa comercial centralizada para el estudio.
        </p>
      </div>

      <nav className="mt-4 flex min-w-0 max-w-full gap-2 overflow-x-auto pb-2 lg:flex-col lg:gap-3 lg:overflow-visible">
        {navigationItems.map((item) => {
          const isActive =
            item.href === "/dashboard"
              ? pathname === item.href
              : pathname === item.href || pathname.startsWith(`${item.href}/`);

          return (
            <Link
              key={item.label}
              ref={isActive ? activeLinkRef : undefined}
              href={item.href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex min-w-fit items-center justify-between gap-2 rounded-2xl px-3 py-2.5 text-left transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 lg:min-w-0 lg:gap-4 lg:px-4 lg:py-3 ${
                isActive
                  ? "border border-sand/20 bg-sand/[0.08] hover:border-sand/40 hover:bg-sand/[0.12]"
                  : "border border-white/8 bg-white/[0.025] hover:border-white/16 hover:bg-white/[0.05]"
              }`}
            >
              <div>
                <p
                  className={`text-xs uppercase tracking-[0.16em] lg:text-sm lg:tracking-[0.18em] ${
                    isActive ? "text-ivory" : "text-mist/92"
                  }`}
                >
                  {item.label}
                </p>
                <p
                  className={`mt-1 hidden text-xs uppercase tracking-[0.16em] lg:block ${
                    isActive ? "text-sand/70" : "text-mist/50"
                  }`}
                >
                  {item.description}
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
    </aside>
  );
}
