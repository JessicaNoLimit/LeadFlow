import { NextResponse } from "next/server";
import { buildCreatePresupuestoPayload } from "@/lib/presupuestos";
import { createSupabaseServerClient } from "@/lib/supabase/server";
import type { Database } from "@/lib/supabase/types";

type CreatePresupuestoRequest = {
  lead_id?: unknown;
  titulo?: unknown;
  descripcion?: unknown;
  importe?: unknown;
  estado?: unknown;
};

type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

export async function GET() {
  const supabase = createSupabaseServerClient();
  const { data, error } = await supabase
    .from("presupuestos")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Failed to fetch presupuestos", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudieron obtener los presupuestos",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    presupuestos: data satisfies Presupuesto[],
  });
}

export async function POST(request: Request) {
  let payload: CreatePresupuestoRequest;

  try {
    payload = (await request.json()) as CreatePresupuestoRequest;
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: "El cuerpo de la solicitud debe ser un JSON valido.",
      },
      { status: 400 },
    );
  }

  const result = buildCreatePresupuestoPayload(payload);

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
    .insert(result.payload)
    .select("*")
    .single();

  if (error) {
    console.error("Failed to create presupuesto", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo crear el presupuesto",
      },
      { status: 500 },
    );
  }

  return NextResponse.json(
    {
      success: true,
      presupuesto: data satisfies Presupuesto,
    },
    { status: 201 },
  );
}
