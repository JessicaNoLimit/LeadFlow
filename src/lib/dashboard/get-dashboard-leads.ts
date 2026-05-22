import { headers } from "next/headers";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadsApiResponse =
  | {
      success: true;
      leads: Lead[];
    }
  | {
      success: false;
      error: string;
    };

async function getBaseUrl() {
  const headerStore = await headers();
  const host = headerStore.get("x-forwarded-host") ?? headerStore.get("host");
  const protocol = headerStore.get("x-forwarded-proto") ?? "http";

  if (!host) {
    throw new Error("Missing host header");
  }

  return `${protocol}://${host}`;
}

export async function getDashboardLeads() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/leads`, {
    cache: "no-store",
  });

  const result = (await response.json()) as LeadsApiResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.success ? "No se pudieron obtener los leads" : result.error,
    );
  }

  return result.leads;
}
