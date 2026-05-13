import { LeadForm } from "@/components/forms/lead-form";
import { Container } from "@/components/ui/container";

type ContactFormSectionProps = {
  className?: string;
};

export function ContactFormSection({
  className = "mt-20",
}: ContactFormSectionProps) {
  return (
    <section id="contacto" className={className}>
      <Container>
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.035] px-8 py-10 sm:px-10 lg:px-12">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-14">
            <div className="max-w-xl">
              <p className="text-[0.68rem] uppercase tracking-[0.32em] text-sand">
                Contacto
              </p>
              <h2 className="mt-4 font-heading text-4xl text-ivory sm:text-5xl">
                Cuentanos la historia que quieres conservar
              </h2>
              <p className="mt-6 text-base leading-8 text-mist sm:text-lg">
                Cada sesion comienza con una conversacion. Completa el formulario
                y prepararemos una propuesta adaptada a tu vision.
              </p>
              <div className="mt-10 rounded-[1.75rem] border border-white/8 bg-black/20 p-6">
                <p className="text-[0.68rem] uppercase tracking-[0.28em] text-mist/72">
                  Direccion del estudio
                </p>
                <p className="mt-4 font-heading text-3xl text-ivory">
                  Lorenzo Bellucci Studio
                </p>
                <p className="mt-3 text-sm leading-7 text-mist/74">
                  Una propuesta editorial, serena y precisa para bodas, retratos
                  y encargos visuales con sensibilidad contemporanea.
                </p>
              </div>
            </div>

            <div className="rounded-[1.9rem] border border-white/10 bg-black/16 p-6 sm:p-8">
              <LeadForm />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
