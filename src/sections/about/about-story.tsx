import { Container } from "@/components/ui/container";
import { ImagePlaceholder } from "@/components/ui/image-placeholder";

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
                Esta pagina queda preparada para incorporar fotografia real del
                autor o del estudio desde <span className="text-ivory">public/images/studio</span>.
              </p>
            </div>
          </div>

          <ImagePlaceholder
            label="Studio Portrait"
            className="mx-auto w-full max-w-[28rem]"
          />
        </div>
      </Container>
    </section>
  );
}
