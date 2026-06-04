import type { StaticImageData } from "next/image";
import Image from "next/image";
import coupleImage from "@/images/pareja.png";
import portraitImage from "@/images/imagenmujerprincipal.png";
import productImage from "@/images/producto.png";
import womanImage from "@/images/mujer2.png";

type PortfolioItem = {
  title: string;
  category: string;
  image: StaticImageData;
  description: string;
  imageClassName?: string;
};

const portfolioItems: PortfolioItem[] = [
  {
    title: "Villa d'Este, Como",
    category: "Bodas de Lujo",
    image: coupleImage,
    description:
      "Una historia nocturna construida desde la cercania, la arquitectura y el ritmo de la ciudad.",
    imageClassName: "h-[320px] sm:h-[390px] lg:h-[460px] xl:h-[500px]",
  },
  {
    title: "La Elegancia Silenciosa",
    category: "Retrato",
    image: portraitImage,
    description: "Retratos de presencia pausada, dirigidos con una estetica editorial y atemporal.",
    imageClassName: "h-[320px] md:h-[360px] lg:h-[390px]",
  },
  {
    title: "Luz y Sombras",
    category: "Fine Art",
    image: productImage,
    description: "Composiciones contenidas donde textura, volumen y silencio sostienen la imagen.",
    imageClassName: "h-[320px] md:h-[360px] lg:h-[390px]",
  },
  {
    title: "El Encuentro",
    category: "Parejas",
    image: womanImage,
    description: "Una mirada intima a la complicidad, lejos del gesto forzado y cerca de lo esencial.",
    imageClassName: "h-[320px] md:h-[360px] lg:h-[390px]",
  },
];

export function LorenzoPortfolio() {
  const [featuredItem, ...secondaryItems] = portfolioItems;

  return (
    <section id="portfolio" className="bg-[#f9f8f6] px-4 py-24 md:px-8 md:py-28">
      <div className="mx-auto max-w-[1600px]">
        <div className="mb-14 flex flex-col justify-between gap-6 md:mb-16 md:flex-row md:items-baseline">
          <h2 className="font-heading text-6xl font-light text-stone-900 md:text-8xl">
            El Portfolio
          </h2>
          <p className="max-w-sm font-light leading-7 text-stone-500">
            Una seleccion curada de trabajos que definen nuestra vision editorial y atemporal.
          </p>
        </div>

        <div className="space-y-12 md:space-y-14">
          <article
            data-reveal
            className="grid translate-y-8 grid-cols-1 gap-7 opacity-0 transition duration-1000 ease-out lg:grid-cols-[minmax(0,1fr)_minmax(20rem,0.32fr)] lg:items-end"
          >
            <div className={`group relative overflow-hidden bg-stone-200 ${featuredItem.imageClassName}`}>
              <Image
                src={featuredItem.image}
                alt={`${featuredItem.category} - ${featuredItem.title}`}
                fill
                sizes="(min-width: 1024px) 72vw, 100vw"
                className="object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
              />
            </div>

            <div className="border-l border-stone-300 pl-6 md:pl-8">
              <span className="text-xs uppercase tracking-[0.28em] text-stone-400">
                {featuredItem.category}
              </span>
              <h3 className="mt-3 font-heading text-3xl font-light leading-tight text-stone-900 md:text-4xl">
                {featuredItem.title}
              </h3>
              <p className="mt-4 max-w-md text-sm font-light leading-6 text-stone-500">
                {featuredItem.description}
              </p>
            </div>
          </article>

          <div className="grid grid-cols-1 gap-9 md:grid-cols-3 md:gap-7">
            {secondaryItems.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                className="translate-y-8 opacity-0 transition duration-1000 ease-out"
                style={{ transitionDelay: `${index * 90}ms` }}
              >
                <div className={`group relative overflow-hidden bg-stone-200 ${item.imageClassName}`}>
                  <Image
                    src={item.image}
                    alt={`${item.category} - ${item.title}`}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover grayscale transition duration-1000 group-hover:scale-105 group-hover:grayscale-0"
                  />
                </div>

                <div className="mt-5 border-t border-stone-200 pt-4">
                  <span className="text-xs uppercase tracking-[0.24em] text-stone-400">
                    {item.category}
                  </span>
                  <h3 className="mt-2 font-heading text-2xl font-light text-stone-900">
                    {item.title}
                  </h3>
                  <p className="mt-3 max-w-lg text-sm font-light leading-6 text-stone-500">
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
