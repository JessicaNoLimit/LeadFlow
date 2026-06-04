export function LorenzoCta() {
  return (
    <section className="relative overflow-hidden bg-stone-950 px-8 py-44 text-center md:py-60">
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" />
      <div data-reveal className="relative z-10 mx-auto max-w-4xl translate-y-8 opacity-0 transition duration-1000 ease-out">
        <h2 className="mb-16 font-heading text-5xl font-light leading-tight text-[#d7c6a8] md:text-8xl">
          Tu historia merece algo mas que unas fotografias.
        </h2>
        <a
          href="#contacto"
          className="inline-flex min-h-16 items-center justify-center border border-[#d7c6a8] bg-[#d7c6a8] px-12 text-sm font-semibold uppercase tracking-[0.3em] text-stone-950 transition duration-500 hover:bg-transparent hover:text-[#d7c6a8]"
        >
          Comenzar Conversacion
        </a>
      </div>
    </section>
  );
}
