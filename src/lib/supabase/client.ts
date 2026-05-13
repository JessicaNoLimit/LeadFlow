import { createClient } from "@supabase/supabase-js";
import { env } from "@/lib/env";
import type { Database } from "@/lib/supabase/types";

export function createSupabaseBrowserClient() {
  return createClient<Database>(
    env.nextPublicSupabaseUrl,
    env.nextPublicSupabaseAnonKey,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  );
}
