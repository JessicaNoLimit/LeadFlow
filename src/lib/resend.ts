import { Resend } from "resend";

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
