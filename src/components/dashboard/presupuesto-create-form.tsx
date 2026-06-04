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
  initialLeadId?: string;
};

type PresupuestoSource = "lead" | "manual";

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-ivory outline-none transition focus:border-sand/40 focus:bg-black/28";

const statusLabels: Record<(typeof presupuestoStatuses)[number], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
};
const createPresupuestoErrorMessage =
  "No hemos podido crear el presupuesto. Revisa los datos e intentalo de nuevo.";

export function PresupuestoCreateForm({
  leads,
  initialLeadId,
}: PresupuestoCreateFormProps) {
  const router = useRouter();
  const hasInitialLead = Boolean(
    initialLeadId && leads.some((lead) => lead.id === initialLeadId),
  );
  const initialLead = hasInitialLead
    ? leads.find((lead) => lead.id === initialLeadId) ?? null
    : null;
  const [source, setSource] = useState<PresupuestoSource>("lead");
  const [leadId, setLeadId] = useState(hasInitialLead ? initialLeadId : "");
  const [clienteNombre, setClienteNombre] = useState("");
  const [clienteEmail, setClienteEmail] = useState("");
  const [clienteTelefono, setClienteTelefono] = useState("");
  const [fechaEvento, setFechaEvento] = useState(initialLead?.fecha_evento ?? "");
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
    if (isSubmitting) {
      return;
    }

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
          lead_id: source === "lead" ? leadId : "",
          cliente_nombre: source === "manual" ? clienteNombre : "",
          cliente_email: source === "manual" ? clienteEmail : "",
          cliente_telefono: source === "manual" ? clienteTelefono : "",
          fecha_evento: fechaEvento,
          titulo,
          descripcion,
          importe,
          estado,
        }),
      });

      const result = (await response.json()) as CreatePresupuestoResponse;

      if (!response.ok || !result.success) {
        setErrorMessage(createPresupuestoErrorMessage);
        showToast(createPresupuestoErrorMessage, "error");
        return;
      }

      setSource("lead");
      setLeadId(hasInitialLead ? initialLeadId ?? "" : "");
      setClienteNombre("");
      setClienteEmail("");
      setClienteTelefono("");
      setFechaEvento(initialLead?.fecha_evento ?? "");
      setTitulo("");
      setDescripcion("");
      setImporte("");
      setEstado("borrador");
      setSuccessMessage("Presupuesto creado correctamente.");
      showToast("Presupuesto creado correctamente.", "success");
      router.refresh();
    } catch {
      setErrorMessage(createPresupuestoErrorMessage);
      showToast(createPresupuestoErrorMessage, "error");
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
            Crear nuevo presupuesto
          </h2>
        </div>
        {isSubmitting ? (
          <span className="rounded-full border border-sand/18 bg-sand/[0.08] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-sand">
            Guardando
          </span>
        ) : null}
      </div>

      <div className="mt-6 grid gap-5">
        {hasInitialLead ? (
          <div className="rounded-2xl border border-sand/18 bg-sand/[0.06] px-4 py-3 text-sm leading-7 text-mist/82">
            Estas creando un presupuesto vinculado a este lead.
          </div>
        ) : null}

        <div>
          <label className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58">
            Origen del presupuesto
          </label>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <button
              type="button"
              onClick={() => {
                setSource("lead");
                if (hasInitialLead) {
                  setLeadId(initialLeadId ?? "");
                  setFechaEvento(initialLead?.fecha_evento ?? "");
                }
              }}
              disabled={isSubmitting}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                source === "lead"
                  ? "border-sand/20 bg-sand/[0.08] text-ivory"
                  : "border-white/10 bg-black/18 text-mist/78"
              }`}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.22em]">
                Lead existente
              </p>
              <p className="mt-2 text-sm leading-7">
                Vincula el presupuesto a una oportunidad ya registrada.
              </p>
            </button>
            <button
              type="button"
              onClick={() => {
                setSource("manual");
                setLeadId("");
                setFechaEvento("");
              }}
              disabled={isSubmitting || hasInitialLead}
              className={`rounded-2xl border px-4 py-4 text-left transition ${
                source === "manual"
                  ? "border-sand/20 bg-sand/[0.08] text-ivory"
                  : "border-white/10 bg-black/18 text-mist/78"
              } disabled:cursor-not-allowed disabled:opacity-60`}
            >
              <p className="text-[0.68rem] uppercase tracking-[0.22em]">
                Cliente manual
              </p>
              <p className="mt-2 text-sm leading-7">
                Usa cliente manual cuando el presupuesto no venga de una solicitud previa.
              </p>
            </button>
          </div>
        </div>

        {source === "lead" ? (
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
              onChange={(event) => {
                const nextLeadId = event.target.value;
                const selectedLead = leads.find((lead) => lead.id === nextLeadId);

                setLeadId(nextLeadId);
                setFechaEvento(selectedLead?.fecha_evento ?? "");
              }}
              className={`${fieldClassName} appearance-none`}
              disabled={isSubmitting}
            >
              <option value="" className="bg-[#141414]">
                Selecciona un lead
              </option>
              {leads.map((lead) => (
                <option key={lead.id} value={lead.id} className="bg-[#141414]">
                  {lead.nombre} · {lead.email}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label
                htmlFor="presupuesto-cliente-nombre"
                className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
              >
                Nombre del cliente
              </label>
              <input
                id="presupuesto-cliente-nombre"
                type="text"
                value={clienteNombre}
                onChange={(event) => setClienteNombre(event.target.value)}
                className={fieldClassName}
                placeholder="Nombre completo"
                disabled={isSubmitting}
              />
            </div>
            <div>
              <label
                htmlFor="presupuesto-cliente-email"
                className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
              >
                Email del cliente
              </label>
              <input
                id="presupuesto-cliente-email"
                type="email"
                value={clienteEmail}
                onChange={(event) => setClienteEmail(event.target.value)}
                className={fieldClassName}
                placeholder="nombre@cliente.com"
                disabled={isSubmitting}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="presupuesto-cliente-telefono"
                className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
              >
                Telefono del cliente
              </label>
              <input
                id="presupuesto-cliente-telefono"
                type="tel"
                value={clienteTelefono}
                onChange={(event) => setClienteTelefono(event.target.value)}
                className={fieldClassName}
                placeholder="+34 600 000 000"
                disabled={isSubmitting}
              />
            </div>
          </div>
        )}

        <div>
          <label
            htmlFor="presupuesto-fecha-evento"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Fecha prevista de la sesion
          </label>
          <input
            id="presupuesto-fecha-evento"
            type="date"
            value={fechaEvento}
            onChange={(event) => setFechaEvento(event.target.value)}
            className={fieldClassName}
            disabled={isSubmitting}
          />
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
              Importe final
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
            <p className="mt-2 text-xs leading-6 text-mist/60">
              Importe final con IVA incluido al 21%.
            </p>
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
          {isSubmitting ? "Guardando presupuesto..." : "Crear presupuesto"}
        </button>

        {successMessage ? (
          <p className="text-sm text-[#cde7d2]">{successMessage}</p>
        ) : null}
        {errorMessage ? <p className="text-sm text-[#efc4c4]">{errorMessage}</p> : null}
      </div>
    </form>
  );
}
