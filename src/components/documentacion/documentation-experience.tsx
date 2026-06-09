"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const navItems = [
  { id: "resumen", label: "Resumen" },
  { id: "arquitectura", label: "Arquitectura" },
  { id: "tecnologias", label: "Tecnologias" },
  { id: "funcionalidades", label: "Funcionalidades" },
  { id: "proceso", label: "Proceso" },
  { id: "ia", label: "Uso de IA" },
  { id: "galeria", label: "Galeria" },
  { id: "metricas", label: "Metricas" },
  { id: "conclusiones", label: "Conclusiones" },
] as const;

const badges = ["Next.js", "Supabase", "Resend", "Vercel", "TypeScript"];

const productionUrl = "https://leadflow-orpin-ten.vercel.app/";

const appAccessCards = [
  {
    title: "Web publica",
    icon: "01",
    url: productionUrl,
    description:
      "Landing publica del fotografo Lorenzo Bellucci Studio. Incluye presentacion profesional, portfolio, servicios y formularios de captacion conectados al CRM.",
    cta: "Abrir web publica",
    accent: "from-[#8fd6ff] to-[#7c6df6]",
  },
  {
    title: "CRM privado",
    icon: "02",
    url: `${productionUrl}dashboard`,
    description:
      "Area privada de gestion comercial. Permite administrar leads, presupuestos, clientes y seguimiento del pipeline comercial.",
    cta: "Abrir CRM",
    accent: "from-[#a8f0c6] to-[#36a3ff]",
  },
  {
    title: "Documentacion",
    icon: "03",
    url: `${productionUrl}documentacion`,
    description:
      "Caso de estudio completo del proyecto, arquitectura, tecnologias utilizadas, proceso de desarrollo y documentacion tecnica.",
    cta: "Abrir documentacion",
    accent: "from-[#ff9bb0] to-[#f7d96b]",
  },
];

const primaryCtaClassName =
  "inline-flex h-12 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] px-5 text-xs font-semibold text-white shadow-[0_16px_42px_rgba(124,109,246,0.24)] transition hover:-translate-y-0.5 hover:shadow-[0_20px_54px_rgba(54,163,255,0.28)] sm:h-13 sm:px-7 sm:text-sm";

const secondaryCtaClassName =
  "inline-flex h-12 items-center justify-center rounded-full border border-[#d8dce7] bg-white px-5 text-xs font-semibold text-[#252933] shadow-[0_12px_34px_rgba(20,20,20,0.05)] transition hover:-translate-y-0.5 hover:border-[#b9cdfd] hover:bg-[#f3f7ff] hover:shadow-[0_18px_46px_rgba(79,124,255,0.1)] sm:h-13 sm:px-7 sm:text-sm";

const headerPrimaryCtaClassName =
  "inline-flex h-10 items-center justify-center rounded-full bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] px-4 text-xs font-semibold text-white shadow-[0_12px_32px_rgba(124,109,246,0.22)] transition hover:-translate-y-0.5 hover:shadow-[0_16px_42px_rgba(54,163,255,0.24)]";

const headerSecondaryCtaClassName =
  "hidden h-10 items-center justify-center rounded-full border border-[#d8dce7] bg-white px-4 text-xs font-semibold text-[#252933] shadow-[0_10px_28px_rgba(20,20,20,0.045)] transition hover:-translate-y-0.5 hover:border-[#b9cdfd] hover:bg-[#f3f7ff] sm:inline-flex";

const summaryCards = [
  {
    title: "Problema",
    text: "Las solicitudes comerciales de un estudio creativo pueden perderse entre formularios, emails y contactos manuales si no existe una herramienta de seguimiento.",
    accent: "bg-[#f7d96b]",
  },
  {
    title: "Solucion",
    text: "LeadFlow centraliza la captacion de leads, el seguimiento comercial, la creacion de presupuestos y la conversion de clientes desde un CRM privado.",
    accent: "bg-[#8fd6ff]",
  },
  {
    title: "Publico objetivo",
    text: "Estudios fotograficos, negocios creativos y profesionales que necesitan un MVP de gestion comercial visual, sencillo y realista.",
    accent: "bg-[#ff9bb0]",
  },
  {
    title: "Objetivo academico",
    text: "Demostrar una aplicacion fullstack con frontend moderno, APIs propias, base de datos, autenticacion, emails y despliegue preparado para Vercel.",
    accent: "bg-[#a8f0c6]",
  },
];

