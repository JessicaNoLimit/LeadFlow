const workspaceItems = [
  "LeadFlow CRM",
  "Lorenzo Bellucci Studio",
  "Supabase conectado",
  "Resend configurado",
] as const;

export default function DashboardConfiguracionPage() {
  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Configuracion
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
          Informacion general del workspace privado.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
          Vista inicial para consultar el contexto operativo del CRM sin exponer
          secretos ni variables sensibles del entorno.
        </p>
      </section>

      <section className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_320px]">
        <article className="rounded-[1.85rem] border border-white/10 bg-black/20 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-7">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-mist/58">
            Workspace
          </p>
          <ul className="mt-5 grid gap-3">
            {workspaceItems.map((item) => (
              <li
                key={item}
                className="rounded-2xl border border-white/8 bg-white/[0.03] px-4 py-3 text-sm text-ivory/92"
              >
                {item}
              </li>
            ))}
          </ul>
        </article>

        <article className="rounded-[1.85rem] border border-sand/15 bg-sand/[0.05] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)] sm:p-7">
          <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sand/72">
            Alcance
          </p>
          <p className="mt-4 text-sm leading-7 text-mist/78">
            Esta pagina resume el estado general del entorno y deja el espacio
            listo para ajustes internos futuros del CRM.
          </p>
        </article>
      </section>
    </div>
  );
}
