import { NextResponse } from "next/server";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type LeadInsert = Database["public"]["Tables"]["leads"]["Insert"];

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

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function normalizeRequiredText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function normalizeOptionalText(value: unknown) {
  if (typeof value !== "string") {
    return null;
  }

  const normalizedValue = value.trim();
  return normalizedValue.length > 0 ? normalizedValue : null;
}

function normalizeOptionalDate(value: unknown) {
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

function buildLeadPayload(payload: CreateLeadPayload): LeadInsert | null {
  const nombre = normalizeRequiredText(payload.nombre);
  const email = normalizeRequiredText(payload.email).toLowerCase();
  const tipoSesion = normalizeRequiredText(payload.tipo_sesion);

  if (!nombre) {
    return null;
  }

  if (!emailPattern.test(email)) {
    return null;
  }

  if (!tipoSesion) {
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

export async function POST(request: Request) {
  let payload: CreateLeadPayload;

  try {
    payload = (await request.json()) as CreateLeadPayload;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "El cuerpo de la solicitud debe ser un JSON valido.",
      },
      { status: 400 },
    );
  }

  const leadPayload = buildLeadPayload(payload);

  if (!leadPayload) {
    return NextResponse.json(
      {
        success: false,
        error:
          "Debes enviar nombre, email valido y tipo_sesion como campos obligatorios.",
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .insert(leadPayload)
    .select()
    .single();

  if (error) {
    console.error("Failed to create lead", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo crear el lead",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      lead: data,
    },
    { status: 201 },
  );
}
