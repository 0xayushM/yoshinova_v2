import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { forwardToBrewmyagent, getClientIp } from '@/lib/brewmyagent';

const SHEET_ID = '140-KUCrS36Dl_33lUv_FZXA92SuO8xkBCSbwmpwIH3I';
const CONTACTS_SHEET = 'Contacts';
const ENERGY_AUDIT_SHEET = 'Energy Audit';

interface ContactFormData {
  name: string;
  company: string;
  contact: string;
  // Known dialog types write to Google Sheets. Any other value
  // (e.g. 'contact-page') is forwarded to BrewMyAgent only.
  type: string;
  // Free-form payload — anything extra (powerBill, message, page, …)
  // gets forwarded verbatim to BrewMyAgent.
  [key: string]: unknown;
}

async function getGoogleSheetsClient() {
  const credentials = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
  
  if (!credentials) {
    throw new Error('Google Service Account credentials not found');
  }

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(credentials),
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const sheets = google.sheets({ version: 'v4', auth });
  return sheets;
}

export async function POST(request: Request) {
  try {
    const data: ContactFormData = await request.json();

    // Add timestamp in IST
    const timestamp = new Date().toLocaleString('en-IN', {
      timeZone: 'Asia/Kolkata',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Only the two dialog types persist to Google Sheets — other form types
    // (e.g. the long-form contact page) just forward to BrewMyAgent.
    const sheetTarget =
      data.type === 'energy-audit'
        ? ENERGY_AUDIT_SHEET
        : data.type === 'contact'
          ? CONTACTS_SHEET
          : null;

    let sheetsError: string | undefined;
    if (sheetTarget) {
      try {
        const sheets = await getGoogleSheetsClient();
        await sheets.spreadsheets.values.append({
          spreadsheetId: SHEET_ID,
          range: `${sheetTarget}!A:D`,
          valueInputOption: 'RAW',
          requestBody: {
            values: [[timestamp, data.name, data.company || '', data.contact]],
          },
        });
      } catch (err) {
        // Don't fail the user-facing call just because Sheets is down —
        // BrewMyAgent forwarding below is the source of truth for the dashboard.
        sheetsError = (err as Error).message;
        console.error('Sheets append failed', err);
      }
    }

    // Always forward to the BrewMyAgent dashboard. Enrich with metadata that
    // the form itself can't provide.
    await forwardToBrewmyagent(data.type || 'contact', {
      ...data,
      timestamp,
      ip: getClientIp(request),
      user_agent: request.headers.get('user-agent') ?? undefined,
      referer: request.headers.get('referer') ?? undefined,
    });

    return NextResponse.json({
      success: true,
      message: 'Form submitted successfully',
      sheetsError,
    });
  } catch (error) {
    console.error('Error submitting form:', error);
    return NextResponse.json(
      { success: false, message: 'Failed to submit form. Please try again.' },
      { status: 500 }
    );
  }
}
