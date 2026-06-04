const services = [
  {
    number: "01",
    title: "Retratos Editoriales",
    description:
      "Para quienes buscan una imagen que trascienda lo convencional y se acerque al arte purista.",
  },
  {
    number: "02",
    title: "Bodas Exclusivas",
    description:
      "Documentacion cinematografica de uniones unicas, centrada en la emocion y el refinamiento.",
  },
  {
    number: "03",
    title: "Marca Personal",
    description:
      "Elevamos la identidad de lideres y creativos a traves de una narrativa visual coherente.",
  },
  {
    number: "04",
    title: "Parejas y Compromisos",
    description:
      "Sesiones intimas disenadas para capturar la complicidad en entornos arquitectonicos o naturales.",
  },
];

export function LorenzoServices() {
  return (
    <section id="servicios" className="bg-white px-8 py-32">
      <div className="mx-auto max-w-7xl">
        <div className="mb-24 flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div>
            <span className="mb-4 block text-xs uppercase tracking-[0.3em] text-stone-400">
              Servicios
            </span>
            <h2 className="font-heading text-4xl font-light text-stone-900 md:text-5xl">
              Propuestas de Exclusividad
            </h2>
          </div>
          <p className="max-w-sm text-sm font-light leading-7 text-stone-500">
            Direccion visual, calma y una experiencia cuidada para proyectos que piden presencia.
          </p>
        </div>

        <div className="grid grid-cols-1 border border-stone-100 bg-stone-100 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article
              key={service.number}
              data-reveal
              className="group relative translate-y-8 overflow-hidden bg-white p-10 opacity-0 transition duration-1000 ease-out hover:bg-stone-50 md:p-12"
            >
              <span className="mb-8 block text-sm text-stone-300">{service.number}</span>
              <h3 className="mb-6 font-heading text-2xl font-light text-stone-900">
                {service.title}
              </h3>
              <p className="mb-12 text-sm font-light leading-relaxed text-stone-500">
                {service.description}
              </p>
              <a
                href="#contacto"
                className="inline-flex items-center text-xs font-medium uppercase tracking-[0.22em] text-stone-900 transition-all duration-500 group-hover:pl-4"
              >
                Saber mas
                <span aria-hidden="true" className="ml-3 opacity-0 transition group-hover:opacity-100">
                  -
                </span>
              </a>
              <span
                aria-hidden="true"
                className="absolute bottom-0 left-0 h-px w-full origin-right scale-x-0 bg-stone-900 transition duration-700 group-hover:origin-left group-hover:scale-x-100"
              />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
