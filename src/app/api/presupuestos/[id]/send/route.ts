import { NextResponse } from "next/server";
import { getLeadStatusForPresupuestoStatus } from "@/lib/presupuestos";
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
  let lead = null;

  if (presupuesto.lead_id) {
    const { data: linkedLead, error: leadError } = await supabase
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

    lead = linkedLead;
  }

  const clientEmail = lead?.email ?? presupuesto.cliente_email;
  const clientName = lead?.nombre ?? presupuesto.cliente_nombre;

  if (!clientEmail || !clientName) {
    return NextResponse.json(
      {
        success: false,
        error: "Este presupuesto necesita un lead con email o un cliente manual para enviarse.",
      },
      { status: 400 },
    );
  }

  try {
    await sendPresupuestoEmail({
      clientEmail,
      clientName,
      presupuestoTitle: presupuesto.titulo,
      presupuestoDescription: presupuesto.descripcion,
      presupuestoAmount: presupuesto.importe,
      fechaEvento: presupuesto.fecha_evento ?? lead?.fecha_evento ?? null,
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

  const nextLeadStatus = getLeadStatusForPresupuestoStatus("enviado");

  if (updatedPresupuesto?.lead_id && nextLeadStatus) {
    const { error: leadUpdateError } = await supabase
      .from("leads")
      .update({ estado: nextLeadStatus })
      .eq("id", updatedPresupuesto.lead_id);

    if (leadUpdateError) {
      console.error("Failed to sync lead status after presupuesto send", {
        presupuestoId: updatedPresupuesto.id,
        leadId: updatedPresupuesto.lead_id,
        nextLeadStatus,
        error: leadUpdateError,
      });
    }
  }

  return NextResponse.json({
    success: true,
    presupuesto: updatedPresupuesto,
  });
}
