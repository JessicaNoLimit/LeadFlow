import Image from "next/image";
import heroImage from "@/images/imagen-principal.png";

export function LorenzoHero() {
  return (
    <section
      id="hero"
      className="relative flex h-screen min-h-[680px] items-center justify-center overflow-hidden bg-stone-950"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Fotografia cinematografica de Lorenzo Bellucci Studio"
          fill
          priority
          sizes="100vw"
          className="scale-105 object-cover opacity-60 transition duration-[10000ms] hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/46 via-stone-950/12 to-stone-950/24" />
      </div>

      <div className="relative z-10 max-w-5xl px-6 text-center">
        <h1
          data-reveal
          className="translate-y-8 font-heading text-5xl font-light leading-tight text-white opacity-0 transition duration-1000 ease-out sm:text-6xl md:text-8xl"
        >
          La fotografia que permanece <br className="hidden md:block" /> cuando el tiempo avanza.
        </h1>
        <p
          data-reveal
          className="mx-auto mt-8 max-w-2xl translate-y-8 text-lg font-light leading-8 tracking-wide text-[#d7c6a8] opacity-0 transition duration-1000 ease-out [transition-delay:200ms] md:text-xl"
        >
          Capturando la esencia de lo efimero para convertirla en un legado visual eterno.
        </p>
        <div
          data-reveal
          className="mt-12 flex translate-y-8 flex-col items-center justify-center gap-6 opacity-0 transition duration-1000 ease-out [transition-delay:400ms] md:flex-row"
        >
          <a
            href="#portfolio"
            className="inline-flex min-h-14 items-center justify-center border border-white/90 bg-white/[0.06] px-10 text-sm uppercase tracking-[0.24em] text-[#f4efe8] transition duration-500 hover:bg-white hover:text-stone-900"
          >
            Ver Portfolio
          </a>
          <a
            href="#contacto"
            className="inline-flex min-h-14 items-center justify-center border border-[#d7c6a8] bg-[#d7c6a8] px-10 text-sm font-semibold uppercase tracking-[0.24em] text-stone-950 transition duration-500 hover:bg-transparent hover:text-[#d7c6a8]"
          >
            Reservar Experiencia
          </a>
        </div>
      </div>

      <div
        aria-hidden="true"
        className="absolute bottom-10 left-1/2 h-10 w-px -translate-x-1/2 overflow-hidden bg-white/20"
      >
        <span className="block h-1/2 w-px animate-pulse bg-white/70" />
      </div>
    </section>
  );
}
