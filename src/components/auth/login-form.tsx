"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { createSupabaseBrowserAuthClient } from "@/lib/supabase/browser";

const invalidCredentialsMessage =
  "No hemos podido iniciar sesion con esas credenciales. Revisa el email y la contrasena.";
const missingCredentialsMessage =
  "Introduce tu email y contrasena para acceder al CRM.";

export function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setError(null);

    if (!email.trim() || !password) {
      setError(missingCredentialsMessage);
      return;
    }

    setIsSubmitting(true);

    const supabase = createSupabaseBrowserAuthClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    });

    if (signInError) {
      setError(invalidCredentialsMessage);
      setIsSubmitting(false);
      return;
    }

    const nextPath = searchParams.get("next");

    router.replace(nextPath && nextPath.startsWith("/") ? nextPath : "/dashboard");
    router.refresh();
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div>
        <label
          className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72"
          htmlFor="email"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition placeholder:text-mist/42 focus:border-sand"
          placeholder="admin@lorenzobellucci.studio"
          autoComplete="email"
          required
          disabled={isSubmitting}
        />
      </div>

      <div>
        <label
          className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72"
          htmlFor="password"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition placeholder:text-mist/42 focus:border-sand"
          placeholder="Tu clave privada"
          autoComplete="current-password"
          required
          disabled={isSubmitting}
        />
      </div>

      {error ? <p className="text-sm text-[#d2917f]">{error}</p> : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="inline-flex min-h-14 w-full items-center justify-center rounded-full border border-sand bg-sand px-8 text-sm uppercase tracking-[0.18em] text-ink transition hover:bg-transparent hover:text-sand disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Iniciando sesion..." : "Acceder al CRM"}
      </button>
    </form>
  );
}
