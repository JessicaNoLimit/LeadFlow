"use client";

import { useRouter } from "next/navigation";
import { createSupabaseBrowserAuthClient } from "@/lib/supabase/browser";

export function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowserAuthClient();
    await supabase.auth.signOut();
    router.replace("/login");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleLogout}
      className="rounded-full border border-white/12 px-4 py-2 text-[0.7rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand hover:text-sand"
    >
      Cerrar sesion
    </button>
  );
}
