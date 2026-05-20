import { PageIntro } from "@/components/ui/page-intro";
import { ContactFormSection } from "@/sections/contact/contact-form-section";

export default function ContactoPage() {
  return (
    <>
      <PageIntro
        eyebrow="Contacto"
        title="La conversacion comienza aqui."
        description="Comparte los detalles de tu sesion, celebracion o encargo. El formulario mantiene la conexion real con LeadFlow para que cada solicitud llegue al sistema con una base limpia y profesional."
      />
      <ContactFormSection className="pb-20 sm:pb-24" />
    </>
  );
}
