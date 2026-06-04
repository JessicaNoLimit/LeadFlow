"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { showToast } from "@/lib/toast";

type LeadQuickActionsProps = {
  leadId: string;
  status: string;
  email: string;
  telefono?: string | null;
  detailHref?: string;
  createPresupuestoHref?: string;
  presupuestosHref?: string;
  className?: string;
  showCopyEmail?: boolean;
  showCopyTelefono?: boolean;
  showViewDetail?: boolean;
  markAsContactadoLabel?: string;
};

type UpdateLeadResponse =
  | {
      success: true;
      lead: {
        estado: string;
      };
    }
  | {
      success: false;
      error: string;
    };

const actionButtonClassName =
  "inline-flex h-11 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.03] px-4 text-[0.68rem] uppercase tracking-[0.2em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/45 disabled:cursor-not-allowed disabled:opacity-60";

export function LeadQuickActions({
  leadId,
  status,
  email,
  telefono,
  detailHref,
  createPresupuestoHref,
  presupuestosHref,
  className,
  showCopyEmail = true,
  showCopyTelefono = true,
  showViewDetail = true,
  markAsContactadoLabel = "Marcar como contactado",
}: LeadQuickActionsProps) {
  const router = useRouter();
  const [isUpdating, setIsUpdating] = useState(false);
  const canMarkAsContactado = status === "nuevo";
  const canCreatePresupuesto = status !== "rechazado" && status !== "aceptado";

  async function handleMarkAsContactado() {
    if (isUpdating) {
      return;
    }

    setIsUpdating(true);

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: "contactado",
        }),
      });

      const result = (await response.json()) as UpdateLeadResponse;

      if (!response.ok || !result.success) {
        throw new Error(
          result.success ? "No se pudo actualizar el lead." : result.error,
        );
      }

      showToast("Lead marcado como contactado.", "success");
      router.refresh();
    } catch (error) {
      showToast(
        error instanceof Error ? error.message : "No se pudo actualizar el lead.",
        "error",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function copyToClipboard(value: string, successMessage: string) {
    try {
      await navigator.clipboard.writeText(value);
      showToast(successMessage, "success");
    } catch {
      showToast("No se pudo copiar al portapapeles.", "error");
    }
  }

  return (
    <div className={className}>
      {canMarkAsContactado ? (
        <button
          type="button"
          onClick={handleMarkAsContactado}
          disabled={isUpdating}
          className={`${actionButtonClassName} border-sand/18 bg-sand/[0.08] text-sand hover:bg-sand/[0.12]`}
        >
          {isUpdating ? "Actualizando..." : markAsContactadoLabel}
        </button>
      ) : null}

      {canCreatePresupuesto && createPresupuestoHref ? (
        <Link href={createPresupuestoHref} className={actionButtonClassName}>
          Crear presupuesto
        </Link>
      ) : null}

      {presupuestosHref ? (
        <Link href={presupuestosHref} className={actionButtonClassName}>
          Ver presupuestos asociados
        </Link>
      ) : null}

      {detailHref && showViewDetail ? (
        <Link
          href={detailHref}
          className={`${actionButtonClassName} border-sand/20 bg-sand/[0.08] text-sand hover:bg-sand/[0.12]`}
        >
          Ver detalle
        </Link>
      ) : null}

      {showCopyEmail ? (
        <button
          type="button"
          onClick={() => copyToClipboard(email, "Email copiado correctamente.")}
          className={actionButtonClassName}
        >
          Copiar email
        </button>
      ) : null}

      {telefono && showCopyTelefono ? (
        <button
          type="button"
          onClick={() =>
            copyToClipboard(telefono, "Telefono copiado correctamente.")
          }
          className={actionButtonClassName}
        >
          Copiar telefono
        </button>
      ) : null}
    </div>
  );
}