const architectureSteps = [
  "Landing",
  "Formulario",
  "API Route",
  "Supabase",
  "CRM",
  "Presupuesto",
  "Email",
];

const technologies = [
  {
    name: "Next.js",
    description: "App Router, Server Components, rutas publicas, rutas privadas y APIs internas.",
  },
  {
    name: "TypeScript",
    description: "Tipado para entidades, payloads, helpers de negocio y componentes.",
  },
  {
    name: "Tailwind",
    description: "Sistema visual responsive con utilidades, tokens y layouts adaptables.",
  },
  {
    name: "Supabase",
    description: "PostgreSQL para leads y presupuestos, con clientes server-side.",
  },
  {
    name: "Resend",
    description: "Emails transaccionales para confirmaciones y envio de propuestas.",
  },
  {
    name: "Vercel",
    description: "Plataforma objetivo para desplegar frontend y Route Handlers de Next.js.",
  },
];

const features = [
  {
    title: "Landing premium",
    text: "Experiencia publica editorial para Lorenzo Bellucci Studio con hero, servicios, portfolio, proceso, CTA y contacto.",
  },
  {
    title: "Captacion de leads",
    text: "Formulario publico con validaciones, aceptacion de privacidad, feedback de envio y persistencia en Supabase.",
  },
  {
    title: "CRM privado",
    text: "Zona protegida con Supabase Auth para consultar dashboard, leads, presupuestos, clientes y configuracion.",
  },
  {
    title: "Gestion de clientes",
    text: "Los clientes se visualizan como vista logica derivada de leads aceptados, sin tabla fisica propia.",
  },
  {
    title: "Presupuestos",
    text: "Creacion vinculada a leads o cliente manual, edicion, estados comerciales, IVA incluido y exportacion por impresion.",
  },
  {
    title: "Envio de emails",
    text: "Confirmacion de lead, notificacion interna opcional y propuestas comerciales enviadas mediante Resend.",
  },
  {
    title: "Responsive",
    text: "Landing, formularios, listados, fichas y navegacion del CRM adaptados a escritorio, tablet y movil.",
  },
  {
    title: "Dashboard ejecutivo",
    text: "Resumen de actividad, metricas comerciales y leads recientes para dar contexto operativo al administrador.",
  },
];

const developmentPhases = [
  {
    phase: "Fase 1",
    title: "Definicion y planificacion",
    text: "Se definio LeadFlow como sistema de captacion y CRM para un estudio fotografico premium ficticio.",
  },
  {
    phase: "Fase 2",
    title: "Base tecnica",
    text: "Se inicializo Next.js, TailwindCSS, estructura modular, layout global y primera direccion visual.",
  },
  {
    phase: "Fase 3",
    title: "Supabase y backend inicial",
    text: "Se conecto Supabase, se preparo la tabla leads y se creo el primer endpoint para guardar solicitudes.",
  },
  {
    phase: "Fase 4",
    title: "Formulario conectado",
    text: "La web publica se conecto con la API para completar el flujo frontend -> backend -> base de datos.",
  },
  {
    phase: "Fase 5",
    title: "API propia para leads",
    text: "Se completo el CRUD basico de leads con listado, actualizacion, eliminacion y validaciones centralizadas.",
  },
  {
    phase: "Fase 6",
    title: "Panel privado CRM",
    text: "Se implemento login, proteccion de rutas, dashboard, listado y ficha de leads con Supabase Auth.",
  },
  {
    phase: "Fase 7.5",
    title: "Navegacion CRM y presupuestos",
    text: "Se activaron rutas privadas reales y se incorporo el modulo de presupuestos vinculado al flujo comercial.",
  },
  {
    phase: "Fase 8",
    title: "Profesionalizacion",
    text: "Se mejoraron configuracion, IVA, cliente manual, emails comerciales, proteccion de datos y limpieza visual.",
  },
  {
    phase: "Fase 8.2 - 8.6",
    title: "Pulido final",
    text: "Se ajustaron loading states, mensajes profesionales, responsive, landing premium y datos demo.",
  },
  {
    phase: "Fase final",
    title: "Entrega y release v1.0",
    text: "Se cerro el MVP avanzado con despliegue, correcciones de produccion, auditoria y documentacion final.",
  },
];

