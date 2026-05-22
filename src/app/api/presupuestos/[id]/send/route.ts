import { NextResponse } from "next/server";
import { sendPresupuestoEmail } from "@/lib/resend";
import { createSupabaseServerClient } from "@/lib/supabase/server";

type RouteContext = {
  params: Promise<{
    id: string;
  }>;
};

function resolvePresupuestoId(id: string) {
  return id.trim();
}

export async function POST(_request: Request, context: RouteContext) {
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

  const supabase = createSupabaseServerClient();
  const { data: presupuesto, error: presupuestoError } = await supabase
    .from("presupuestos")
    .select("*")
    .eq("id", presupuestoId)
    .maybeSingle();

  if (presupuestoError) {
    console.error("Failed to fetch presupuesto for sending", presupuestoError);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo cargar el presupuesto",
      },
      { status: 500 },
    );
  }

  if (!presupuesto) {
    return NextResponse.json(
      {
        success: false,
        error: "Presupuesto no encontrado",
      },
      { status: 404 },
    );
  }

  if (!presupuesto.lead_id) {
    return NextResponse.json(
      {
        success: false,
        error: "Este presupuesto no tiene un lead vinculado.",
      },
      { status: 400 },
    );
  }

  const { data: lead, error: leadError } = await supabase
    .from("leads")
    .select("*")
    .eq("id", presupuesto.lead_id)
    .maybeSingle();

  if (leadError) {
    console.error("Failed to fetch lead for presupuesto sending", leadError);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo cargar el lead vinculado",
      },
      { status: 500 },
    );
  }

  if (!lead?.email) {
    return NextResponse.json(
      {
        success: false,
        error: "Vincula este presupuesto a un lead con email para enviarlo.",
      },
      { status: 400 },
    );
  }

  try {
    await sendPresupuestoEmail({
      clientEmail: lead.email,
      clientName: lead.nombre,
      presupuestoTitle: presupuesto.titulo,
      presupuestoDescription: presupuesto.descripcion,
      presupuestoAmount: presupuesto.importe,
      presupuestoStatus: presupuesto.estado,
    });
  } catch (error) {
    console.error("Failed to send presupuesto email", error);

    return NextResponse.json(
      {
        success: false,
        error: "No se pudo enviar el presupuesto por email",
      },
      { status: 500 },
    );
  }

  const { data: updatedPresupuesto, error: updateError } = await supabase
    .from("presupuestos")
    .update({ estado: "enviado" })
    .eq("id", presupuesto.id)
    .select("*")
    .maybeSingle();

  if (updateError) {
    console.error("Failed to update presupuesto status after sending", updateError);

    return NextResponse.json(
      {
        success: false,
        error: "El email se envio, pero no se pudo actualizar el estado del presupuesto.",
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    presupuesto: updatedPresupuesto,
  });
}
