import Image, { type StaticImageData } from "next/image";
import { Container } from "@/components/ui/container";
import womanImage from "@/images/mujer2.png";
import coupleImage from "@/images/pareja.png";
import productImage from "@/images/producto.png";
import heroImage from "@/images/imagenmujerprincipal.png";

const services: Array<{
  title: string;
  image: StaticImageData;
  alt: string;
}> = [
  {
    title: "Boda editorial",
    image: coupleImage,
    alt: "Pareja en reportaje de boda editorial con atmosfera intima",
  },
  {
    title: "Retrato personal",
    image: womanImage,
    alt: "Retrato personal femenino con direccion editorial",
  },
  {
    title: "Marca personal",
    image: heroImage,
    alt: "Retrato para marca personal con presencia elegante y cinematografica",
  },
  {
    title: "Evento privado",
    image: coupleImage,
    alt: "Reportaje emocional para evento privado y celebracion",
  },
  {
    title: "Fotografia de producto",
    image: productImage,
    alt: "Fotografia de producto premium con luz controlada",
  },
  {
    title: "Sesion lifestyle",
    image: womanImage,
    alt: "Sesion lifestyle con estetica editorial y luz natural",
  },
];

export function ServicesOverview() {
  return (
    <section className="pb-20 sm:pb-24">
      <Container>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.03] shadow-[0_22px_60px_rgba(0,0,0,0.2)] transition duration-500 hover:-translate-y-1 hover:border-sand/18"
            >
              <div className="relative aspect-[16/11] overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  sizes="(min-width: 1280px) 31vw, (min-width: 768px) 48vw, 100vw"
                  className="object-cover transition duration-700 group-hover:scale-[1.03]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
              </div>
              <div className="p-8">
                <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h2 className="mt-5 font-heading text-3xl text-ivory">
                  {service.title}
                </h2>
                <p className="mt-4 text-sm leading-7 text-mist/76">
                  Una experiencia fotografica sobria, precisa y pensada para cuidar
                  tanto la narrativa visual como la atmosfera del encargo.
                </p>
              </div>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}