const iaCards = [
  {
    title: "ChatGPT",
    text: "Apoyo en ideacion, planificacion, documentacion, copy profesional y organizacion del caso de estudio.",
  },
  {
    title: "Codex",
    text: "Asistencia tecnica para revisar codigo, detectar riesgos, implementar mejoras y preparar documentacion del repositorio.",
  },
  {
    title: "Auditorias tecnicas",
    text: "Revision de arquitectura, rutas, APIs, Supabase, autenticacion, emails, CRM y limitaciones reales.",
  },
  {
    title: "Refactorizaciones",
    text: "Identificacion de duplicaciones, componentes grandes, constantes repetidas y mejoras seguras pendientes.",
  },
  {
    title: "Correccion de bugs",
    text: "Apoyo para resolver problemas de produccion, datos, responsive, hidratacion y feedback visual.",
  },
  {
    title: "Revision UX",
    text: "Mejora de loading states, mensajes de error, flujo comercial, orden del pipeline y experiencia responsive.",
  },
];

const screenshots = [
  {
    title: "Landing hero",
    route: "/",
    src: "/images/capturasdoc/01-landing-hero.png",
  },
  {
    title: "Servicios",
    route: "/",
    src: "/images/capturasdoc/02-servicios.png",
  },
  {
    title: "Formulario publico",
    route: "/#contacto",
    src: "/images/capturasdoc/03-formulario.png",
  },
  {
    title: "Login CRM",
    route: "/login",
    src: "/images/capturasdoc/04-login.png",
  },
  {
    title: "Dashboard",
    route: "/dashboard",
    src: "/images/capturasdoc/05-dashboard.png",
  },
  {
    title: "Listado de leads",
    route: "/dashboard/leads",
    src: "/images/capturasdoc/06-leads.png",
  },
  {
    title: "Detalle de lead",
    route: "/dashboard/leads/[id]",
    src: "/images/capturasdoc/07-lead-detail.png",
  },
  {
    title: "Presupuestos",
    route: "/dashboard/presupuestos",
    src: "/images/capturasdoc/08-presupuestos.png",
  },
  {
    title: "Detalle de presupuesto",
    route: "/dashboard/presupuestos/[id]",
    src: "/images/capturasdoc/09-presupuesto-detail.png",
  },
  {
    title: "Clientes",
    route: "/dashboard/clientes",
    src: "/images/capturasdoc/10-clientes.png",
  },
  {
    title: "Configuracion",
    route: "/dashboard/configuracion",
    src: "/images/capturasdoc/11-configuracion.png",
  },
  {
    title: "Landing movil",
    route: "/",
    src: "/images/capturasdoc/12-mobile-landing.png",
  },
  {
    title: "CRM movil",
    route: "/dashboard/leads",
    src: "/images/capturasdoc/13-mobile-crm.png",
  },
  {
    title: "Email recibido",
    route: "Resend",
    src: "/images/capturasdoc/14-email-presupuesto-enviado.png.png",
  },
  {
    title: "Tablas Supabase",
    route: "Supabase",
    src: "/images/capturasdoc/15-supabase-tablas.png",
  },
];

const metricCards = [
  {
    label: "Frontend Next.js",
    value: "App Router",
    text: "Landing publica, documentacion, CRM privado y rutas dinamicas.",
  },
  {
    label: "API propia",
    value: "5 route files",
    text: "Leads, presupuestos, actualizaciones y envio comercial.",
  },
  {
    label: "Supabase",
    value: "2 tablas",
    text: "Leads y presupuestos como nucleo de datos del MVP.",
  },
  {
    label: "Autenticacion",
    value: "Supabase Auth",
    text: "Login privado, cookies SSR y proteccion de dashboard.",
  },
  {
    label: "Emails",
    value: "Resend",
    text: "Confirmaciones, notificacion interna opcional y propuestas.",
  },
  {
    label: "Deploy",
    value: "Vercel",
    text: "Proyecto preparado para entorno de produccion Next.js.",
  },
];

function SectionHeader({
  kicker,
  title,
  description,
}: Readonly<{
  kicker: string;
  title: string;
  description: string;
}>) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center lg:mb-14">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7c6df6]">
        {kicker}
      </p>
      <h2 className="mt-4 text-3xl font-semibold tracking-[-0.04em] text-[#161616] sm:text-5xl">
        {title}
      </h2>
      <p className="mt-5 text-base leading-8 text-[#60646c] sm:text-lg">
        {description}
      </p>
    </div>
  );
}

function SoftCard({
  children,
  className = "",
}: Readonly<{
  children: React.ReactNode;
  className?: string;
}>) {
  return (
    <div
      className={`rounded-[2rem] border border-black/[0.08] bg-white/82 p-6 shadow-[0_24px_80px_rgba(20,20,20,0.07)] backdrop-blur ${className}`}
    >
      {children}
    </div>
  );
}

