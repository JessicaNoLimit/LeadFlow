"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { persistToast, showToast } from "@/lib/toast";
import { createSupabaseBrowserAuthClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);

    try {
      const supabase = createSupabaseBrowserAuthClient();
      await supabase.auth.signOut();
      persistToast("Sesion cerrada.", "info");
      router.replace("/login");
      router.refresh();
    } catch {
      showToast("No se pudo cerrar la sesion.", "error");
      setIsLoggingOut(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isLoggingOut ? "Cerrando..." : "Cerrar sesion"}
    </button>
  );
}
