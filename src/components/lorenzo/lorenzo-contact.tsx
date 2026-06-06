"use client";

import { ChangeEvent, FormEvent, useState } from "react";
import { studioContact } from "@/lib/studio";

type LorenzoContactValues = {
  nombre: string;
  email: string;
  telefono: string;
  tipo_sesion: string;
  fecha_evento: string;
  ubicacion: string;
  presupuesto: string;
  mensaje: string;
};

type SubmissionState =
  | { status: "idle"; message: "" }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialValues: LorenzoContactValues = {
  nombre: "",
  email: "",
  telefono: "",
  tipo_sesion: "",
  fecha_evento: "",
  ubicacion: "",
  presupuesto: "",
  mensaje: "",
};

const tipoSesionOptions = [
  "Boda editorial",
  "Retrato editorial",
  "Marca personal",
  "Evento privado",
  "Fotografia de producto",
  "Sesion lifestyle",
  "Otro",
];

const presupuestoOptions = [
  "Menos de 500 EUR",
  "500 EUR - 1.000 EUR",
  "1.000 EUR - 2.500 EUR",
  "Mas de 2.500 EUR",
  "Prefiero recibir orientacion",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const contactSuccessMessage =
  "Solicitud recibida correctamente. Revisaremos los detalles y nos pondremos en contacto contigo lo antes posible.";
const contactErrorMessage =
  "No hemos podido enviar tu solicitud en este momento. Intentalo de nuevo en unos minutos o contacta directamente con el estudio.";
const requiredFieldsMessage =
  "Completa los campos obligatorios para poder enviar tu solicitud.";
const privacyRequiredMessage =
  "Debes aceptar el tratamiento de datos para enviar tu solicitud.";

function fieldClassName(hasError = false) {
  return [
    "w-full min-w-0 border-b bg-transparent py-4 text-stone-900 outline-none transition",
    "placeholder:text-stone-300 disabled:cursor-not-allowed disabled:opacity-60",
    hasError ? "border-[#9f4f42] focus:border-[#9f4f42]" : "border-stone-200 focus:border-stone-900",
  ].join(" ");
}

function selectClassName(hasError = false) {
  return [
    "w-full min-w-0 border-b bg-transparent py-4 text-stone-500 outline-none transition",
    "disabled:cursor-not-allowed disabled:opacity-60",
    hasError ? "border-[#9f4f42] focus:border-[#9f4f42]" : "border-stone-200 focus:border-stone-900",
  ].join(" ");
}

export function LorenzoContact() {
  const [values, setValues] = useState(initialValues);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));
    setSubmissionState({ status: "idle", message: "" });
  }

  function handleBlur(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name } = event.target;

    setTouchedFields((currentFields) => ({
      ...currentFields,
      [name]: true,
    }));
  }

  function handlePrivacyChange(event: ChangeEvent<HTMLInputElement>) {
    setPrivacyAccepted(event.target.checked);
    setTouchedFields((currentFields) => ({
      ...currentFields,
      privacyAccepted: true,
    }));
    setSubmissionState({ status: "idle", message: "" });
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    const nombre = values.nombre.trim();
    const email = values.email.trim();
    const tipoSesion = values.tipo_sesion.trim();
    const hasRequiredFields = nombre && emailPattern.test(email) && tipoSesion;

    setTouchedFields((currentFields) => ({
      ...currentFields,
      nombre: true,
      email: true,
      tipo_sesion: true,
      privacyAccepted: true,
    }));

    if (!hasRequiredFields) {
      setSubmissionState({
        status: "error",
        message: requiredFieldsMessage,
      });
      return;
    }

    if (!privacyAccepted) {
      setSubmissionState({
        status: "error",
        message: privacyRequiredMessage,
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionState({ status: "idle", message: "" });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          email,
          telefono: values.telefono.trim(),
          tipo_sesion: tipoSesion,
          fecha_evento: values.fecha_evento,
          ubicacion: values.ubicacion.trim(),
          presupuesto: values.presupuesto,
          mensaje: values.mensaje.trim(),
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(contactErrorMessage);
      }

      setValues(initialValues);
      setPrivacyAccepted(false);
      setTouchedFields({});
      setSubmissionState({
        status: "success",
        message: contactSuccessMessage,
      });
    } catch {
      setSubmissionState({
        status: "error",
        message: contactErrorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <section id="contacto" className="bg-white px-8 py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-24 lg:grid-cols-2">
        <div data-reveal className="translate-y-8 opacity-0 transition duration-1000 ease-out">
          <span className="mb-8 block text-xs uppercase tracking-[0.3em] text-stone-400">
            Contacto
          </span>
          <h2 className="mb-12 font-heading text-5xl font-light text-stone-900">
            Hablemos de tu vision.
          </h2>
          <p className="mb-12 text-lg font-light leading-8 text-stone-500">
            Estamos disponibles para proyectos seleccionados a nivel global. Completa estos datos
            como referencia visual y pronto conectaremos este espacio al flujo real de solicitudes.
          </p>

          <div className="space-y-6 text-sm uppercase tracking-[0.2em] text-stone-400">
            <p>{studioContact.email}</p>
            <p>{studioContact.phone}</p>
            <p>MILÁN | FLORENCIA | LONDRES</p>
          </div>
        </div>

        <div
          data-reveal
          className="translate-y-8 opacity-0 transition duration-1000 ease-out [transition-delay:200ms]"
        >
          <form
            className="space-y-8"
            aria-label="Formulario de contacto"
            onSubmit={handleSubmit}
            noValidate
          >
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClassName(touchedFields.nombre && !values.nombre.trim())}
                disabled={isSubmitting}
                autoComplete="name"
                aria-invalid={Boolean(touchedFields.nombre && !values.nombre.trim())}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClassName(
                  touchedFields.email &&
                    (!values.email.trim() || !emailPattern.test(values.email.trim())),
                )}
                disabled={isSubmitting}
                autoComplete="email"
                aria-invalid={Boolean(
                  touchedFields.email &&
                    (!values.email.trim() || !emailPattern.test(values.email.trim())),
                )}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <input
                name="telefono"
                type="tel"
                placeholder="Telefono"
                value={values.telefono}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClassName()}
                disabled={isSubmitting}
                autoComplete="tel"
              />
              <select
                name="tipo_sesion"
                value={values.tipo_sesion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClassName(touchedFields.tipo_sesion && !values.tipo_sesion.trim())}
                disabled={isSubmitting}
                aria-invalid={Boolean(touchedFields.tipo_sesion && !values.tipo_sesion.trim())}
              >
                <option value="" disabled>
                  Tipo de sesion
                </option>
                {tipoSesionOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <input
                name="fecha_evento"
                type="date"
                aria-label="Fecha aproximada"
                value={values.fecha_evento}
                onChange={handleChange}
                onBlur={handleBlur}
                className={selectClassName()}
                disabled={isSubmitting}
              />
              <input
                name="ubicacion"
                type="text"
                placeholder="Ubicacion"
                value={values.ubicacion}
                onChange={handleChange}
                onBlur={handleBlur}
                className={fieldClassName()}
                disabled={isSubmitting}
              />
            </div>
            <select
              name="presupuesto"
              value={values.presupuesto}
              onChange={handleChange}
              onBlur={handleBlur}
              className={selectClassName()}
              disabled={isSubmitting}
            >
              <option value="">Presupuesto orientativo</option>
              {presupuestoOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
            <textarea
              name="mensaje"
              rows={4}
              placeholder="Hablanos de tu proyecto..."
              value={values.mensaje}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`${fieldClassName()} resize-none`}
              disabled={isSubmitting}
            />
            <div className="border border-stone-200 px-5 py-5">
              <label
                htmlFor="lorenzoPrivacyAccepted"
                className="flex cursor-pointer items-start gap-4 text-sm leading-7 text-stone-600"
              >
                <input
                  id="lorenzoPrivacyAccepted"
                  name="privacyAccepted"
                  type="checkbox"
                  checked={privacyAccepted}
                  onChange={handlePrivacyChange}
                  className="mt-1 h-4 w-4 shrink-0 accent-stone-950"
                  disabled={isSubmitting}
                  aria-describedby="lorenzoPrivacyHelp"
                  aria-invalid={Boolean(touchedFields.privacyAccepted && !privacyAccepted)}
                />
                <span>
                  <span className="block text-stone-700">
                    He leido y acepto el tratamiento de mis datos para que Lorenzo Bellucci Studio pueda responder a mi solicitud.
                  </span>
                  <span id="lorenzoPrivacyHelp" className="mt-2 block text-stone-400">
                    Usaremos tus datos unicamente para gestionar esta consulta y responderte sobre la sesion solicitada.
                  </span>
                </span>
              </label>
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stone-950 py-5 text-xs uppercase tracking-[0.3em] text-white transition duration-500 hover:bg-stone-800 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSubmitting ? "Enviando solicitud..." : "Enviar Solicitud"}
            </button>
            {submissionState.message ? (
              <p
                aria-live="polite"
                className={`text-sm font-light leading-7 ${
                  submissionState.status === "success" ? "text-stone-600" : "text-[#9f4f42]"
                }`}
              >
                {submissionState.message}
              </p>
            ) : null}
          </form>
        </div>
      </div>
    </section>
  );
}