export function DocumentationExperience() {
  const [activeSection, setActiveSection] = useState<string>(navItems[0].id);
  const [selectedImage, setSelectedImage] = useState<(typeof screenshots)[number] | null>(
    null,
  );
  const [readingProgress, setReadingProgress] = useState(0);

  const navIdSet = useMemo<Set<string>>(
    () => new Set(navItems.map((item) => item.id)),
    [],
  );

  useEffect(() => {
    function updateProgress() {
      const scrollTop = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      setReadingProgress(maxScroll > 0 ? Math.min(100, (scrollTop / maxScroll) * 100) : 0);
    }

    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>("section[id]"))
      .filter((section) => navIdSet.has(section.id));

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntry = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visibleEntry) {
          setActiveSection(visibleEntry.target.id);
        }
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.1, 0.25, 0.5],
      },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, [navIdSet]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setSelectedImage(null);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <main className="min-h-screen overflow-x-hidden bg-[#fbfaf7] text-[#161616]">
      <div
        className="fixed left-0 top-0 z-50 h-1 bg-[linear-gradient(90deg,#7c6df6,#36c5f0,#f7d96b,#ff8fb3)] transition-[width] duration-150"
        style={{ width: `${readingProgress}%` }}
      />

      <header className="sticky top-0 z-40 border-b border-black/[0.06] bg-[#fbfaf7]/84 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-4 sm:px-7 lg:px-8">
          <Link href="/" className="group inline-flex min-w-0 items-center gap-3">
            <span className="grid h-9 w-9 shrink-0 place-items-center rounded-2xl bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] text-sm font-semibold text-white shadow-[0_12px_36px_rgba(124,109,246,0.22)]">
              LF
            </span>
            <span className="min-w-0">
              <span className="block text-sm font-semibold tracking-[-0.02em]">
                LeadFlow Docs
              </span>
              <span className="hidden text-xs text-[#6f7279] sm:block">
                Caso de estudio fullstack
              </span>
            </span>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="https://github.com/JessicaNoLimit/LeadFlow"
              target="_blank"
              rel="noreferrer"
              className={headerSecondaryCtaClassName}
            >
              Ver codigo
            </Link>
            <Link
              href={productionUrl}
              className={headerPrimaryCtaClassName}
            >
              Ver demo
            </Link>
          </div>
        </div>
        <nav className="border-t border-black/[0.045] bg-white/48">
          <div className="mx-auto max-w-7xl px-5 sm:px-7 lg:px-8">
            <div className="-mx-5 flex gap-2 overflow-x-auto px-5 py-3 [scrollbar-width:none] sm:-mx-7 sm:px-7 lg:mx-0 lg:px-0 [&::-webkit-scrollbar]:hidden">
              {navItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className={`shrink-0 rounded-full px-4 py-2 text-xs font-semibold transition sm:text-sm ${
                    activeSection === item.id
                      ? "bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] text-white shadow-[0_12px_34px_rgba(124,109,246,0.22)]"
                      : "border border-black/[0.06] bg-white/72 text-[#59606c] hover:border-[#b9cdfd] hover:bg-[#f3f7ff] hover:text-[#252933]"
                  }`}
                >
                  {item.label}
                </a>
              ))}
            </div>
          </div>
        </nav>
      </header>

      <section className="relative px-5 pb-20 pt-16 sm:px-7 sm:pb-28 sm:pt-24 lg:px-8" id="inicio">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-[-8rem] top-8 h-72 w-72 rounded-full bg-[#ffb8c8]/45 blur-3xl" />
          <div className="absolute right-[-10rem] top-24 h-80 w-80 rounded-full bg-[#8fd6ff]/50 blur-3xl" />
          <div className="absolute left-1/2 top-[26rem] h-80 w-80 -translate-x-1/2 rounded-full bg-[#f7d96b]/40 blur-3xl" />
          <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.035)_1px,transparent_1px)] bg-[size:44px_44px] opacity-35" />
        </div>

        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[minmax(0,1fr)_390px] lg:items-end">
          <div>
            <div className="inline-flex flex-wrap items-center gap-2 rounded-full border border-black/[0.08] bg-white/80 px-3 py-2 shadow-[0_14px_40px_rgba(0,0,0,0.06)] backdrop-blur">
              <span className="rounded-full bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] px-3 py-1 text-xs font-semibold text-white shadow-[0_10px_28px_rgba(124,109,246,0.18)]">
                Proyecto DAW
              </span>
              <span className="text-xs font-medium text-[#60646c]">
                Fullstack / CRM / Portfolio
              </span>
            </div>

            <h1 className="mt-8 max-w-5xl text-6xl font-semibold leading-[0.9] tracking-[-0.075em] text-[#161616] sm:text-7xl lg:text-8xl">
              LeadFlow CRM
            </h1>
            <p className="mt-8 max-w-3xl text-xl leading-9 text-[#4f535b] sm:text-2xl sm:leading-10">
              Plataforma de captacion y gestion comercial desarrollada con Next.js,
              Supabase y Resend. El proyecto esta desplegado en produccion y
              disponible publicamente.
            </p>

            <div className="mt-8 flex flex-wrap gap-2">
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="rounded-full border border-black/[0.08] bg-white/84 px-4 py-2 text-xs font-semibold text-[#303238] shadow-[0_10px_28px_rgba(0,0,0,0.045)]"
                >
                  {badge}
                </span>
              ))}
            </div>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="https://github.com/JessicaNoLimit/LeadFlow"
                target="_blank"
                rel="noreferrer"
                className={primaryCtaClassName}
              >
                Ver codigo
              </Link>
              <Link
                href={productionUrl}
                className={secondaryCtaClassName}
              >
                Ver demo
              </Link>
            </div>
          </div>

          <SoftCard className="relative overflow-hidden">
            <div className="pointer-events-none absolute -right-8 -top-8 z-0 h-24 w-24 rounded-full bg-[#f7d96b]/45 blur-sm" />
            <div className="pointer-events-none absolute -right-2 top-10 z-0 h-20 w-20 rounded-full bg-[#ff9bb0]/30 blur-md" />
            <div className="relative z-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7c6df6]">
                Project snapshot
              </p>
              <dl className="mt-8 grid gap-5">
                {[
                  ["Tipo", "Aplicacion fullstack"],
                  ["Producto", "Landing + CRM privado"],
                  ["Datos", "Leads y presupuestos"],
                  ["Auth", "Supabase Auth"],
                  ["Estado", "MVP avanzado"],
                ].map(([label, value]) => (
                  <div
                    key={label}
                    className="flex items-center justify-between gap-5 border-b border-black/[0.06] pb-4 last:border-b-0 last:pb-0"
                  >
                    <dt className="text-sm text-[#747780]">{label}</dt>
                    <dd className="text-right text-sm font-semibold text-[#1d1f24]">
                      {value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </SoftCard>
        </div>
      </section>

      <div className="mx-auto max-w-6xl px-5 pb-24 sm:px-7 lg:px-8">
        <div className="grid gap-24 lg:gap-32">
          <section id="resumen" className="scroll-mt-40">
            <SectionHeader
              kicker="Resumen"
              title="Una herramienta realista para gestionar oportunidades comerciales."
              description="LeadFlow combina una experiencia publica cuidada con un sistema privado para seguir el ciclo comercial de un estudio fotografico."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {summaryCards.map((card) => (
                <SoftCard key={card.title} className="transition hover:-translate-y-1">
                  <div className={`h-3 w-16 rounded-full ${card.accent}`} />
                  <h3 className="mt-6 text-2xl font-semibold tracking-[-0.03em] text-[#161616]">
                    {card.title}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">{card.text}</p>
                </SoftCard>
              ))}
            </div>
          </section>

          <section aria-labelledby="explorar-aplicacion-title">
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7c6df6]">
                  Produccion
                </p>
                <h2
                  id="explorar-aplicacion-title"
                  className="mt-3 text-3xl font-semibold tracking-[-0.04em] text-[#161616] sm:text-4xl"
                >
                  Explorar la aplicacion
                </h2>
              </div>
              <p className="max-w-2xl text-sm leading-7 text-[#60646c] sm:text-right">
                Tres accesos directos para revisar el proyecto real desplegado:
                experiencia publica, panel privado y caso de estudio tecnico.
              </p>
            </div>

            <div className="grid gap-5 lg:grid-cols-3">
              {appAccessCards.map((card) => (
                <a
                  key={card.title}
                  href={card.url}
                  className="group relative min-h-[23rem] overflow-hidden rounded-[2rem] border border-black/[0.08] bg-white/88 p-6 shadow-[0_24px_80px_rgba(20,20,20,0.07)] backdrop-blur transition duration-300 hover:-translate-y-1 hover:border-[#b9cdfd] hover:shadow-[0_32px_96px_rgba(79,124,255,0.13)]"
                >
                  <div
                    className={`pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-gradient-to-br ${card.accent} opacity-35 blur-xl transition duration-300 group-hover:scale-110 group-hover:opacity-45`}
                  />
                  <div className="relative z-10 flex h-full flex-col">
                    <div className="flex items-start justify-between gap-4">
                      <span
                        className={`grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br ${card.accent} text-sm font-semibold text-white shadow-[0_16px_38px_rgba(79,124,255,0.18)]`}
                      >
                        {card.icon}
                      </span>
                      <span className="rounded-full border border-black/[0.06] bg-white/80 px-3 py-1 text-xs font-semibold text-[#68707d]">
                        Produccion
                      </span>
                    </div>

                    <h3 className="mt-8 text-2xl font-semibold tracking-[-0.035em] text-[#161616]">
                      {card.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#60646c]">
                      {card.description}
                    </p>

                    <div className="mt-auto pt-8">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[#d8dce7] bg-white px-4 py-2 text-sm font-semibold text-[#252933] shadow-[0_10px_28px_rgba(20,20,20,0.045)] transition group-hover:border-[#b9cdfd] group-hover:bg-[#f3f7ff]">
                        {card.cta}
                        <span aria-hidden="true" className="transition group-hover:translate-x-0.5">
                          -&gt;
                        </span>
                      </span>
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </section>

          <section id="arquitectura" className="scroll-mt-40">
            <SectionHeader
              kicker="Arquitectura"
              title="Del formulario publico al seguimiento dentro del CRM."
              description="La arquitectura real usa Next.js App Router, Route Handlers, Supabase, Supabase Auth y Resend. No hay backend externo separado."
            />
            <SoftCard className="overflow-hidden">
              <div className="grid gap-4 md:grid-cols-7 md:items-center">
                {architectureSteps.map((step, index) => (
                  <div key={step} className="contents">
                    <div className="rounded-[1.35rem] border border-black/[0.07] bg-[#fbfaf7] p-4 text-center shadow-[0_12px_36px_rgba(0,0,0,0.045)]">
                      <span className="mx-auto grid h-8 w-8 place-items-center rounded-full bg-[linear-gradient(135deg,#7c6df6,#36a3ff)] text-xs font-semibold text-white shadow-[0_10px_26px_rgba(124,109,246,0.2)]">
                        {index + 1}
                      </span>
                      <p className="mt-3 text-sm font-semibold text-[#1d1f24]">{step}</p>
                    </div>
                    {index < architectureSteps.length - 1 ? (
                      <div className="flex justify-center text-[#9ca1aa] md:hidden">|</div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="mt-8 rounded-[1.5rem] border border-[#7c6df6]/20 bg-[#f2f0ff] p-5">
                <p className="text-sm leading-7 text-[#4f477d]">
                  El visitante envia una solicitud, la API valida y guarda el lead en
                  Supabase, el administrador lo gestiona en el CRM, crea un presupuesto y
                  puede enviarlo por email mediante Resend.
                </p>
              </div>
            </SoftCard>
          </section>

          <section id="tecnologias" className="scroll-mt-40">
            <SectionHeader
              kicker="Tecnologias"
              title="Stack moderno, acotado y coherente con el MVP."
              description="El proyecto evita dependencias innecesarias y usa servicios reales para datos, autenticacion, emails y despliegue."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {technologies.map((technology) => (
                <SoftCard key={technology.name} className="min-h-48 transition hover:-translate-y-1">
                  <span className="inline-flex rounded-full bg-[#f3f4f6] px-3 py-1 text-xs font-semibold text-[#60646c]">
                    Tecnologia
                  </span>
                  <h3 className="mt-5 text-2xl font-semibold tracking-[-0.03em]">
                    {technology.name}
                  </h3>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">
                    {technology.description}
                  </p>
                </SoftCard>
              ))}
            </div>
          </section>

          <section id="funcionalidades" className="scroll-mt-40">
            <SectionHeader
              kicker="Funcionalidades"
              title="Un flujo completo de captacion, seguimiento y propuesta."
              description="Las funcionalidades reflejan lo que existe actualmente en el repositorio y en la aplicacion."
            />
            <div className="grid gap-5 sm:grid-cols-2">
              {features.map((feature, index) => (
                <SoftCard key={feature.title} className="transition hover:-translate-y-1">
                  <div className="flex items-start justify-between gap-4">
                    <h3 className="text-xl font-semibold tracking-[-0.03em]">
                      {feature.title}
                    </h3>
                    <span className="rounded-full bg-[#eaf8ef] px-3 py-1 text-xs font-semibold text-[#28764b]">
                      Implementado
                    </span>
                  </div>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">{feature.text}</p>
                  <div
                    className={`mt-6 h-2 rounded-full ${
                      index % 4 === 0
                        ? "bg-[#f7d96b]"
                        : index % 4 === 1
                          ? "bg-[#8fd6ff]"
                          : index % 4 === 2
                            ? "bg-[#ff9bb0]"
                            : "bg-[#a8f0c6]"
                    }`}
                  />
                </SoftCard>
              ))}
            </div>
          </section>

          <section id="proceso" className="scroll-mt-40">
            <SectionHeader
              kicker="Proceso"
              title="Desarrollo por fases hasta cerrar un MVP avanzado."
              description="La documentacion de fases muestra una evolucion progresiva: base tecnica, Supabase, CRM, presupuestos, emails, responsive, demo y release final."
            />
            <div className="relative grid gap-5 before:absolute before:left-5 before:top-4 before:h-[calc(100%-2rem)] before:w-px before:bg-black/[0.08]">
              {developmentPhases.map((phase) => (
                <div key={phase.phase} className="relative grid gap-4 pl-14">
                  <span className="absolute left-0 top-2 grid h-10 w-10 place-items-center rounded-full border border-black/[0.08] bg-white text-xs font-semibold text-[#7c6df6] shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
                    {phase.phase.replace("Fase ", "")}
                  </span>
                  <SoftCard>
                    <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#7c6df6]">
                      {phase.phase}
                    </p>
                    <h3 className="mt-3 text-2xl font-semibold tracking-[-0.03em]">
                      {phase.title}
                    </h3>
                    <p className="mt-4 text-sm leading-7 text-[#60646c]">{phase.text}</p>
                  </SoftCard>
                </div>
              ))}
            </div>
          </section>

          <section id="ia" className="scroll-mt-40">
            <SectionHeader
              kicker="Uso de IA"
              title="IA como apoyo tecnico, no como sustituto de criterio."
              description="El proyecto uso herramientas de IA durante ideacion, documentacion, auditoria, debugging y revision UX, con decisiones finales revisadas manualmente."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {iaCards.map((card) => (
                <SoftCard key={card.title}>
                  <h3 className="text-xl font-semibold tracking-[-0.03em]">{card.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">{card.text}</p>
                </SoftCard>
              ))}
            </div>
            <div className="mt-6 rounded-[2rem] border border-[#f0c26a]/30 bg-[#fff6d7] p-6">
              <p className="text-sm leading-8 text-[#75612a]">
                Todas las decisiones finales de producto, arquitectura, integraciones,
                seguridad, experiencia visual y documentacion fueron revisadas y
                validadas manualmente durante el desarrollo.
              </p>
            </div>
          </section>

          <section id="galeria" className="scroll-mt-40">
            <SectionHeader
              kicker="Galeria"
              title="Capturas del flujo real del proyecto."
              description="La galeria muestra la landing, el acceso privado, el CRM, presupuestos, clientes, responsive, emails y Supabase."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {screenshots.map((screenshot) => (
                <button
                  key={screenshot.src}
                  type="button"
                  onClick={() => setSelectedImage(screenshot)}
                  className="group overflow-hidden rounded-[1.8rem] border border-black/[0.08] bg-white text-left shadow-[0_24px_70px_rgba(0,0,0,0.07)] transition hover:-translate-y-1 hover:shadow-[0_30px_90px_rgba(0,0,0,0.11)]"
                >
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#eef0f3]">
                    <Image
                      src={screenshot.src}
                      alt={screenshot.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
                      className="object-cover transition duration-500 group-hover:scale-[1.03]"
                    />
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold tracking-[-0.02em] text-[#161616]">
                      {screenshot.title}
                    </h3>
                    <p className="mt-2 text-xs font-medium text-[#7c6df6]">
                      {screenshot.route}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          <section id="metricas" className="scroll-mt-40">
            <SectionHeader
              kicker="Metricas"
              title="Resumen tecnico de las piezas principales."
              description="Estas metricas resumen las capas reales construidas para la entrega academica y portfolio."
            />
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {metricCards.map((metric) => (
                <SoftCard key={metric.label}>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[#8a8f99]">
                    {metric.label}
                  </p>
                  <p className="mt-4 text-3xl font-semibold tracking-[-0.04em]">
                    {metric.value}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">{metric.text}</p>
                </SoftCard>
              ))}
            </div>
          </section>

          <section id="conclusiones" className="scroll-mt-40">
            <SectionHeader
              kicker="Conclusiones"
              title="Un caso de estudio fullstack con criterio de producto."
              description="LeadFlow demuestra frontend, backend, base de datos, autenticacion, integraciones externas, responsive y documentacion tecnica."
            />
            <div className="grid gap-5 lg:grid-cols-3">
              {[
                {
                  title: "Aprendizaje",
                  text: "Este proyecto me permitio aplicar de forma practica conocimientos de frontend, backend, bases de datos y despliegue. Mas alla de desarrollar funcionalidades, aprendi a disenar un flujo completo de producto, tomar decisiones tecnicas y resolver problemas reales durante el desarrollo.",
                },
                {
                  title: "Problemas resueltos",
                  text: "Durante el desarrollo tuve que enfrentarme a desafios relacionados con la autenticacion, la gestion de estados comerciales, la integracion con servicios externos, el despliegue en produccion y la sincronizacion entre frontend y backend. Cada problema me permitio comprender mejor como se construye una aplicacion fullstack moderna.",
                },
                {
                  title: "Mejoras futuras",
                  text: "Si continuara evolucionando LeadFlow, me gustaria incorporar roles de usuario, analitica comercial, generacion avanzada de documentos PDF, automatizaciones y una capa de reporting mas completa para convertirlo en una herramienta aun mas cercana a un producto real.",
                },
              ].map((item) => (
                <SoftCard key={item.title}>
                  <h3 className="text-2xl font-semibold tracking-[-0.03em]">{item.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[#60646c]">{item.text}</p>
                </SoftCard>
              ))}
            </div>
            <div className="mt-6 rounded-[2.3rem] border border-[#cbd8ff] bg-[linear-gradient(135deg,#eef3ff,#f8f5ff_48%,#fff7df)] p-8 text-[#202334] shadow-[0_28px_90px_rgba(83,104,180,0.14)] sm:p-10">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[#7c6df6]">
                Resultado final
              </p>
              <p className="mt-5 max-w-4xl text-2xl font-semibold leading-10 tracking-[-0.04em] sm:text-4xl sm:leading-[1.12]">
                LeadFlow representa el proyecto mas completo que he desarrollado
                hasta la fecha.
              </p>
              <div className="mt-7 grid max-w-4xl gap-5 text-base leading-8 text-[#4f535b] sm:text-lg sm:leading-9">
                <p>
                  A lo largo de su construccion he trabajado con tecnologias y
                  servicios utilizados en entornos profesionales, conectando una web
                  publica, un CRM privado, una base de datos real, autenticacion,
                  envio de correos y despliegue en produccion.
                </p>
                <p>
                  Mas que una practica academica, este proyecto ha sido una
                  oportunidad para aprender a pensar como desarrolladora, tomar
                  decisiones tecnicas y construir una solucion funcional de principio
                  a fin.
                </p>
                <p>
                  Aunque todavia existen mejoras posibles, el resultado final refleja
                  mi evolucion durante el ciclo DAW y mi capacidad para desarrollar
                  aplicaciones web modernas conectadas a servicios reales.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>

      {selectedImage ? (
        <div
          className="fixed inset-0 z-[70] grid place-items-center bg-black/82 p-4 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-label={`Captura ampliada: ${selectedImage.title}`}
          onClick={() => setSelectedImage(null)}
        >
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[2rem] bg-white shadow-[0_30px_100px_rgba(0,0,0,0.35)]"
            onClick={(event) => event.stopPropagation()}
          >
            <div className="flex items-center justify-between gap-4 border-b border-black/[0.08] px-5 py-4">
              <div>
                <p className="text-sm font-semibold text-[#161616]">{selectedImage.title}</p>
                <p className="text-xs text-[#747780]">{selectedImage.route}</p>
              </div>
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="rounded-full border border-black/[0.08] px-4 py-2 text-xs font-semibold text-[#303238] transition hover:bg-black/[0.04]"
              >
                Cerrar
              </button>
            </div>
            <div className="relative aspect-[16/10] bg-[#f3f4f6]">
              <Image
                src={selectedImage.src}
                alt={selectedImage.title}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </div>
          </div>
        </div>
      ) : null}
    </main>
  );
}
