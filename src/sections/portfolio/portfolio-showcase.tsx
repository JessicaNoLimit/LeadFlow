import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/container";
import womanImage from "@/images/mujer2.png";
import coupleImage from "@/images/pareja.png";
import productImage from "@/images/producto.png";
import heroImage from "@/images/imagenmujerprincipal.png";
import lorenzoImage from "@/images/lorenzo.png";

const portfolioItems: Array<{
  title: string;
  category: string;
  image: StaticImageData;
  alt: string;
  className?: string;
  aspectClassName?: string;
}> = [
  {
    title: "Retrato editorial",
    category: "Portrait",
    image: womanImage,
    alt: "Retrato editorial femenino con direccion artistica y luz suave",
    className: "xl:row-span-2",
    aspectClassName: "aspect-[4/5] xl:h-full",
  },
  {
    title: "Celebracion intima",
    category: "Wedding",
    image: coupleImage,
    alt: "Pareja fotografiada en un reportaje emocional de estilo cinematografico",
    aspectClassName: "aspect-[16/10]",
  },
  {
    title: "Producto premium",
    category: "Commercial",
    image: productImage,
    alt: "Fotografia de producto con composicion sobria para marca premium",
    aspectClassName: "aspect-[16/10]",
  },
  {
    title: "Presencia serena",
    category: "Editorial",
    image: heroImage,
    alt: "Retrato principal con estetica editorial de Lorenzo Bellucci Studio",
  },
  {
    title: "Mirada de autor",
    category: "Studio",
    image: lorenzoImage,
    alt: "Retrato de Lorenzo Bellucci en el contexto del estudio fotografico",
  },
];

function PortfolioImage({
  item,
}: Readonly<{
  item: (typeof portfolioItems)[number];
}>) {
  return (
    <figure
      className={`group relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_24px_70px_rgba(0,0,0,0.28)] transition duration-500 hover:-translate-y-1 hover:border-sand/20 ${item.aspectClassName ?? "aspect-[4/5]"} ${item.className ?? ""}`}
    >
      <Image
        src={item.image}
        alt={item.alt}
        fill
        sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
        className="object-cover transition duration-700 group-hover:scale-[1.03]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/62 via-black/8 to-transparent" />
      <figcaption className="absolute bottom-6 left-6 right-6">
        <p className="text-[0.65rem] uppercase tracking-[0.28em] text-sand">
          {item.category}
        </p>
        <p className="mt-2 font-heading text-2xl text-ivory">{item.title}</p>
      </figcaption>
    </figure>
  );
}

export function PortfolioShowcase() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {portfolioItems.map((item) => (
            <PortfolioImage key={item.title} item={item} />
          ))}
        </div>
      </Container>
    </section>
  );
}
