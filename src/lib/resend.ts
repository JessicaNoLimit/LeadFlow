import { Resend } from "resend";


type SendPresupuestoEmailInput = {
  clientEmail: string;
  clientName: string;
  presupuestoTitle: string;
  presupuestoDescription: string | null;
  presupuestoAmount: number;
  presupuestoStatus: string;
};

const currencyFormatter = new Intl.NumberFormat("es-ES", {
  style: "currency",
  currency: "EUR",
});

function getResendEnvVariable(name: "RESEND_API_KEY" | "RESEND_FROM_EMAIL") {
  const value = process.env[name];

  if (!value) {
    throw new Error(`Missing environment variable: ${name}`);
  }

  return value;
}

export async function sendPresupuestoEmail({
  clientEmail,
  clientName,
  presupuestoTitle,
  presupuestoDescription,
  presupuestoAmount,
  presupuestoStatus,
}: SendPresupuestoEmailInput) {
  const amountLabel = currencyFormatter.format(presupuestoAmount);
  const descriptionLabel =
    presupuestoDescription?.trim() || "Propuesta comercial personalizada para tu proyecto.";
  const resend = new Resend(getResendEnvVariable("RESEND_API_KEY"));

  return resend.emails.send({
    from: getResendEnvVariable("RESEND_FROM_EMAIL"),
    to: clientEmail,
    subject: "Tu propuesta de Lorenzo Bellucci Studio",
    html: `
      <div style="margin:0;padding:40px 24px;background:#0c0c0c;color:#f4efe7;font-family:Georgia,'Times New Roman',serif;">
        <div style="max-width:640px;margin:0 auto;border:1px solid rgba(255,255,255,0.1);border-radius:28px;padding:40px 32px;background:linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02));">
          <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.32em;text-transform:uppercase;color:#d7c6a8;">Lorenzo Bellucci Studio</p>
          <h1 style="margin:0 0 18px;font-size:34px;line-height:1.15;font-weight:500;">Tu propuesta comercial</h1>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d8d1c7;">Hola ${clientName},</p>
          <p style="margin:0 0 24px;font-size:16px;line-height:1.8;color:#d8d1c7;">
            Gracias por tu interés en el estudio. Hemos preparado una propuesta inicial para tu proyecto fotográfico.
          </p>

          <div style="border:1px solid rgba(255,255,255,0.1);border-radius:24px;padding:24px;background:rgba(255,255,255,0.03);">
            <p style="margin:0 0 10px;font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#d7c6a8;">Propuesta</p>
            <h2 style="margin:0 0 14px;font-size:28px;line-height:1.2;font-weight:500;color:#f4efe7;">${presupuestoTitle}</h2>
            <p style="margin:0 0 18px;font-size:15px;line-height:1.8;color:#d8d1c7;">${descriptionLabel}</p>
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#a8a097;">Estado actual</p>
            <p style="margin:0 0 18px;font-size:16px;line-height:1.6;color:#f4efe7;text-transform:capitalize;">${presupuestoStatus.replaceAll("_", " ")}</p>
            <p style="margin:0 0 8px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;color:#a8a097;">Importe</p>
            <p style="margin:0;font-size:30px;line-height:1.2;color:#f4efe7;">${amountLabel}</p>
          </div>

          <div style="margin-top:28px;border-top:1px solid rgba(255,255,255,0.08);padding-top:24px;">
            <p style="margin:0 0 14px;font-size:11px;letter-spacing:0.26em;text-transform:uppercase;color:#d7c6a8;">Condiciones</p>
            <p style="margin:0 0 10px;font-size:15px;line-height:1.8;color:#d8d1c7;">Presupuesto orientativo sujeto a confirmación final.</p>
            <p style="margin:0 0 10px;font-size:15px;line-height:1.8;color:#d8d1c7;">Validez de la propuesta: 15 días.</p>
            <p style="margin:0;font-size:15px;line-height:1.8;color:#d8d1c7;">La reserva queda confirmada tras aceptación y contacto directo con el estudio.</p>
          </div>

          <p style="margin:28px 0 0;font-size:15px;line-height:1.8;color:#d8d1c7;">
            Si deseas avanzar, responde a este correo y coordinaremos los siguientes pasos.
          </p>
          <p style="margin:24px 0 0;font-size:15px;line-height:1.8;color:#f4efe7;">
            Lorenzo Bellucci Studio
          </p>
        </div>
      </div>
        `,
  });
}

const DEFAULT_FROM_EMAIL = "onboarding@resend.dev";

function getResendClient() {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("Missing environment variable: RESEND_API_KEY");
  }

  return new Resend(apiKey);
}

function getFromEmail() {
  return process.env.RESEND_FROM_EMAIL || DEFAULT_FROM_EMAIL;
}

type LeadEmailParams = {
  nombre: string;
  email: string;
  tipo_sesion: string;
};

export async function sendLeadConfirmationEmail({
  nombre,
  email,
  tipo_sesion: tipoSesion,
}: LeadEmailParams) {
  const resend = getResendClient();

  return resend.emails.send({
    from: getFromEmail(),
    to: email,
    subject: "Hemos recibido tu solicitud - Lorenzo Bellucci Studio",
    text: [
      `Hola ${nombre},`,
      "",
      "Gracias por contactar con Lorenzo Bellucci Studio.",
      `Hemos recibido correctamente tu solicitud para una sesion de tipo "${tipoSesion}".`,
      "Te responderemos lo antes posible con mas detalles.",
      "",
      "Lorenzo Bellucci Studio",
    ].join("\n"),
  });
}

export async function sendAdminLeadNotificationEmail({
  nombre,
  email,
  tipo_sesion: tipoSesion,
}: LeadEmailParams) {
  const adminEmail = process.env.RESEND_ADMIN_EMAIL;

  if (!adminEmail) {
    return null;
  }

  const resend = getResendClient();

  return resend.emails.send({
    from: getFromEmail(),
    to: adminEmail,
    subject: "Nuevo lead recibido - Lorenzo Bellucci Studio",
    text: [
      "Se ha recibido un nuevo lead desde el formulario publico.",
      "",
      `Nombre: ${nombre}`,
      `Email: ${email}`,
      `Tipo de sesion: ${tipoSesion}`,
    ].join("\n"),
  });
}