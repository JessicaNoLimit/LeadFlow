"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { showToast } from "@/lib/toast";
import { leadPriorities, leadStatuses } from "@/lib/leads";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];

type LeadDetailFormProps = {
  lead: Lead;
};

type UpdateLeadResponse =
  | {
      success: true;
      lead: Lead;
    }
  | {
      success: false;
      error: string;
    };

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-ivory outline-none transition focus:border-sand/40 focus:bg-black/28";

const statusLabels: Record<string, string> = {
  nuevo: "Nuevo",
  contactado: "Contactado",
  presupuesto_enviado: "Presupuesto enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
  archivado: "Archivado",
};

const leadStatusOptions = [
  "nuevo",
  "contactado",
  "presupuesto_enviado",
  "aceptado",
  "rechazado",
  "archivado",
] as const satisfies readonly (typeof leadStatuses)[number][];

const priorityLabels: Record<string, string> = {
  baja: "Baja",
  media: "Media",
  alta: "Alta",
};
const leadUpdateErrorMessage =
  "No hemos podido actualizar el lead. Intentalo de nuevo.";
const leadDeleteErrorMessage =
  "No hemos podido eliminar el lead. Intentalo de nuevo.";

export function LeadDetailForm({ lead }: LeadDetailFormProps) {
  const router = useRouter();
  const [status, setStatus] = useState(lead.estado);
  const [priority, setPriority] = useState(lead.prioridad);
  const [internalNotes, setInternalNotes] = useState(lead.notas_internas ?? "");
  const [isSaving, setIsSaving] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving || isDeleting) {
      return;
    }

    setIsSaving(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado: status,
          prioridad: priority,
          notas_internas: internalNotes,
        }),
      });

      const result = (await response.json()) as UpdateLeadResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(leadUpdateErrorMessage);
        showToast(leadUpdateErrorMessage, "error");
        return;
      }

      setStatus(result.lead.estado);
      setPriority(result.lead.prioridad);
      setInternalNotes(result.lead.notas_internas ?? "");
      setSuccessMessage("Lead actualizado correctamente.");
      showToast("Lead actualizado correctamente.", "success");
      router.refresh();
    } catch {
      setErrorMessage(leadUpdateErrorMessage);
      showToast(leadUpdateErrorMessage, "error");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleDelete() {
    if (isSaving || isDeleting) {
      return;
    }

    const shouldDelete = window.confirm(
      "Esta accion eliminara el lead de forma permanente. Quieres continuar?",
    );

    if (!shouldDelete) {
      return;
    }

    setIsDeleting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/leads/${lead.id}`, {
        method: "DELETE",
      });
      const result = (await response.json()) as
        | { success: true }
        | { success: false; error: string };

      if (!response.ok || !result.success) {
        setErrorMessage(leadDeleteErrorMessage);
        showToast(leadDeleteErrorMessage, "error");
        setIsDeleting(false);
        return;
      }

      showToast("Lead eliminado correctamente.", "success");
      router.replace("/dashboard");
      router.refresh();
    } catch {
      setErrorMessage(leadDeleteErrorMessage);
      showToast(leadDeleteErrorMessage, "error");
      setIsDeleting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Gestion interna
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Seguimiento comercial
          </h2>
        </div>
        {isSaving ? (
          <span className="rounded-full border border-sand/18 bg-sand/[0.08] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-sand">
            Guardando
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            htmlFor="lead-status"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Estado
          </label>
          <select
            id="lead-status"
            value={status}
            onChange={(event) => setStatus(event.target.value)}
            className={`${fieldClassName} appearance-none`}
            disabled={isSaving || isDeleting}
          >
            {leadStatusOptions.map((option) => (
              <option key={option} value={option} className="bg-[#141414]">
                {statusLabels[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lead-priority"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Prioridad
          </label>
          <select
            id="lead-priority"
            value={priority}
            onChange={(event) => setPriority(event.target.value)}
            className={`${fieldClassName} appearance-none`}
            disabled={isSaving || isDeleting}
          >
            {leadPriorities.map((option) => (
              <option key={option} value={option} className="bg-[#141414]">
                {priorityLabels[option]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="lead-internal-notes"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Notas internas
          </label>
          <textarea
            id="lead-internal-notes"
            value={internalNotes}
            onChange={(event) => setInternalNotes(event.target.value)}
            rows={6}
            className={`${fieldClassName} resize-y`}
            placeholder="Anota contexto comercial, proximos pasos o detalles relevantes."
            disabled={isSaving || isDeleting}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="submit"
            disabled={isSaving || isDeleting}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/18 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/36 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSaving ? "Actualizando..." : "Guardar cambios"}
          </button>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isSaving || isDeleting}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#8f5959]/22 bg-[#241515]/35 px-5 text-[0.72rem] uppercase tracking-[0.22em] text-[#efc4c4] transition hover:border-[#8f5959]/42 hover:bg-[#241515]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f5959]/45 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isDeleting ? "Eliminando..." : "Eliminar lead"}
          </button>
        </div>

        {successMessage ? (
          <p className="text-sm text-[#cde7d2]">{successMessage}</p>
        ) : null}
        {errorMessage ? <p className="text-sm text-[#efc4c4]">{errorMessage}</p> : null}
      </div>
    </form>
  );
}
