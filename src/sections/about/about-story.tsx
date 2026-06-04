import Image from "next/image";
import { Container } from "@/components/ui/container";
import lorenzoImage from "@/images/lorenzo.png";

export function AboutStory() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(340px,0.7fr)] lg:items-center">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.03] p-8 sm:p-10">
            <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
              Filosofia del estudio
            </p>
            <div className="mt-6 space-y-6 text-base leading-8 text-mist sm:text-lg">
              <p>
                Lorenzo Bellucci Studio entiende la fotografia como una forma de
                direccion silenciosa: cada gesto, cada textura y cada luz deben
                sostener una emocion real.
              </p>
              <p>
                El estilo combina un pulso editorial con una mirada humana y
                cercana. La intencion no es solo documentar, sino construir una
                memoria visual elegante, honesta y duradera.
              </p>
              <p>
                Desde el estudio, cada encargo se plantea con una preparacion
                tranquila, una direccion clara y una entrega cuidada hasta el
                ultimo detalle.
              </p>
            </div>
          </div>

          <figure className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_28px_80px_rgba(0,0,0,0.34)]">
            <Image
              src={lorenzoImage}
              alt="Retrato de Lorenzo Bellucci, fotografo y director creativo del estudio"
              fill
              sizes="(min-width: 1024px) 28rem, 100vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/5" />
            <figcaption className="absolute bottom-6 left-6 right-6">
              <p className="text-[0.65rem] uppercase tracking-[0.28em] text-sand">
                Direccion creativa
              </p>
              <p className="mt-2 font-heading text-2xl text-ivory">
                Lorenzo Bellucci
              </p>
            </figcaption>
          </figure>
        </div>
      </Container>
    </section>
  );
}
