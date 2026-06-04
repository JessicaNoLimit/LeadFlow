import Image from "next/image";
import { ButtonLink } from "@/components/ui/button-link";
import heroImage from "@/images/imagen-principal.png";

export function HomeHero() {
  return (
    <section className="relative overflow-hidden px-6 py-16 sm:px-10 sm:py-20 lg:min-h-[calc(100vh-5rem)] lg:px-12 lg:py-16">
      <div className="mx-auto grid w-full max-w-[1440px] gap-14 lg:min-h-[calc(100vh-9rem)] lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-center lg:gap-20 xl:gap-24">
        <div className="max-w-[46rem] lg:py-10">
          <p className="text-[0.68rem] uppercase tracking-[0.36em] text-sand">
            Lorenzo Bellucci Studio
          </p>

          <h1 className="mt-8 font-heading text-[4.25rem] leading-[0.86] text-ivory sm:text-[5.6rem] lg:text-[6.5rem] xl:text-[7.4rem]">
            Imagenes creadas para permanecer con la misma elegancia que el instante.
          </h1>

          <p className="mt-10 max-w-[40rem] text-lg leading-9 text-mist sm:text-xl sm:leading-10">
            Para quienes quieren recordar no solo como fue, sino como se sintio:
            la luz, la espera, el gesto exacto y esa belleza tranquila que vuelve
            cada vez que miras.
          </p>

          <div className="mt-12 flex flex-col gap-4 sm:flex-row">
            <ButtonLink href="/contacto" label="Solicitar propuesta" />
            <ButtonLink href="/portfolio" label="Ver portfolio" variant="ghost" />
          </div>
        </div>

        <div className="lg:flex lg:justify-end">
          <figure className="relative w-full overflow-hidden rounded-[2.4rem] border border-white/10 bg-white/[0.035] shadow-[0_38px_120px_rgba(0,0,0,0.48)] lg:max-w-[42rem]">
            <div className="relative min-h-[32rem] w-full sm:min-h-[42rem] lg:min-h-[calc(100vh-10rem)] lg:max-h-[820px]">
              <Image
                src={heroImage}
                alt="Imagen principal editorial de Lorenzo Bellucci Studio con atmosfera cinematografica"
                fill
                priority
                sizes="(min-width: 1280px) 48vw, (min-width: 1024px) 46vw, 100vw"
                className="object-cover object-center"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/42 via-transparent to-black/8" />
            </div>
          </figure>
        </div>
      </div>
    </section>
  );
}
