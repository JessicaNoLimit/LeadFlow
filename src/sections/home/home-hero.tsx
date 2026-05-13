import { ButtonLink } from "@/components/ui/button-link";
import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

export function HomeHero() {
  return (
    <section className="relative py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(360px,0.95fr)] lg:items-center">
          <div className="max-w-2xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-sand">
              Lorenzo Bellucci Studio
            </p>

            <h1 className="mt-6 font-heading text-5xl leading-[0.92] text-ivory sm:text-6xl lg:text-[5.3rem]">
              Imagenes creadas para permanecer con la misma elegancia que el instante.
            </h1>

            <p className="mt-8 max-w-xl text-base leading-8 text-mist sm:text-lg">
              Una presencia digital editorial para un estudio fotografico que
              trabaja con ritmo cinematografico, direccion artistica y una
              atencion precisa a cada detalle.
            </p>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <ButtonLink href="/contacto" label="Solicitar propuesta" />
              <ButtonLink href="/portfolio" label="Ver portfolio" variant="ghost" />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <ImagePlaceholder
              label="Editorial Portraits"
              className="sm:translate-y-8"
            />
            <ImagePlaceholder label="Quiet Motion" aspect="landscape" />
          </div>
        </div>
      </Container>
    </section>
  );
}
