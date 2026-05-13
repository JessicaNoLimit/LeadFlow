import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function HomeHero() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(420px,0.9fr)] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-sand">
              Photographic narratives for modern love stories
            </p>

            <h1 className="mt-6 font-heading text-5xl leading-[0.92] text-ivory sm:text-6xl lg:text-[5.5rem]">
              Imágenes que se sienten como una memoria antes de existir.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-mist sm:text-lg">
              LeadFlow nace como la base digital de un estudio fotográfico que
              trabaja con luz, silencio y dirección artística. Esta primera fase
              deja preparada una presencia sobria, cinematográfica y fácil de
              expandir.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="#portfolio" label="Explorar dirección visual" />
              <ButtonLink
                href="#contacto"
                label="Preparar solicitud"
                variant="ghost"
              />
            </div>

            <div className="mt-14 grid gap-6 border-t border-white/8 pt-8 text-sm text-mist/78 sm:grid-cols-3">
              <div>
                <p className="font-heading text-3xl text-ivory">01</p>
                <p className="mt-2 leading-7">Arquitectura limpia con App Router y estructura escalable.</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-ivory">02</p>
                <p className="mt-2 leading-7">Placeholders listos para reemplazar por fotografía real de alta calidad.</p>
              </div>
              <div>
                <p className="font-heading text-3xl text-ivory">03</p>
                <p className="mt-2 leading-7">Sistema visual sobrio para evolucionar hacia portfolio y CRM.</p>
              </div>
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2" id="portfolio">
            <ImagePlaceholder label="Editorial Portraits" className="sm:translate-y-10" />
            <ImagePlaceholder label="Quiet Motion" aspect="landscape" />
            <ImagePlaceholder label="Studio Light" aspect="landscape" />
            <ImagePlaceholder label="Destination Frames" className="sm:-translate-y-10" />
          </div>
        </div>

        <div
          id="contacto"
          className="mt-20 rounded-[2rem] border border-white/10 bg-white/[0.035] px-8 py-10 sm:px-10 lg:px-12"
        >
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_320px] lg:items-end">
            <div>
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-sand">
                Próxima evolución
              </p>
              <h2 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
                La zona de contacto y presupuesto queda preparada para la siguiente fase.
              </h2>
            </div>

            <p className="text-sm leading-7 text-mist/76">
              Aquí se integrarán las futuras acciones de captación, formularios y
              automatizaciones, sin rehacer la base visual ni la estructura del proyecto.
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-6 lg:grid-cols-2">
          <div
            id="servicios"
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Servicios
            </p>
            <h2 className="mt-4 font-heading text-3xl text-ivory">
              La arquitectura ya contempla futuras páginas de servicios y propuesta de valor.
            </h2>
          </div>

          <div
            id="sobre-mi"
            className="rounded-[2rem] border border-white/10 bg-white/[0.025] p-8"
          >
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Sobre mí
            </p>
            <h2 className="mt-4 font-heading text-3xl text-ivory">
              La narrativa personal del fotógrafo podrá añadirse sin romper la composición base.
            </h2>
          </div>
        </div>
      </Container>
    </section>
  );
}
