const steps = [
  ["01", "Primera Conversacion", "Entendemos tus deseos y la vision que quieres proyectar."],
  ["02", "Planificacion", "Curaduria de localizaciones, estilismo y narrativa visual."],
  ["03", "Sesion Fotografica", "Una experiencia fluida, natural y sin presiones."],
  ["04", "Edicion Artesanal", "Cada imagen es tratada individualmente, respetando su alma."],
  ["05", "Entrega Final", "Tus recuerdos presentados en formatos de la mas alta calidad."],
];

export function LorenzoProcess() {
  return (
    <section className="bg-stone-950 px-8 py-32 text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 text-center">
          <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-[#d7c6a8]">
            Metodologia
          </span>
          <h2 className="font-heading text-4xl font-light md:text-5xl">
            El Camino a la Excelencia
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-12 md:grid-cols-3 lg:grid-cols-5">
          {steps.map(([number, title, description], index) => (
            <article
              key={number}
              data-reveal
              className="translate-y-8 opacity-0 transition duration-1000 ease-out"
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <div className="mb-8 flex h-12 w-12 items-center justify-center rounded-full border border-[#d7c6a8]/40 font-heading text-sm text-[#d7c6a8]">
                {number}
              </div>
              <h3 className="mb-4 font-heading text-xl font-light">{title}</h3>
              <p className="text-sm font-light leading-relaxed text-white/62">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
