"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { presupuestoStatuses } from "@/lib/presupuestos";
import { showToast } from "@/lib/toast";
import type { Database } from "@/lib/supabase/types";

type Presupuesto = Database["public"]["Tables"]["presupuestos"]["Row"];

type PresupuestoDetailFormProps = {
  presupuesto: Presupuesto;
  canSendEmail: boolean;
  sendHint?: string;
};

type UpdatePresupuestoResponse =
  | {
      success: true;
      presupuesto: Presupuesto;
    }
  | {
      success: false;
      error: string;
    };

const fieldClassName =
  "mt-2 w-full rounded-2xl border border-white/10 bg-black/22 px-4 py-3 text-sm text-ivory outline-none transition focus:border-sand/40 focus:bg-black/28";

const statusLabels: Record<(typeof presupuestoStatuses)[number], string> = {
  borrador: "Borrador",
  enviado: "Enviado",
  aceptado: "Aceptado",
  rechazado: "Rechazado",
};
const updatePresupuestoErrorMessage =
  "No hemos podido actualizar el presupuesto. Revisa los datos e intentalo de nuevo.";
const sendPresupuestoErrorMessage =
  "No hemos podido enviar la propuesta. Revisa que el cliente tenga un email valido.";

export function PresupuestoDetailForm({
  presupuesto,
  canSendEmail,
  sendHint,
}: PresupuestoDetailFormProps) {
  const router = useRouter();
  const [titulo, setTitulo] = useState(presupuesto.titulo);
  const [descripcion, setDescripcion] = useState(presupuesto.descripcion ?? "");
  const [importe, setImporte] = useState(String(presupuesto.importe));
  const [fechaEvento, setFechaEvento] = useState(presupuesto.fecha_evento ?? "");
  const [estado, setEstado] =
    useState<(typeof presupuestoStatuses)[number]>(
      presupuestoStatuses.includes(
        presupuesto.estado as (typeof presupuestoStatuses)[number],
      )
        ? (presupuesto.estado as (typeof presupuestoStatuses)[number])
        : "borrador",
    );
  const [isSaving, setIsSaving] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [savingAction, setSavingAction] = useState<
    "form" | (typeof presupuestoStatuses)[number] | null
  >(null);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function updatePresupuesto(nextPayload: {
    titulo?: string;
    descripcion?: string;
    importe?: string;
    estado?: (typeof presupuestoStatuses)[number];
    fecha_evento?: string;
  }) {
    const response = await fetch(`/api/presupuestos/${presupuesto.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nextPayload),
    });

    const result = (await response.json()) as UpdatePresupuestoResponse;

    if (!response.ok || !result.success) {
      throw new Error(updatePresupuestoErrorMessage);
    }

    setTitulo(result.presupuesto.titulo);
    setDescripcion(result.presupuesto.descripcion ?? "");
    setImporte(String(result.presupuesto.importe));
    setFechaEvento(result.presupuesto.fecha_evento ?? "");
    setEstado(
      presupuestoStatuses.includes(
        result.presupuesto.estado as (typeof presupuestoStatuses)[number],
      )
        ? (result.presupuesto.estado as (typeof presupuestoStatuses)[number])
        : "borrador",
    );

    return result.presupuesto;
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSaving || isSending) {
      return;
    }

    setIsSaving(true);
    setSavingAction("form");
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updatePresupuesto({
        titulo,
        descripcion,
        importe,
        estado,
        fecha_evento: fechaEvento,
      });

      setSuccessMessage("Presupuesto actualizado correctamente.");
      showToast("Presupuesto actualizado correctamente.", "success");
      router.refresh();
    } catch {
      setErrorMessage(updatePresupuestoErrorMessage);
      showToast(updatePresupuestoErrorMessage, "error");
    } finally {
      setIsSaving(false);
      setSavingAction(null);
    }
  }

  async function handleQuickStatusChange(
    nextStatus: (typeof presupuestoStatuses)[number],
  ) {
    if (isSaving || isSending) {
      return;
    }

    setIsSaving(true);
    setSavingAction(nextStatus);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      await updatePresupuesto({ estado: nextStatus });
      setSuccessMessage("Presupuesto actualizado correctamente.");
      showToast("Presupuesto actualizado correctamente.", "success");
      router.refresh();
    } catch {
      setErrorMessage(updatePresupuestoErrorMessage);
      showToast(updatePresupuestoErrorMessage, "error");
    } finally {
      setIsSaving(false);
      setSavingAction(null);
    }
  }

  async function handleSendPresupuesto() {
    if (isSaving || isSending) {
      return;
    }

    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");

    try {
      const response = await fetch(`/api/presupuestos/${presupuesto.id}/send`, {
        method: "POST",
      });

      const result = (await response.json()) as UpdatePresupuestoResponse;

      if (!response.ok || !result.success) {
        throw new Error(sendPresupuestoErrorMessage);
      }

      setEstado(
        presupuestoStatuses.includes(
          result.presupuesto.estado as (typeof presupuestoStatuses)[number],
        )
          ? (result.presupuesto.estado as (typeof presupuestoStatuses)[number])
          : "enviado",
      );
      setSuccessMessage("Propuesta enviada correctamente al cliente.");
      showToast("Propuesta enviada correctamente al cliente.", "success");
      router.refresh();
    } catch {
      setErrorMessage(sendPresupuestoErrorMessage);
      showToast(sendPresupuestoErrorMessage, "error");
    } finally {
      setIsSending(false);
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
            Gestion comercial
          </p>
          <h2 className="mt-3 font-heading text-3xl text-ivory">
            Editar propuesta
          </h2>
        </div>
        {isSaving || isSending ? (
          <span className="rounded-full border border-sand/18 bg-sand/[0.08] px-3 py-1 text-[0.62rem] uppercase tracking-[0.22em] text-sand">
            {isSending ? "Enviando" : "Actualizando"}
          </span>
        ) : null}
      </div>

      <div className="mt-6 rounded-[1.5rem] border border-sand/16 bg-sand/[0.05] p-4">
        <div className="flex flex-col gap-3">
          <button
            type="button"
            onClick={handleSendPresupuesto}
            disabled={!canSendEmail || isSaving || isSending}
            className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/18 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/36 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSending ? "Enviando propuesta..." : "Enviar presupuesto"}
          </button>
          {!canSendEmail ? (
            <p className="text-sm leading-7 text-mist/72">
              {sendHint ?? "Vincula este presupuesto a un lead con email para enviarlo."}
            </p>
          ) : (
            <p className="text-sm leading-7 text-mist/72">
              Envio real por email desde el CRM. Si el envio sale bien, el estado pasara automaticamente a enviado.
            </p>
          )}
        </div>
      </div>

      <div className="mt-6 grid gap-5">
        <div>
          <label
            htmlFor="presupuesto-title"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Titulo
          </label>
          <input
            id="presupuesto-title"
            type="text"
            value={titulo}
            onChange={(event) => setTitulo(event.target.value)}
            className={fieldClassName}
            disabled={isSaving || isSending}
          />
        </div>

        <div>
          <label
            htmlFor="presupuesto-description"
            className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
          >
            Descripcion
          </label>
          <textarea
            id="presupuesto-description"
            value={descripcion}
            onChange={(event) => setDescripcion(event.target.value)}
            rows={6}
            className={`${fieldClassName} resize-y`}
            disabled={isSaving || isSending}
          />
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label
              htmlFor="presupuesto-amount"
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Importe final
            </label>
            <input
              id="presupuesto-amount"
              type="number"
              min="0"
              step="0.01"
              value={importe}
              onChange={(event) => setImporte(event.target.value)}
              className={fieldClassName}
              disabled={isSaving || isSending}
            />
          </div>

          <div>
            <label
              htmlFor="presupuesto-date"
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Fecha prevista de la sesion
            </label>
            <input
              id="presupuesto-date"
              type="date"
              value={fechaEvento}
              onChange={(event) => setFechaEvento(event.target.value)}
              className={fieldClassName}
              disabled={isSaving || isSending}
            />
            <p className="mt-2 text-xs leading-6 text-mist/60">
              Importe final con IVA incluido al 21%.
            </p>
          </div>

          <div>
            <label
              htmlFor="presupuesto-status"
              className="text-[0.68rem] uppercase tracking-[0.24em] text-mist/58"
            >
              Estado
            </label>
            <select
              id="presupuesto-status"
              value={estado}
              onChange={(event) =>
                setEstado(
                  event.target.value as (typeof presupuestoStatuses)[number],
                )
              }
              className={`${fieldClassName} appearance-none`}
              disabled={isSaving || isSending}
            >
              {presupuestoStatuses.map((statusOption) => (
                <option
                  key={statusOption}
                  value={statusOption}
                  className="bg-[#141414]"
                >
                  {statusLabels[statusOption]}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-3">
        <button
          type="button"
          onClick={() => handleQuickStatusChange("enviado")}
          disabled={isSaving || isSending || estado === "enviado"}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-sand/18 bg-sand/[0.08] px-5 text-[0.72rem] uppercase tracking-[0.22em] text-sand transition hover:border-sand/36 hover:bg-sand/[0.12] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingAction === "enviado" ? "Actualizando..." : "Marcar como enviado"}
        </button>
        <button
          type="button"
          onClick={() => handleQuickStatusChange("aceptado")}
          disabled={isSaving || isSending || estado === "aceptado"}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#4b6b57]/30 bg-[#102317]/70 px-5 text-[0.72rem] uppercase tracking-[0.22em] text-[#cde7d2] transition hover:border-[#4b6b57]/46 hover:bg-[#102317]/85 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4b6b57]/45 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingAction === "aceptado" ? "Actualizando..." : "Marcar como aceptado"}
        </button>
        <button
          type="button"
          onClick={() => handleQuickStatusChange("rechazado")}
          disabled={isSaving || isSending || estado === "rechazado"}
          className="inline-flex h-12 items-center justify-center rounded-2xl border border-[#8f5959]/22 bg-[#241515]/35 px-5 text-[0.72rem] uppercase tracking-[0.22em] text-[#efc4c4] transition hover:border-[#8f5959]/42 hover:bg-[#241515]/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#8f5959]/45 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingAction === "rechazado" ? "Actualizando..." : "Marcar como rechazado"}
        </button>
      </div>

      <div className="mt-3">
        <button
          type="submit"
          disabled={isSaving || isSending}
          className="inline-flex h-12 w-full items-center justify-center rounded-2xl border border-white/12 px-5 text-[0.72rem] uppercase tracking-[0.22em] text-ivory transition hover:border-sand/40 hover:text-sand focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sand/50 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {savingAction === "form" ? "Actualizando presupuesto..." : "Guardar cambios"}
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2">
        {successMessage ? (
          <p className="text-sm text-[#cde7d2]">{successMessage}</p>
        ) : null}
        {errorMessage ? <p className="text-sm text-[#efc4c4]">{errorMessage}</p> : null}
      </div>
    </form>
  );
}
