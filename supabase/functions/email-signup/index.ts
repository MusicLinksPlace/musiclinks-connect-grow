const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

type Payload = {
  email: string;
  source?: string | null;
  metadata?: Record<string, unknown> | null;
};

function isRecord(v: unknown): v is Record<string, unknown> {
  return typeof v === "object" && v !== null && !Array.isArray(v);
}

function json(status: number, body: unknown) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });
  if (req.method !== "POST") return json(405, { ok: false, error: "Method not allowed" });

  const supabaseUrl = Deno.env.get("SUPABASE_URL");
  const serviceRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
  if (!supabaseUrl || !serviceRoleKey) {
    return json(500, { ok: false, error: "Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY" });
  }

  let payload: Payload;
  try {
    payload = (await req.json()) as Payload;
  } catch {
    return json(400, { ok: false, error: "Invalid JSON body" });
  }

  const email = (payload?.email ?? "").toString().trim();
  if (!email) return json(400, { ok: false, error: "Missing email" });

  const source = payload.source === undefined ? null : (payload.source ?? "").toString();
  const metadata = isRecord(payload.metadata) ? payload.metadata : null;
  const cleanupAfter =
    req.headers.get("x-test-cleanup") === "true" || source === "automated-test";

  const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/rest/v1/email_signups`, {
    method: "POST",
    headers: {
      apikey: serviceRoleKey,
      Authorization: `Bearer ${serviceRoleKey}`,
      "Content-Type": "application/json",
      Prefer: "return=representation",
    },
    body: JSON.stringify({ email, source, metadata }),
  });

  const text = await res.text();
  if (!res.ok) {
    return json(502, { ok: false, error: "Supabase insert failed", status: res.status, details: text });
  }

  let insertedEmail: string | null = null;
  try {
    const arr = JSON.parse(text) as Array<{ email?: string }>;
    insertedEmail = (arr?.[0]?.email ?? null) as string | null;
  } catch {
    // ignore
  }

  if (cleanupAfter) {
    // Best-effort cleanup: keep the table clean after automated tests.
    await fetch(
      `${supabaseUrl.replace(/\/$/, "")}/rest/v1/email_signups?email=eq.${encodeURIComponent(email)}`,
      {
        method: "DELETE",
        headers: {
          apikey: serviceRoleKey,
          Authorization: `Bearer ${serviceRoleKey}`,
        },
      },
    );
  }

  return json(200, { ok: true, email: insertedEmail ?? email });
});

