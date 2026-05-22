"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { presupuestoStatuses } from "@/lib/presupuestos";
import { showToast } from "@/lib/toast";
import type { Database } from "@/lib/supabase/types";

type Lead = Database["public"]["Tables"]["leads"]["Row"];
type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

type CreatePresupuestoResponse =
  | {
      success: true;
      presupuesto: Presupuesto;
    }
  | {
      success: false;
      error: string;
    };

type PresupuestoCreateFormProps = {
  leads: Lead[];
};

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-ivory outline-none transition focus:border-sand/40 focus:bg-black/28";

const statusLabels: Record<(typeof presupuestoStatuses)[number], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
};

export function PresupuestoCreateForm({
  leads,
}: PresupuestoCreateFormProps) {
  const router = useRouter();
  const [leadId, setLeadId] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [importe, setImporte] = useState("");
  const [estado, setEstado] =
    useState<(typeof presupuestoStatuses)[number]>("borrador");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch("/api/presupuestos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          lead_id: leadId,
          titulo,
          descripcion,
          importe,
          estado,
        }),
      });

      const result = (await response.json()) as CreatePresupuestoResponse;

      if (!response.ok || !result.success) {
        const nextErrorMessage = result.success
          ? "No se pudo crear el presupuesto."
          : result.error;
        setErrorMessage(nextErrorMessage);
        showToast(nextErrorMessage, "error");
        return;
      }

      setLeadId("");
      setTitulo("");
      setDescripcion("");
      setImporte("");
      setEstado("borrador");
      setSuccessMessage("Presupuesto creado correctamente.");
      showToast("Presupuesto creado correctamente.", "success");
      router.refresh();
    } catch {
      setErrorMessage("Se produjo un error inesperado al crear el presupuesto.");
      showToast("No se pudo crear el presupuesto.", "error");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-[1.8rem] border border-white/10 bg-black/18 p-6 shadow-[0_24px_70px_rgba(0,0,0,0.18)]"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[0.68rem] uppercase tracking-[0.3em] text-sand">
            Nuevo presupuesto
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Crear propuesta manual
          </h2>
        </div>
        {isSubmitting ? (
          <span className="rounded-full border border-sand/18 bg-sand/[0.08] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-sand">
            Guardando
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            htmlFor="presupuesto-lead"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Lead vinculado
          </label>
          <select
            id="presupuesto-lead"
            value={leadId}
            onChange={(event) => setLeadId(event.target.value)}
            className={`${fieldClassName} appearance-none`}
            disabled={isSubmitting}
          >
            <option value="" className="bg-[#141414]">
              Sin vinculacion
            </option>
            {leads.map((lead) => (
              <option key={lead.id} value={lead.id} className="bg-[#141414]">
                {lead.nombre} · {lead.email}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            htmlFor="presupuesto-titulo"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Titulo
          </label>
          <input
            id="presupuesto-titulo"
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            className={fieldClassName}
            placeholder="Ej. Reportaje editorial premium"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label
            htmlFor="presupuesto-descripcion"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Descripcion
          </label>
          <textarea
            id="presupuesto-descripcion"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            rows={5}
            className={`${fieldClassName} resize-y`}
            placeholder="Resume alcance, entregables o notas comerciales."
            disabled={isSubmitting}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="presupuesto-importe"
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Importe
            </label>
            <input
              id="presupuesto-importe"
              type="number"
              min="0"
              step="0.01"
              value={importe}
              onChange={(event) => setImporte(event.target.value)}
              className={fieldClassName}
              placeholder="0.00"
              disabled={isSubmitting}
            />
          </div>

          <div>
            <label
              htmlFor="presupuesto-estado"
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Estado
            </label>
            <select
              id="presupuesto-estado"
              value={estado}
              onChange={(event) =>
                setEstado(
                  event.target.value as (typeof presupuestoStatuses)[number],
                )
              }
              className={`${fieldClassName} appearance-none`}
              disabled={isSubmitting}
            >
              {presupuestoStatuses.map((status) => (
                <option key={status} value={status} className="bg-[#141414]">
                  {statusLabels[status]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/18 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/36 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "Creando presupuesto..." : "Crear presupuesto"}
        </button>

        {successMessage ? (
          <p className="text-sm text-[#cde7d2]">{successMessage}</p>
        ) : null}
        {errorMessage ? <p className="text-sm text-[#efc4c4]">{errorMessage}</p> : null}
      </div>
    </form>
  );
}
