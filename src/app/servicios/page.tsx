import { PageIntro } from "@/components/ui/page-intro";
import { ServicesOverview } from "@/sections/services/services-overview";

export default function ServiciosPage() {
  return (
    <>
      <PageIntro
        eyebrow="Servicios"
        title="Encargos visuales pensados para proyectos personales, marcas y celebraciones."
        description="Cada servicio se plantea con una mirada editorial y una ejecucion serena. La pagina queda preparada para evolucionar con detalle, casos reales y futuras propuestas de valor."
      />
      <ServicesOverview />
    </>
  );
}
