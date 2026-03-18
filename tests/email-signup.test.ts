import { describe, expect, test } from "vitest";
import dotenv from "dotenv";

dotenv.config();

function getEnv(name: string): string {
  const fromProcess = process.env[name];
  const fromImportMeta = (import.meta as any)?.env?.[name];
  const value = fromProcess || fromImportMeta;

  if (!value) {
    throw new Error(`Missing env var ${name}`);
  }

  return value;
}

function supabaseRestUrl(supabaseUrl: string) {
  return `${supabaseUrl.replace(/\/$/, "")}/rest/v1`;
}

describe("email signup", () => {
  test("POST inserts an email into Supabase", async () => {
    const supabaseUrl = getEnv("VITE_SUPABASE_URL");
    const anonKey = getEnv("VITE_SUPABASE_ANON_KEY");

    const timestamp = Date.now();
    const email = `test+${timestamp}@test.com`;

    const res = await fetch(`${supabaseUrl.replace(/\/$/, "")}/functions/v1/email-signup`, {
      method: "POST",
      headers: {
        apikey: anonKey,
        Authorization: `Bearer ${anonKey}`,
        "Content-Type": "application/json",
        "x-test-cleanup": "true",
      },
      body: JSON.stringify({
        email,
        source: "automated-test",
        metadata: { profile_type: "artiste", first_name: "Test" },
      }),
    });

    if (res.status === 404) {
      throw new Error(
        "Edge Function 'email-signup' not found (404). Deploy it with `npx supabase functions deploy email-signup` and set SUPABASE_SERVICE_ROLE_KEY in Supabase secrets.",
      );
    }

    expect(res.status).toBe(200);
    const json = (await res.json()) as { ok?: boolean; email?: string };
    expect(json.ok).toBe(true);
    expect(json.email).toBe(email);

    const serviceRole = process.env.SUPABASE_SERVICE_ROLE_KEY;
    if (serviceRole) {
      const verify = await fetch(
        `${supabaseRestUrl(supabaseUrl)}/email_signups?select=id,email&email=eq.${encodeURIComponent(email)}`,
        {
          headers: {
            apikey: serviceRole,
            Authorization: `Bearer ${serviceRole}`,
          },
        },
      );

      expect(verify.status).toBe(200);
      const rows = (await verify.json()) as Array<{ id: string; email: string }>;
      expect(rows.some((r) => r.email === email)).toBe(true);
    }
  });
});

