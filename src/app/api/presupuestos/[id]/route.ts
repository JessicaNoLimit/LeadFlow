import { NextResponse } from "next/server";
import { buildUpdatePresupuestoPayload } from "@/lib/presupuestos";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

type UpdatePresupuestoRequest = {
  titulo?: unknown;
  descripcion?: unknown;
  importe?: unknown;
  estado?: unknown;
};

function resolvePresupuestoId(id: string) {
  return id.trim();
}

export async function PATCH(request: Request, context: RouteContext) {
  const { id } = await context.params;
  const presupuestoId = resolvePresupuestoId(id);

  if (!presupuestoId) {
    return NextResponse.json(
      {
        success: false,
        error: "El id del presupuesto es obligatorio.",
      },
      { status: 400 },
    );
  }

  let payload: UpdatePresupuestoRequest;

  try {
    payload = (await request.json()) as UpdatePresupuestoRequest;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "El cuerpo de la solicitud debe ser un JSON valido.",
      },
      { status: 400 },
    );
  }

  const result = buildUpdatePresupuestoPayload(payload);

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
    .from("presupuestos")
    .update(result.payload)
    .eq("id", presupuestoId)
    .select("*")
    .maybeSingle();

  if (error) {
    console.error("Failed to update presupuesto", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo actualizar el presupuesto",
      },
      { status: 500 },
    );
  }

  if (!data) {
    return NextResponse.json(
      {
        success: false,
        error: "Presupuesto no encontrado",
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    success: true,
    presupuesto: data,
  });
}
