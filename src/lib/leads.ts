import type { Database } from "@/lib/supabase/types";

export type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];
export type LeadUpdate = Database["public"]["Tables"]["leads"]["Update"];

type CreateLeadPayload = {
  nombre?: unknown;
  email?: unknown;
  telefono?: unknown;
  tipo_sesion?: unknown;
  fecha_evento?: unknown;
  ubicacion?: unknown;
  presupuesto?: unknown;
  mensaje?: unknown;
};

type UpdateLeadPayload = CreateLeadPayload & {
  estado?: unknown;
  prioridad?: unknown;
  notas_internas?: unknown;
};

export const leadStatuses = [
  "nuevo",
  "contactado",
  "presupuesto_enviado",
  "aceptado",
  "rechazado",
  "archivado",
] as const;

export const leadPriorities = ["baja", "media", "alta"] as const;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmail(value: string) {
  return emailPattern.test(value);
}

export function normalizeRequiredText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

export function normalizeOptionalText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : null;
}

export function normalizeOptionalDate(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();

  if (!normalizedValue) {
    return null;
  }

  const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(normalizedValue);
  return isValidDate ? normalizedValue : null;
}

export function isValidLeadStatus(value: string): value is (typeof leadStatuses)[number] {
  return leadStatuses.includes(value as (typeof leadStatuses)[number]);
}

export function isValidLeadPriority(
  value: string,
): value is (typeof leadPriorities)[number] {
  return leadPriorities.includes(value as (typeof leadPriorities)[number]);
}

export function buildCreateLeadPayload(payload: CreateLeadPayload): LeadInsert | null {
  const nombre = normalizeRequiredText(payload.nombre);
  const email = normalizeRequiredText(payload.email).toLowerCase();
  const tipoSesion = normalizeRequiredText(payload.tipo_sesion);

  if (!nombre || !isValidEmail(email) || !tipoSesion) {
    return null;
  }

  return {
    nombre,
    email,
    telefono: normalizeOptionalText(payload.telefono),
    tipo_sesion: tipoSesion,
    fecha_evento: normalizeOptionalDate(payload.fecha_evento),
    ubicacion: normalizeOptionalText(payload.ubicacion),
    presupuesto: normalizeOptionalText(payload.presupuesto),
    mensaje: normalizeOptionalText(payload.mensaje),
    estado: "nuevo",
    prioridad: "media",
  };
}

export function buildUpdateLeadPayload(payload: UpdateLeadPayload) {
  const nextPayload: LeadUpdate = {};

  if (payload.nombre !== undefined) {
    const nombre = normalizeRequiredText(payload.nombre);

    if (!nombre) {
      return { error: "El nombre no puede estar vacio." } as const;
    }

    nextPayload.nombre = nombre;
  }

  if (payload.email !== undefined) {
    const email = normalizeRequiredText(payload.email).toLowerCase();

    if (!isValidEmail(email)) {
      return { error: "Debes enviar un email valido." } as const;
    }

    nextPayload.email = email;
  }

  if (payload.telefono !== undefined) {
    nextPayload.telefono = normalizeOptionalText(payload.telefono);
  }

  if (payload.tipo_sesion !== undefined) {
    const tipoSesion = normalizeRequiredText(payload.tipo_sesion);

    if (!tipoSesion) {
      return { error: "El tipo de sesion no puede estar vacio." } as const;
    }

    nextPayload.tipo_sesion = tipoSesion;
  }

  if (payload.fecha_evento !== undefined) {
    if (
      typeof payload.fecha_evento === "string" &&
      payload.fecha_evento.trim() &&
      normalizeOptionalDate(payload.fecha_evento) === null
    ) {
      return { error: "La fecha_evento debe tener formato YYYY-MM-DD." } as const;
    }

    nextPayload.fecha_evento = normalizeOptionalDate(payload.fecha_evento);
  }

  if (payload.ubicacion !== undefined) {
    nextPayload.ubicacion = normalizeOptionalText(payload.ubicacion);
  }

  if (payload.presupuesto !== undefined) {
    nextPayload.presupuesto = normalizeOptionalText(payload.presupuesto);
  }

  if (payload.mensaje !== undefined) {
    nextPayload.mensaje = normalizeOptionalText(payload.mensaje);
  }

  if (payload.notas_internas !== undefined) {
    nextPayload.notas_internas = normalizeOptionalText(payload.notas_internas);
  }

  if (payload.estado !== undefined) {
    const estado = normalizeRequiredText(payload.estado);

    if (!isValidLeadStatus(estado)) {
      return { error: "El estado enviado no es valido." } as const;
    }

    nextPayload.estado = estado;
  }

  if (payload.prioridad !== undefined) {
    const prioridad = normalizeRequiredText(payload.prioridad);

    if (!isValidLeadPriority(prioridad)) {
      return { error: "La prioridad enviada no es valida." } as const;
    }

    nextPayload.prioridad = prioridad;
  }

  if (Object.keys(nextPayload).length === 0) {
    return { error: "No se enviaron campos validos para actualizar." } as const;
  }

  return { payload: nextPayload } as const;
}
