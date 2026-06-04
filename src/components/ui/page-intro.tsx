import { ReactNode } from "react";
import { Container } from "@/components/ui/container";

type PageIntroProps = {
  eyebrow: string;
  title: string;
  description: string;
  aside?: ReactNode;
};

export function PageIntro({
  eyebrow,
  title,
  description,
  aside,
}: PageIntroProps) {
  return (
    <section className="relative py-14 sm:py-20 lg:py-24">
      <Container className="px-4 sm:px-10 lg:px-16">
        <div className="grid min-w-0 gap-12 lg:grid-cols-[minmax(0,1.1fr)_minmax(280px,0.9fr)] lg:items-end">
          <div className="min-w-0 max-w-3xl">
            <p className="text-[0.68rem] uppercase tracking-[0.26em] text-sand sm:tracking-[0.34em]">
              {eyebrow}
            </p>
            <h1 className="mt-6 max-w-full font-heading text-[2.65rem] leading-[1] text-ivory min-[375px]:text-5xl sm:text-6xl lg:text-[5rem]">
              {title}
            </h1>
            <p className="mt-8 max-w-2xl text-base leading-8 text-mist sm:text-lg">
              {description}
            </p>
          </div>

          {aside ? <div>{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
