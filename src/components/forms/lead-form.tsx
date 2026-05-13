"use client";

import { ChangeEvent, FormEvent, useMemo, useState } from "react";

type LeadFormValues = {
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
  | { status: "idle"; message: null }
  | { status: "success"; message: string }
  | { status: "error"; message: string };

const initialValues: LeadFormValues = {
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
  "Retrato personal",
  "Marca personal",
  "Evento privado",
  "Fotografia de producto",
  "Sesion lifestyle",
  "Otro",
];

const presupuestoOptions = [
  "Menos de 500€",
  "500€ - 1.000€",
  "1.000€ - 2.500€",
  "Mas de 2.500€",
  "Prefiero recibir orientacion",
];

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function fieldBaseClassName(hasError: boolean) {
  return [
    "w-full rounded-[1.4rem] border bg-white/[0.03] px-5 py-4 text-sm text-ivory outline-none transition",
    "placeholder:text-mist/42",
    "disabled:cursor-not-allowed disabled:opacity-70",
    hasError ? "border-[#c67d6b] focus:border-[#d2917f]" : "border-white/10 focus:border-sand",
  ].join(" ");
}

export function LeadForm() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: null,
  });
  const [touchedFields, setTouchedFields] = useState<Record<string, boolean>>({});

  const errors = useMemo(() => {
    const nextErrors: Partial<Record<keyof LeadFormValues, string>> = {};

    if (!values.nombre.trim()) {
      nextErrors.nombre = "Introduce tu nombre.";
    }

    if (!values.email.trim()) {
      nextErrors.email = "Introduce tu email.";
    } else if (!emailPattern.test(values.email.trim())) {
      nextErrors.email = "Introduce un email valido.";
    }

    if (!values.tipo_sesion.trim()) {
      nextErrors.tipo_sesion = "Selecciona el tipo de sesion.";
    }

    return nextErrors;
  }, [values]);

  function handleChange(
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>,
  ) {
    const { name, value } = event.target;

    setValues((currentValues) => ({
      ...currentValues,
      [name]: value,
    }));

    setSubmissionState({ status: "idle", message: null });
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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const requiredFieldNames: Array<keyof LeadFormValues> = [
      "nombre",
      "email",
      "tipo_sesion",
    ];

    setTouchedFields((currentFields) => ({
      ...currentFields,
      ...requiredFieldNames.reduce<Record<string, boolean>>((accumulator, fieldName) => {
        accumulator[fieldName] = true;
        return accumulator;
      }, {}),
    }));

    if (Object.keys(errors).length > 0) {
      setSubmissionState({
        status: "error",
        message: "Revisa los campos obligatorios antes de continuar.",
      });
      return;
    }

    setIsSubmitting(true);
    setSubmissionState({ status: "idle", message: null });

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "No se pudo enviar la solicitud.");
      }

      setValues(initialValues);
      setTouchedFields({});
      setSubmissionState({
        status: "success",
        message:
          "Hemos recibido tu solicitud. El estudio revisara los detalles y contactara contigo proximamente.",
      });
    } catch {
      setSubmissionState({
        status: "error",
        message: "No se pudo enviar la solicitud. Intentalo de nuevo en unos minutos.",
      });
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form className="space-y-5" onSubmit={handleSubmit} noValidate>
      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="nombre">
            Nombre
          </label>
          <input
            id="nombre"
            name="nombre"
            type="text"
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(Boolean(touchedFields.nombre && errors.nombre))}
            placeholder="Tu nombre"
            autoComplete="name"
            disabled={isSubmitting}
          />
          {touchedFields.nombre && errors.nombre ? (
            <p className="mt-2 text-sm text-[#d2917f]">{errors.nombre}</p>
          ) : null}
        </div>

        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="email">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(Boolean(touchedFields.email && errors.email))}
            placeholder="nombre@correo.com"
            autoComplete="email"
            disabled={isSubmitting}
          />
          {touchedFields.email && errors.email ? (
            <p className="mt-2 text-sm text-[#d2917f]">{errors.email}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="telefono">
            Telefono
          </label>
          <input
            id="telefono"
            name="telefono"
            type="tel"
            value={values.telefono}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(false)}
            placeholder="+34 600 000 000"
            autoComplete="tel"
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="tipo_sesion">
            Tipo de sesion
          </label>
          <select
            id="tipo_sesion"
            name="tipo_sesion"
            value={values.tipo_sesion}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(Boolean(touchedFields.tipo_sesion && errors.tipo_sesion))}
            disabled={isSubmitting}
          >
            <option value="">Selecciona una opcion</option>
            {tipoSesionOptions.map((option) => (
              <option key={option} value={option} className="bg-ink text-ivory">
                {option}
              </option>
            ))}
          </select>
          {touchedFields.tipo_sesion && errors.tipo_sesion ? (
            <p className="mt-2 text-sm text-[#d2917f]">{errors.tipo_sesion}</p>
          ) : null}
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="fecha_evento">
            Fecha estimada
          </label>
          <input
            id="fecha_evento"
            name="fecha_evento"
            type="date"
            value={values.fecha_evento}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(false)}
            disabled={isSubmitting}
          />
        </div>

        <div>
          <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="ubicacion">
            Ubicacion
          </label>
          <input
            id="ubicacion"
            name="ubicacion"
            type="text"
            value={values.ubicacion}
            onChange={handleChange}
            onBlur={handleBlur}
            className={fieldBaseClassName(false)}
            placeholder="Ciudad, finca o destino"
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div>
        <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="presupuesto">
          Presupuesto orientativo
        </label>
        <select
          id="presupuesto"
          name="presupuesto"
          value={values.presupuesto}
          onChange={handleChange}
          onBlur={handleBlur}
          className={fieldBaseClassName(false)}
          disabled={isSubmitting}
        >
          <option value="">Selecciona una opcion</option>
          {presupuestoOptions.map((option) => (
            <option key={option} value={option} className="bg-ink text-ivory">
              {option}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="mb-2 block text-[0.68rem] uppercase tracking-[0.26em] text-mist/72" htmlFor="mensaje">
          Mensaje
        </label>
        <textarea
          id="mensaje"
          name="mensaje"
          value={values.mensaje}
          onChange={handleChange}
          onBlur={handleBlur}
          className={`${fieldBaseClassName(false)} min-h-40 resize-y`}
          placeholder="Cuentanos el tono de la sesion, el contexto y cualquier detalle importante."
          disabled={isSubmitting}
        />
      </div>

      <div className="flex flex-col gap-4 border-t border-white/8 pt-6 sm:flex-row sm:items-center sm:justify-between">
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-14 items-center justify-center rounded-full border border-sand bg-sand px-8 text-sm uppercase tracking-[0.18em] text-ink transition hover:bg-transparent hover:text-sand disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Enviando solicitud..." : "Solicitar propuesta"}
        </button>

        <div aria-live="polite" className="max-w-md text-sm leading-7">
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
