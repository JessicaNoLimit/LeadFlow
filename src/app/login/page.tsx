import Image from "next/image";
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
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top_left,rgba(215,198,168,0.12),transparent_24%),linear-gradient(180deg,#0a0a0a_0%,#111111_100%)]">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(180deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-[size:36px_36px] opacity-20" />

      <header className="relative z-20 border-b border-white/8 bg-[#0d0d0d]/92 backdrop-blur-xl">
        <Container className="flex min-h-20 items-center px-5 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] shadow-[0_12px_40px_rgba(0,0,0,0.35)] sm:h-16 sm:w-16">
              <div className="relative h-10 w-10 sm:h-12 sm:w-12">
                <Image
                  src="/images/brand/leadflow-logo.png"
                  alt="LeadFlow CRM"
                  fill
                  priority
                  sizes="(max-width: 640px) 40px, 48px"
                  className="object-contain"
                />
              </div>
            </div>
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                <p className="font-heading text-xl text-ivory sm:text-2xl">
                  LeadFlow CRM
                </p>
                <span className="rounded-full border border-white/10 bg-white/[0.04] px-2.5 py-1 text-[0.62rem] uppercase tracking-[0.28em] text-mist/70">
                  Private
                </span>
              </div>
              <p className="max-w-[14rem] text-[0.62rem] uppercase tracking-[0.2em] text-mist/58 sm:max-w-none sm:text-[0.68rem] sm:tracking-[0.22em]">
                Panel de gestion de leads y presupuestos
              </p>
            </div>
          </div>
        </Container>
      </header>

      <main className="relative z-10 py-16 sm:py-20 lg:py-24">
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
      </main>
    </div>
  );
}
