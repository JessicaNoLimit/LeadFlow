export default function DashboardClientesPage() {
  return (
    <div className="grid gap-6 lg:gap-7">
      <section className="rounded-[2rem] border border-white/10 bg-[linear-gradient(135deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_24px_70px_rgba(0,0,0,0.24)] sm:p-8 lg:p-9">
        <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
          Clientes
        </p>
        <h1 className="mt-4 max-w-3xl font-heading text-4xl text-ivory sm:text-5xl">
          Base privada para clientes confirmados del estudio.
        </h1>
        <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
          Esta ruta quedara preparada para consolidar clientes nacidos a partir de
          leads aceptados y mantener su seguimiento desde el CRM.
        </p>
      </section>

      <section className="rounded-[1.85rem] border border-sand/20 bg-black/20 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.2)] sm:p-7">
        <p className="text-[0.68rem] uppercase tracking-[0.28em] text-sand">
          Proximamente
        </p>
        <p className="mt-4 font-heading text-2xl text-ivory">
          Conversion de leads a clientes
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-mist/78">
          Aqui se registraran los clientes confirmados, su contexto comercial y la
          continuidad de cada proyecto cerrado.
        </p>
      </section>
    </div>
  );
}
