import { PageIntro } from "@/components/ui/page-intro";
import { AboutStory } from "@/sections/about/about-story";

export default function SobrePage() {
  return (
    <>
      <PageIntro
        eyebrow="Sobre el estudio"
        title="Una mirada cinematografica con sensibilidad editorial y atencion humana."
        description="Lorenzo Bellucci Studio se construye desde la calma, la direccion artistica y el respeto por las personas fotografiadas. Esta base deja lista la narrativa del autor para futuras imagenes y textos mas profundos."
      />
      <AboutStory />
    </>
  );
}
