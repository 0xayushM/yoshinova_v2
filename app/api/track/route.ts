import { NextResponse } from 'next/server';
import { forwardToBrewmyagent, getClientIp } from '@/lib/brewmyagent';

/**
 * Visitor / pageview tracking endpoint.
 *
 * The client-side `VisitorTracker` posts a JSON snapshot of browser & device
 * details here. We enrich it with server-known fields (IP from proxy headers,
 * full UA, referer) and forward the lot to BrewMyAgent under form_name
 * 'visitor' so it lands in the dashboard alongside form submissions.
 */
export async function POST(request: Request) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    const enriched = {
      ...body,
      timestamp,
      ip: getClientIp(request),
      user_agent_server: request.headers.get('user-agent') ?? undefined,
      accept_language: request.headers.get('accept-language') ?? undefined,
      referer_server: request.headers.get('referer') ?? undefined,
    };

    const formName = (body.event as string) || 'visitor';
    await forwardToBrewmyagent(formName, enriched);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error('Track endpoint failed', err);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
