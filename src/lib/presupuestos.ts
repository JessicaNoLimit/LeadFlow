import {
  normalizeOptionalText,
  normalizeRequiredText,
} from "@/lib/leads";
import type { Database } from "@/lib/supabase/types";

export type PresupuestoInsert = Database["public"]["Tables"]["presupuestos"]["Insert"];
export type PresupuestoUpdate = Database["public"]["Tables"]["presupuestos"]["Update"];

type CreatePresupuestoPayload = {
  lead_id?: unknown;
  titulo?: unknown;
  descripcion?: unknown;
  importe?: unknown;
  estado?: unknown;
};

type UpdatePresupuestoPayload = {
  titulo?: unknown;
  descripcion?: unknown;
  importe?: unknown;
  estado?: unknown;
};

export const presupuestoStatuses = [
  "borrador",
  "enviado",
  "aceptado",
  "rechazado",
] as const;

const presupuestoToLeadStatusMap = {
  enviado: "presupuesto_enviado",
  aceptado: "aceptado",
  rechazado: "rechazado",
} as const;

const uuidPattern =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isValidPresupuestoStatus(
  value: string,
): value is (typeof presupuestoStatuses)[number] {
  return presupuestoStatuses.includes(value as (typeof presupuestoStatuses)[number]);
}

function normalizeOptionalUuid(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return uuidPattern.test(normalizedValue) ? normalizedValue : null;
}

function normalizeImporte(value: unknown) {
  if (typeof value === "number") {
    return Number.isFinite(value) && value > 0 ? Number(value.toFixed(2)) : null;
  }

  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim().replace(",", ".");

  if (!normalizedValue) {
    return null;
  }

  const parsedValue = Number(normalizedValue);
  return Number.isFinite(parsedValue) && parsedValue > 0
    ? Number(parsedValue.toFixed(2))
    : null;
}

export function buildCreatePresupuestoPayload(payload: CreatePresupuestoPayload) {
  const titulo = normalizeRequiredText(payload.titulo);

  if (!titulo) {
    return { error: "El titulo es obligatorio." } as const;
  }

  const importe = normalizeImporte(payload.importe);

  if (importe === null) {
    return { error: "Debes indicar un importe valido mayor que 0." } as const;
  }

  const estado = payload.estado === undefined
    ? "borrador"
    : normalizeRequiredText(payload.estado);

  if (!isValidPresupuestoStatus(estado)) {
    return { error: "El estado enviado no es valido." } as const;
  }

  if (
    payload.lead_id !== undefined &&
    typeof payload.lead_id === "string" &&
    payload.lead_id.trim() &&
    normalizeOptionalUuid(payload.lead_id) === null
  ) {
    return { error: "El lead_id debe ser un UUID valido o quedar vacio." } as const;
  }

  const nextPayload: PresupuestoInsert = {
    lead_id: normalizeOptionalUuid(payload.lead_id),
    titulo,
    descripcion: normalizeOptionalText(payload.descripcion),
    importe,
    estado,
  };

  return { payload: nextPayload } as const;
}

export function buildUpdatePresupuestoPayload(payload: UpdatePresupuestoPayload) {
  const nextPayload: PresupuestoUpdate = {};

  if (payload.titulo !== undefined) {
    const titulo = normalizeRequiredText(payload.titulo);

    if (!titulo) {
      return { error: "El titulo no puede estar vacio." } as const;
    }

    nextPayload.titulo = titulo;
  }

  if (payload.descripcion !== undefined) {
    nextPayload.descripcion = normalizeOptionalText(payload.descripcion);
  }

  if (payload.importe !== undefined) {
    const importe = normalizeImporte(payload.importe);

    if (importe === null) {
      return { error: "Debes indicar un importe valido mayor que 0." } as const;
    }

    nextPayload.importe = importe;
  }

  if (payload.estado !== undefined) {
    const estado = normalizeRequiredText(payload.estado);

    if (!isValidPresupuestoStatus(estado)) {
      return { error: "El estado enviado no es valido." } as const;
    }

    nextPayload.estado = estado;
  }

  if (Object.keys(nextPayload).length === 0) {
    return { error: "No se enviaron campos validos para actualizar." } as const;
  }

  return { payload: nextPayload } as const;
}

export function getLeadStatusForPresupuestoStatus(
  status: string,
): "presupuesto_enviado" | "aceptado" | "rechazado" | null {
  return presupuestoToLeadStatusMap[
    status as keyof typeof presupuestoToLeadStatusMap
  ] ?? null;
}
