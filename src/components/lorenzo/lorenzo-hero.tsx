import Image from "next/image";
import heroImage from "@/images/imagen-principal.png";

export function LorenzoHero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-[620px] items-center justify-center overflow-hidden bg-stone-950 sm:h-screen sm:min-h-[680px]"
    >
      <div className="absolute inset-0">
        <Image
          src={heroImage}
          alt="Fotografia cinematografica de Lorenzo Bellucci Studio"
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-60 transition duration-[10000ms] md:scale-105 md:hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/46 via-stone-950/12 to-stone-950/24" />
      </div>

      <div className="relative z-10 w-full max-w-5xl px-5 text-center sm:px-6">
        <h1
          data-reveal
          className="translate-y-8 font-heading text-[2.65rem] font-light leading-[1.02] text-white opacity-0 transition duration-1000 ease-out min-[375px]:text-5xl sm:text-6xl md:text-8xl"
        >
          La fotografia que permanece <br className="hidden md:block" /> cuando el tiempo avanza.
        </h1>
        <p
          data-reveal
          className="mx-auto mt-6 max-w-2xl translate-y-8 text-base font-light leading-7 tracking-wide text-[#d7c6a8] opacity-0 transition duration-1000 ease-out [transition-delay:200ms] sm:mt-8 sm:text-lg sm:leading-8 md:text-xl"
        >
          Capturando la esencia de lo efimero para convertirla en un legado visual eterno.
        </p>
        <div
          data-reveal
          className="mt-9 flex translate-y-8 flex-col items-center justify-center gap-4 opacity-0 transition duration-1000 ease-out [transition-delay:400ms] sm:mt-12 sm:gap-6 md:flex-row"
        >
          <a
            href="#portfolio"
            className="inline-flex min-h-12 items-center justify-center border border-white/90 bg-white/[0.06] px-7 text-xs uppercase tracking-[0.2em] text-[#f4efe8] transition duration-500 hover:bg-white hover:text-stone-900 sm:min-h-14 sm:px-10 sm:text-sm sm:tracking-[0.24em]"
          >
            Ver Portfolio
          </a>
          <a
            href="#contacto"
            className="inline-flex min-h-12 items-center justify-center border border-[#d7c6a8] bg-[#d7c6a8] px-7 text-xs font-semibold uppercase tracking-[0.2em] text-stone-950 transition duration-500 hover:bg-transparent hover:text-[#d7c6a8] sm:min-h-14 sm:px-10 sm:text-sm sm:tracking-[0.24em]"
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
