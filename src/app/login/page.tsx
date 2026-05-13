import { redirect } from "next/navigation";
import { LoginForm } from "@/components/auth/login-form";
import { Container } from "@/components/ui/container";
import { createSupabaseServerAuthClient } from "@/lib/supabase/server-auth";

export default async function LoginPage() {
  const supabase = await createSupabaseServerAuthClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <Container>
        <div className="mx-auto grid max-w-5xl gap-10 rounded-[2.2rem] border border-white/10 bg-white/[0.035] p-8 sm:p-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(360px,0.8fr)] lg:p-12">
          <div className="max-w-xl">
            <p className="text-[0.68rem] uppercase tracking-[0.34em] text-sand">
              Area privada
            </p>
            <h1 className="mt-6 font-heading text-5xl leading-[0.92] text-ivory sm:text-6xl">
              Acceso reservado para la gestion interna del estudio.
            </h1>
            <p className="mt-8 text-base leading-8 text-mist sm:text-lg">
              Esta primera capa privada prepara el CRM de LeadFlow con una entrada
              sobria, protegida y coherente con la direccion editorial del proyecto.
            </p>
          </div>

          <div className="rounded-[1.9rem] border border-white/10 bg-black/16 p-6 sm:p-8">
            <LoginForm />
          </div>
        </div>
      </Container>
    </section>
  );
}
