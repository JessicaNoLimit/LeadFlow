import { NextResponse } from "next/server";
import { buildCreateLeadPayload } from "@/lib/leads";
import { createSupabaseServerClient } from "@/lib/supabase/server";

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

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch leads", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudieron obtener los leads",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    leads: data,
  });
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

  const leadPayload = buildCreateLeadPayload(payload);

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
