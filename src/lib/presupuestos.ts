import {
  isValidEmail,
  normalizeOptionalText,
  normalizeRequiredText,
} from "@/lib/leads";
import type { Database } from "@/lib/supabase/types";

export type PresupuestoInsert = Database["public"]["Tables"]["presupuestos"]["Insert"];
export type PresupuestoUpdate = Database["public"]["Tables"]["presupuestos"]["Update"];

type CreatePresupuestoPayload = {
  lead_id?: unknown;
  cliente_nombre?: unknown;
  cliente_email?: unknown;
  cliente_telefono?: unknown;
  fecha_evento?: unknown;
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
  fecha_evento?: unknown;
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

function normalizeOptionalDate(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  return /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue) ? normalizedValue : null;
}

export function buildCreatePresupuestoPayload(payload: CreatePresupuestoPayload) {
  const leadId = normalizeOptionalUuid(payload.lead_id);
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

  const clienteNombre = normalizeRequiredText(payload.cliente_nombre);
  const clienteEmail = normalizeRequiredText(payload.cliente_email).toLowerCase();
  const clienteTelefono = normalizeOptionalText(payload.cliente_telefono);

  if (
    payload.fecha_evento !== undefined &&
    typeof payload.fecha_evento === "string" &&
    payload.fecha_evento.trim() &&
    normalizeOptionalDate(payload.fecha_evento) === null
  ) {
    return { error: "La fecha prevista de la sesion no es valida." } as const;
  }

  const fechaEvento = normalizeOptionalDate(payload.fecha_evento);

  if (!leadId) {
    if (!clienteNombre && !clienteEmail) {
      return { error: "Selecciona un lead existente o indica un cliente manual." } as const;
    }

    if (!clienteNombre) {
      return { error: "Debes indicar el nombre del cliente manual." } as const;
    }

    if (!isValidEmail(clienteEmail)) {
      return { error: "Debes indicar un email valido para el cliente manual." } as const;
    }
  }

  const nextPayload: PresupuestoInsert = {
    lead_id: leadId,
    cliente_nombre: leadId ? null : clienteNombre,
    cliente_email: leadId ? null : clienteEmail,
    cliente_telefono: leadId ? null : clienteTelefono,
    fecha_evento: fechaEvento,
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

  if (payload.fecha_evento !== undefined) {
    if (
      typeof payload.fecha_evento === "string" &&
      payload.fecha_evento.trim() &&
      normalizeOptionalDate(payload.fecha_evento) === null
    ) {
      return { error: "La fecha prevista de la sesion no es valida." } as const;
    }

    nextPayload.fecha_evento = normalizeOptionalDate(payload.fecha_evento);
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
