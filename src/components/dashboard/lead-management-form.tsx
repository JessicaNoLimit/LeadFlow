"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { leadPriorities, leadStatuses } from "@/lib/leads";

type LeadManagementFormProps = {
  leadId: string;
  initialEstado: string;
  initialPrioridad: string;
  initialNotasInternas: string | null;
};

type SubmissionState =
  | { status: "idle"; message: null }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

export function LeadManagementForm({
  leadId,
  initialEstado,
  initialPrioridad,
  initialNotasInternas,
}: LeadManagementFormProps) {
  const router = useRouter();
  const [estado, setEstado] = useState(initialEstado);
  const [prioridad, setPrioridad] = useState(initialPrioridad);
  const [notasInternas, setNotasInternas] = useState(initialNotasInternas ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: null,
  });

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSubmissionState({ status: "idle", message: null });

    try {
      const response = await fetch(`/api/leads/${leadId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          estado,
          prioridad,
          notas_internas: notasInternas,
        }),
      });

      const result = (await response.json()) as {
        success?: boolean;
        error?: string;
      };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "No se pudo actualizar el lead.");
      }

      setSubmissionState({
        status: "success",
        message: "Los cambios se han guardado correctamente.",
      });
      router.refresh();
    } catch {
      setSubmissionState({
        status: "error",
        message: "No se pudieron guardar los cambios. Intentalo de nuevo.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit}>
      <div>
        <label
          className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72"
          htmlFor="estado"
        >
          Estado
        </label>
        <select
          id="estado"
          value={estado}
          onChange={(event) => setEstado(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition focus:border-sand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {leadStatuses.map((status) => (
            <option key={status} value={status} className="bg-ink text-ivory">
              {status.replaceAll("_", " ")}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72"
          htmlFor="prioridad"
        >
          Prioridad
        </label>
        <select
          id="prioridad"
          value={prioridad}
          onChange={(event) => setPrioridad(event.target.value)}
          disabled={isSubmitting}
          className="w-full rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition focus:border-sand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {leadPriorities.map((value) => (
            <option key={value} value={value} className="bg-ink text-ivory">
              {value}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label
          className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72"
          htmlFor="notas_internas"
        >
          Notas internas
        </label>
        <textarea
          id="notas_internas"
          value={notasInternas}
          onChange={(event) => setNotasInternas(event.target.value)}
          disabled={isSubmitting}
          className="min-h-40 w-full rounded-[1.4rem] border border-white/10 bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition focus:border-sand disabled:cursor-not-allowed disabled:opacity-70"
          placeholder="Observaciones internas, proxima accion o contexto comercial."
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-white/8 pt-6">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 items-center justify-center rounded-full border border-sand bg-sand px-8 text-sm uppercase tracking-[0.18em] text-ink transition hover:bg-transparent hover:text-sand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>

        <div aria-live="polite" className="text-sm leading-7">
          {submissionState.status === "success" ? (
            <p className="text-sand">{submissionState.message}</p>
          ) : null}
          {submissionState.status === "error" ? (
            <p className="text-[#d2917f]">{submissionState.message}</p>
          ) : null}
        </div>
      </div>
    </form>
  );
}
