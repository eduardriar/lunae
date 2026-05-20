import crypto from 'crypto';

const API_VERSION = process.env.WHATSAPP_API_VERSION || 'v21.0';
const GRAPH_BASE = `https://graph.facebook.com/${API_VERSION}`;

export class WhatsappError extends Error {
  status: number;
  constructor(message: string, status: number = 500) {
    super(message);
    this.name = 'WhatsappError';
    this.status = status;
  }
}

type SendResponse = {
  messaging_product: 'whatsapp';
  contacts: { input: string; wa_id: string }[];
  messages: { id: string; message_status?: string }[];
};

export type TemplateComponent = {
  type: 'header' | 'body' | 'button';
  sub_type?: string;
  index?: number;
  parameters?: { type: string; text?: string }[];
};

const credentials = () => {
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  const token = process.env.WHATSAPP_ACCESS_TOKEN;
  if (!phoneId || !token) {
    throw new WhatsappError('WhatsApp credentials not configured', 500);
  }
  return { phoneId, token };
};

const postMessage = async (payload: object): Promise<SendResponse> => {
  const { phoneId, token } = credentials();

  const res = await fetch(`${GRAPH_BASE}/${phoneId}/messages`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const data = await res.json();
  if (!res.ok) {
    const message = data?.error?.message || `WhatsApp API error: ${res.status}`;
    throw new WhatsappError(message, res.status);
  }
  return data as SendResponse;
};

export const sendTextMessage = (to: string, body: string) =>
  postMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'text',
    text: { body, preview_url: false },
  });

export const sendTemplateMessage = (
  to: string,
  templateName: string,
  languageCode: string = 'es_CO',
  components?: TemplateComponent[]
) =>
  postMessage({
    messaging_product: 'whatsapp',
    to,
    type: 'template',
    template: {
      name: templateName,
      language: { code: languageCode },
      components,
    },
  });

export const verifyWebhookSignature = (
  rawBody: string,
  signature: string | null
): boolean => {
  if (!signature) return false;
  const secret = process.env.WHATSAPP_APP_SECRET;
  if (!secret) return false;

  const expected =
    'sha256=' +
    crypto.createHmac('sha256', secret).update(rawBody, 'utf8').digest('hex');

  const expectedBuf = Buffer.from(expected);
  const sigBuf = Buffer.from(signature);
  if (expectedBuf.length !== sigBuf.length) return false;
  return crypto.timingSafeEqual(expectedBuf, sigBuf);
};
