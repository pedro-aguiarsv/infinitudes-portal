// Inscrição da newsletter no Brevo. Só esta rota roda no servidor;
// o resto do site continua estático. A chave fica em BREVO_API_KEY.
import type { APIRoute } from "astro";

export const prerender = false;

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const INVALID_MESSAGE =
  "Informe um e-mail válido e aceite receber os e-mails.";
const FAILURE_MESSAGE =
  "Não foi possível enviar agora. Tente novamente em instantes.";

function json(body: { ok: boolean; error?: string }, status: number): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      "content-type": "application/json; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export const POST: APIRoute = async ({ request }) => {
  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return json({ ok: false, error: INVALID_MESSAGE }, 400);
  }

  if (!data || typeof data !== "object") {
    return json({ ok: false, error: INVALID_MESSAGE }, 400);
  }

  const record = data as Record<string, unknown>;
  const company = typeof record.company === "string" ? record.company : "";
  if (company.trim() !== "") {
    return json({ ok: true }, 200);
  }

  const email = typeof record.email === "string" ? record.email.trim() : "";
  const consent = record.consent === true;
  if (!consent || email.length > 254 || !EMAIL_PATTERN.test(email)) {
    return json({ ok: false, error: INVALID_MESSAGE }, 400);
  }

  const apiKey = process.env["BREVO_API_KEY"];
  const listId = Number(process.env["BREVO_LIST_ID"]);
  if (!apiKey || !Number.isInteger(listId) || listId <= 0) {
    return json({ ok: false, error: FAILURE_MESSAGE }, 500);
  }

  let brevo: Response;
  try {
    brevo = await fetch("https://api.brevo.com/v3/contacts", {
      method: "POST",
      headers: {
        "api-key": apiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        email,
        listIds: [listId],
        updateEnabled: true,
      }),
    });
  } catch {
    return json({ ok: false, error: FAILURE_MESSAGE }, 502);
  }

  if (!brevo.ok) {
    return json({ ok: false, error: FAILURE_MESSAGE }, 502);
  }

  return json({ ok: true }, 200);
};
