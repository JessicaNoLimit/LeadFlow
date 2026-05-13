import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";

const highlights = [
  {
    title: "Portfolio",
    text: "Narrativas visuales pensadas para bodas, retratos y encargos donde la sensibilidad importa tanto como la tecnica.",
    href: "/portfolio",
    label: "Explorar trabajo",
  },
  {
    title: "Servicios",
    text: "Propuestas fotograficas disenadas para celebraciones, imagen personal, marca y escenas de producto con una direccion pulida.",
    href: "/servicios",
    label: "Ver servicios",
  },
  {
    title: "Sobre el estudio",
    text: "Una mirada editorial y humana que entiende cada sesion como una colaboracion construida con calma y criterio.",
    href: "/sobre",
    label: "Conocer el estudio",
  },
];

export function HomeStudioOverview() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="max-w-3xl">
          <p className="text-[0.68rem] uppercase tracking-[0.32em] text-sand">
            Presencia publica
          </p>
          <h2 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
            Una estructura mas contenida para cuidar cada seccion con detalle.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-8 text-mist sm:text-lg">
            La home presenta la esencia del estudio y deja el resto del recorrido
            en paginas independientes, pensadas para crecer sin perder claridad ni tono.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {highlights.map((item) => (
            <article
              key={item.title}
              className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8"
            >
              <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
                {item.title}
              </p>
              <p className="mt-4 text-sm leading-7 text-mist/76">{item.text}</p>
              <div className="mt-8">
                <ButtonLink href={item.href} label={item.label} variant="ghost" />
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
