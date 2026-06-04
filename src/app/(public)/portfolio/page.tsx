import { PageIntro } from "@/components/ui/page-intro";
import { PortfolioShowcase } from "@/sections/portfolio/portfolio-showcase";

export default function PortfolioPage() {
  return (
    <>
      <PageIntro
        eyebrow="Portfolio"
        title="Un archivo visual de retratos, celebraciones y encargos comerciales."
        description="Una seleccion de imagenes construida desde la calma, la direccion de luz y una composicion editorial precisa."
      />
      <PortfolioShowcase />
    </>
  );
}
