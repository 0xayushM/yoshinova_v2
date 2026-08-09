/**
 * Server-side helper to forward a payload to the BrewMyAgent dashboard.
 *
 * Credentials live in env vars (BREWMYAGENT_PROJECT_ID, BREWMYAGENT_API_KEY)
 * and are never exposed to the browser.
 *
 * Failure is swallowed and logged — we never want a downstream tracker
 * outage to break a user-facing form submission.
 */
export async function forwardToBrewmyagent(
  formName: string,
  data: Record<string, unknown>
): Promise<{ ok: boolean; error?: string }> {
  const projectId = process.env.BREWMYAGENT_PROJECT_ID;
  const apiKey = process.env.BREWMYAGENT_API_KEY;

  if (!projectId || !apiKey) {
    const msg = 'BrewMyAgent env vars missing — skipping forward.';
    console.warn(msg);
    return { ok: false, error: msg };
  }

  const endpoint = `https://dashboard.brewmyagent.com/api/submit/${projectId}`;

  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        form_name: formName,
        data,
      }),
    });
    if (!res.ok) {
      const text = await res.text().catch(() => '');
      console.error('BrewMyAgent forward failed', res.status, text);
      return { ok: false, error: `HTTP ${res.status}` };
    }
    return { ok: true };
  } catch (err) {
    console.error('BrewMyAgent forward errored', err);
    return { ok: false, error: (err as Error).message };
  }
}

/**
 * Best-effort extraction of the originating client IP from a Next.js
 * Request's headers. Falls back to undefined if no proxy headers are set
 * (e.g. local dev without a reverse proxy).
 */
export function getClientIp(request: Request): string | undefined {
  const xff = request.headers.get('x-forwarded-for');
  if (xff) return xff.split(',')[0].trim();
  return (
    request.headers.get('x-real-ip') ??
    request.headers.get('cf-connecting-ip') ??
    undefined
  );
}
