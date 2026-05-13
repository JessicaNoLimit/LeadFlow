import { Container } from "@/components/ui/container";

const services = [
  "Boda editorial",
  "Retrato personal",
  "Marca personal",
  "Evento privado",
  "Fotografia de producto",
  "Sesion lifestyle",
];

export function ServicesOverview() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h2 className="mt-5 font-heading text-3xl text-ivory">{service}</h2>
              <p className="mt-4 text-sm leading-7 text-mist/76">
                Una experiencia fotografica sobria, precisa y pensada para cuidar
                tanto la narrativa visual como la atmosfera del encargo.
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
