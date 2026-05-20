import { PageIntro } from "@/components/ui/page-intro";
import { PortfolioShowcase } from "@/sections/portfolio/portfolio-showcase";

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Un archivo visual preparado para fotografias reales, grandes y precisas."
        description="Esta seccion queda lista para incorporar imagenes finales desde public/images/portfolio sin rehacer la composicion. La direccion visual mantiene un tono sobrio, espacioso y editorial."
      />
      <PortfolioShowcase />
    </>
  );
}
