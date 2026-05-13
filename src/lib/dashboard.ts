import { headers } from "next/headers";
import type { Database } from "@/lib/supabase/types";

export type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadsListResponse =
  | {
      success: true;
      leads: Lead[];
    }
  | {
      success: false;
      error: string;
    };

type LeadDetailResponse =
  | {
      success: true;
      lead: Lead;
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

export async function fetchDashboardLeads() {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/leads`, {
    cache: "no-store",
  });

  const result = (await response.json()) as LeadsListResponse;

  if (!response.ok || !result.success) {
    throw new Error(
      result.success ? "No se pudieron obtener los leads" : result.error,
    );
  }

  return result.leads;
}

export async function fetchDashboardLead(id: string) {
  const baseUrl = await getBaseUrl();
  const response = await fetch(`${baseUrl}/api/leads/${id}`, {
    cache: "no-store",
  });

  const result = (await response.json()) as LeadDetailResponse;

  if (!response.ok) {
    const error = result.success ? "No se pudo obtener el lead" : result.error;
    const enrichedError = new Error(error);
    (enrichedError as Error & { status?: number }).status = response.status;
    throw enrichedError;
  }

  if (!result.success) {
    throw new Error(result.error);
  }

  return result.lead;
}
