"use client";

import { ChangeEvent, FormEvent, useState } from "react";

type LorenzoContactValues = {
  nombre: string;
  email: string;
  telefono: string;
  tipo_sesion: string;
  fecha_evento: string;
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
  mensaje: "",
};

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LorenzoContact() {
  const [values, setValues] = useState(initialValues);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionState, setSubmissionState] = useState<SubmissionState>({
    status: "idle",
    message: "",
  });

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

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const nombre = values.nombre.trim();
    const email = values.email.trim();
    const tipoSesion = values.tipo_sesion.trim();

    if (!nombre || !emailPattern.test(email) || !tipoSesion) {
      setSubmissionState({
        status: "error",
        message: "Indica nombre, email valido y tipo de sesion.",
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
          telefono: values.telefono,
          tipo_sesion: tipoSesion,
          fecha_evento: values.fecha_evento,
          ubicacion: "",
          presupuesto: "",
          mensaje: values.mensaje,
        }),
      });

      const result = (await response.json()) as { success?: boolean; error?: string };

      if (!response.ok || !result.success) {
        throw new Error(result.error || "No se pudo enviar la solicitud.");
      }

      setValues(initialValues);
      setSubmissionState({
        status: "success",
        message: "Solicitud recibida. El estudio revisara tu proyecto y contactara contigo.",
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
            <p>studio@lorenzobellucci.com</p>
            <p>+34 691 847 253</p>
            <p>MILÁN | FLORENCIA | LONDRES</p>
          </div>
        </div>

        <div
          data-reveal
          className="translate-y-8 opacity-0 transition duration-1000 ease-out [transition-delay:200ms]"
        >
          <form className="space-y-8" aria-label="Formulario visual de contacto" onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <input
                name="nombre"
                type="text"
                placeholder="Nombre"
                value={values.nombre}
                onChange={handleChange}
                className="w-full border-b border-stone-200 bg-transparent py-4 text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-stone-900"
                disabled={isSubmitting}
              />
              <input
                name="email"
                type="email"
                placeholder="Email"
                value={values.email}
                onChange={handleChange}
                className="w-full border-b border-stone-200 bg-transparent py-4 text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-stone-900"
                disabled={isSubmitting}
              />
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <input
                name="telefono"
                type="tel"
                placeholder="Telefono"
                value={values.telefono}
                onChange={handleChange}
                className="w-full border-b border-stone-200 bg-transparent py-4 text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-stone-900"
                disabled={isSubmitting}
              />
              <select
                name="tipo_sesion"
                value={values.tipo_sesion}
                onChange={handleChange}
                className="w-full border-b border-stone-200 bg-transparent py-4 text-stone-400 outline-none transition focus:border-stone-900"
                disabled={isSubmitting}
              >
                <option value="" disabled>
                  Tipo de Sesion
                </option>
                <option value="editorial">Retrato Editorial</option>
                <option value="boda">Boda Exclusiva</option>
                <option value="marca">Marca Personal</option>
              </select>
            </div>
            <input
              name="fecha_evento"
              type="date"
              aria-label="Fecha aproximada"
              value={values.fecha_evento}
              onChange={handleChange}
              className="w-full border-b border-stone-200 bg-transparent py-4 text-stone-400 outline-none transition focus:border-stone-900"
              disabled={isSubmitting}
            />
            <textarea
              name="mensaje"
              rows={4}
              placeholder="Hablanos de tu proyecto..."
              value={values.mensaje}
              onChange={handleChange}
              className="w-full resize-none border-b border-stone-200 bg-transparent py-4 text-stone-900 outline-none transition placeholder:text-stone-300 focus:border-stone-900"
              disabled={isSubmitting}
            />
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-stone-950 py-5 text-xs uppercase tracking-[0.3em] text-white transition duration-500 hover:bg-stone-800"
            >
              {isSubmitting ? "Enviando..." : "Enviar Solicitud"}
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
