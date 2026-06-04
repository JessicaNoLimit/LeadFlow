export function LorenzoFooter() {
  return (
    <footer className="border-t border-stone-100 bg-white px-8 py-20">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-8 md:flex-row">
        <div className="font-heading text-xl uppercase tracking-[0.24em] text-stone-800">
          Lorenzo Bellucci
        </div>
        <div className="flex flex-wrap justify-center gap-8 text-[0.62rem] font-medium uppercase tracking-[0.2em] text-stone-400 md:gap-12">
          <a href="#contacto" className="transition hover:text-stone-900">
            Instagram
          </a>
          <a href="#portfolio" className="transition hover:text-stone-900">
            Vogue Portfolio
          </a>
          <a href="#contacto" className="transition hover:text-stone-900">
            LinkedIn
          </a>
        </div>
        <div className="text-[0.62rem] uppercase tracking-[0.2em] text-stone-400">
          2026 - Lorenzo Bellucci Studio
        </div>
      </div>
    </footer>
  );
}
