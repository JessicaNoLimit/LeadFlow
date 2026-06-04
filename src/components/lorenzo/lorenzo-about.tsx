import Image from "next/image";
import lorenzoImage from "@/images/lorenzo.png";

export function LorenzoAbout() {
  return (
    <section id="sobre-mi" className="bg-white px-8 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-20 lg:grid-cols-2">
        <div data-reveal className="relative translate-y-8 opacity-0 transition duration-1000 ease-out">
          <div className="relative aspect-[4/5] overflow-hidden bg-stone-100">
            <Image
              src={lorenzoImage}
              alt="Retrato editorial de Lorenzo Bellucci"
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="absolute -bottom-10 -right-10 hidden h-40 w-40 items-center justify-center border border-stone-200 bg-white p-8 md:flex">
            <p className="text-center text-[0.62rem] uppercase leading-relaxed tracking-[0.22em] text-stone-600">
              Authenticity <br /> is the new <br /> Luxury
            </p>
          </div>
        </div>

        <div
          data-reveal
          className="translate-y-8 opacity-0 transition duration-1000 ease-out [transition-delay:200ms]"
        >
          <span className="mb-8 block text-xs uppercase tracking-[0.3em] text-stone-400">
            La Historia
          </span>
          <h2 className="mb-12 font-heading text-5xl font-light text-stone-900 md:text-6xl">
            Lorenzo Bellucci
          </h2>
          <div className="space-y-8 text-lg font-light leading-relaxed text-stone-600">
            <p>
              Nacido entre los claroscuros de la Toscana y formado en las capitales de la moda
              europea, Lorenzo ha dedicado las ultimas dos decadas a perfeccionar una mirada que
              rechaza lo artificial.
            </p>
            <p>
              Su trabajo ha sido publicado en cabeceras internacionales, pero su verdadera pasion
              reside en la intimidad de las historias personales.
            </p>
            <p className="font-heading text-2xl italic text-stone-800">
              &ldquo;Mi objetivo no es que te veas bien en una foto. Mi objetivo es que te
              reconozcas en una obra eterna.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
