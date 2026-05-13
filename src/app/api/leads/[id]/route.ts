import { NextResponse } from "next/server";
import { buildUpdateLeadPayload } from "@/lib/leads";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdateLeadRequest = {
  nombre?: unknown;
  email?: unknown;
  telefono?: unknown;
  tipo_sesion?: unknown;
  fecha_evento?: unknown;
  ubicacion?: unknown;
  presupuesto?: unknown;
  mensaje?: unknown;
  estado?: unknown;
  prioridad?: unknown;
  notas_internas?: unknown;
};

function resolveLeadId(id: string) {
  return id.trim();
}

export async function GET(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const leadId = resolveLeadId(id);

  if (!leadId) {
    return NextResponse.json(
      {
        success: false,
        error: "El id del lead es obligatorio.",
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .select("*")
    .eq("id", leadId)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch lead", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo obtener el lead",
      },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Lead no encontrado",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    lead: data,
  });
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const leadId = resolveLeadId(id);

  if (!leadId) {
    return NextResponse.json(
      {
        success: false,
        error: "El id del lead es obligatorio.",
      },
      { status: 400 },
    );
  }

  let payload: UpdateLeadRequest;

  try {
    payload = (await request.json()) as UpdateLeadRequest;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "El cuerpo de la solicitud debe ser un JSON valido.",
      },
      { status: 400 },
    );
  }

  const result = buildUpdateLeadPayload(payload);

  if ("error" in result) {
    return NextResponse.json(
      {
        success: false,
        error: result.error,
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .update(result.payload)
    .eq("id", leadId)
    .select()
    .maybeSingle();

  if (error) {
    console.error("Failed to update lead", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo actualizar el lead",
      },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Lead no encontrado",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    lead: data,
  });
}

export async function DELETE(_request: Request, context: RouteContext) {
  const { id } = await context.params;
  const leadId = resolveLeadId(id);

  if (!leadId) {
    return NextResponse.json(
      {
        success: false,
        error: "El id del lead es obligatorio.",
      },
      { status: 400 },
    );
  }

  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("leads")
    .delete()
    .eq("id", leadId)
    .select("id")
    .maybeSingle();

  if (error) {
    console.error("Failed to delete lead", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo eliminar el lead",
      },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Lead no encontrado",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
  });
}
