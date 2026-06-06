import { studioContact } from "@/lib/studio";

type BadgeTone = "success" | "neutral" | "sand";

const studioData = [
  { label: "Nombre comercial", value: studioContact.name },
  { label: "Email de contacto", value: studioContact.email },
  { label: "Telefono", value: studioContact.phone },
  { label: "Horario de atencion", value: "L-V · 9:00 a 17:00" },
  { label: "Web", value: studioContact.website },
  { label: "Direccion", value: "Disponible bajo cita previa" },
] as const;

const maintenanceItems = [
  { label: "Dominio conectado", value: "www.lorenzobellucci.com", badge: "Operativo", tone: "success" },
  {
    label: "Sistema operativo",
    value: "Hosting: Vercel\nBase de datos: Supabase\nEmails transaccionales: Resend\nAutenticacion: Supabase Auth",
    badge: "Conectado",
    tone: "sand",
  },
  { label: "Ultimo mantenimiento", value: "27 mayo 2026", badge: "Activo", tone: "success" },
  { label: "Proxima revision recomendada", value: "27 noviembre 2026", badge: "Programable", tone: "neutral" },
] as const;

const commercialPreferences = [
  { label: "IVA por defecto", value: "21%" },
  { label: "Validez presupuestos", value: "15 dias" },
  { label: "Horario comercial", value: "L-V 9:00 a 17:00" },
  { label: "Mostrar telefono en propuestas", value: "Activado" },
  { label: "Exportacion PDF", value: "Activada" },
  { label: "Emails automaticos", value: "Activados" },
] as const;

const upcomingFeatures = [
  "Multiples usuarios",
  "Backups automaticos",
  "Automatizacion WhatsApp",
  "Calendario comercial",
  "Estadisticas avanzadas",
] as const;

function StatusBadge({
  label,
  tone = "neutral",
}: Readonly<{
  label: string;
  tone?: BadgeTone;
}>) {
  const toneClasses = {
    success: "border-[#4b6b57]/35 bg-[#102317]/70 text-[#cde7d2]",
    neutral: "border-white/10 bg-white/[0.04] text-mist/78",
    sand: "border-sand/20 bg-sand/[0.08] text-sand",
  };

  return (
    <span
      className={`inline-flex shrink-0 rounded-full border px-3 py-1 text-[0.62rem] uppercase tracking-[0.2em] ${toneClasses[tone]}`}
    >
      {label}
    </span>
  );
}

function SectionCard({
  eyebrow,
  title,
  description,
  children,
}: Readonly<{
  eyebrow: string;
  title: string;
  description?: string;
  children: React.ReactNode;
}>) {
  return (
    <section className="rounded-[1.8rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.022))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] transition duration-200 hover:border-sand/16 sm:p-7">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="min-w-0">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sand">
            {eyebrow}
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">{title}</h2>
          {description ? (
            <p className="mt-3 max-w-2xl text-sm leading-7 text-mist/72">
              {description}
            </p>
          ) : null}
        </div>
      </div>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function SettingRow({
  label,
  value,
  badge,
  tone,
}: Readonly<{
  label: string;
  value: string;
  badge?: string;
  tone?: BadgeTone;
}>) {
  return (
    <div className="flex flex-col gap-3 border-t border-white/8 py-4 first:border-t-0 first:pt-0 last:pb-0 sm:flex-row sm:items-center sm:justify-between">
      <div className="min-w-0">
        <p className="text-[0.68rem] uppercase tracking-[0.22em] text-mist/56">
          {label}
        </p>
        <p className="mt-2 whitespace-pre-line break-words text-sm leading-7 text-ivory">
          {value}
        </p>
      </div>
      {badge ? <StatusBadge label={badge} tone={tone} /> : null}
    </div>
  );
}

export default function DashboardConfiguracionPage() {
  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div className="min-w-0">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Configuracion
            </p>
            <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
              Administracion operativa del CRM.
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
              Ajustes de negocio, mantenimiento y preferencias comerciales para mantener
              LeadFlow preparado para la gestion diaria del estudio.
            </p>
          </div>
          <StatusBadge label="Panel activo" tone="success" />
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(360px,0.72fr)]">
        <SectionCard
          eyebrow="Datos del estudio"
          title="Identidad comercial"
          description="Informacion visible para la operativa comercial y las propuestas del estudio."
        >
          <div className="grid gap-x-8 sm:grid-cols-2">
            {studioData.map((item) => (
              <SettingRow key={item.label} label={item.label} value={item.value} />
            ))}
          </div>
        </SectionCard>

        <SectionCard
          eyebrow="Infraestructura"
          title="Mantenimiento"
          description="Estado general del entorno sin exponer credenciales ni informacion sensible."
        >
          <div>
            {maintenanceItems.map((item) => (
              <SettingRow
                key={item.label}
                label={item.label}
                value={item.value}
                badge={item.badge}
                tone={item.tone}
              />
            ))}
          </div>
          <p className="mt-6 rounded-[1.2rem] border border-sand/14 bg-sand/[0.05] px-4 py-3 text-sm leading-7 text-mist/78">
            Mantenimiento recomendado cada 6 meses para revisar dominio, backups y
            entregabilidad de emails.
          </p>
        </SectionCard>
      </section>

      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <SectionCard
          eyebrow="Preferencias comerciales"
          title="Reglas de propuesta"
          description="Criterios activos para presupuestos, comunicaciones y documentos comerciales."
        >
          <div className="grid gap-x-8 sm:grid-cols-2">
            {commercialPreferences.map((item) => (
              <SettingRow
                key={item.label}
                label={item.label}
                value={item.value}
                badge={item.value.startsWith("Activ") ? "Operativo" : undefined}
                tone={item.value.startsWith("Activ") ? "success" : undefined}
              />
            ))}
          </div>
        </SectionCard>

        <SectionCard eyebrow="Proximamente" title="Evolucion del CRM">
          <div className="flex flex-wrap gap-2">
            {upcomingFeatures.map((feature) => (
              <span
                key={feature}
                className="rounded-full border border-white/10 bg-white/[0.035] px-3 py-2 text-xs leading-5 text-mist/78"
              >
                {feature}
              </span>
            ))}
          </div>
        </SectionCard>
      </section>
    </div>
  );
}
