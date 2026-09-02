const EMAILJS_ENDPOINT = "https://api.emailjs.com/api/v1.0/email/send";

type ContactPayload = {
  user_name?: unknown;
  user_email?: unknown;
  message?: unknown;
};

function isNonEmptyString(value: unknown, maxLength: number): value is string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= maxLength;
}

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Corpo da requisição inválido." }, { status: 400 });
  }

  const { user_name, user_email, message } = body;

  if (
    !isNonEmptyString(user_name, 200) ||
    !isNonEmptyString(user_email, 200) ||
    !isNonEmptyString(message, 5000)
  ) {
    return Response.json({ error: "Preencha nome, email e mensagem." }, { status: 400 });
  }

  const serviceId = process.env.EMAILJS_SERVICE_ID;
  const templateId = process.env.EMAILJS_TEMPLATE_ID;
  const publicKey = process.env.EMAILJS_PUBLIC_KEY;
  const privateKey = process.env.EMAILJS_PRIVATE_KEY;

  if (!serviceId || !templateId || !publicKey || !privateKey) {
    return Response.json({ error: "Envio de email não configurado." }, { status: 500 });
  }

  const res = await fetch(EMAILJS_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      service_id: serviceId,
      template_id: templateId,
      user_id: publicKey,
      accessToken: privateKey,
      template_params: { user_name, user_email, message },
    }),
  });

  if (!res.ok) {
    console.error("EmailJS send failed:", res.status, await res.text());
    return Response.json({ error: "Falha ao enviar a mensagem." }, { status: 502 });
  }

  return Response.json({ ok: true });
}
