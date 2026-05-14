import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const SCOPES = ['https://www.googleapis.com/auth/calendar.events'];

const getAuth = () => {
  if (process.env.NODE_ENV === 'production') {
    const raw = process.env.GOOGLE_SERVICE_ACCOUNT_KEY;
    if (!raw) {
      throw new Error('GOOGLE_SERVICE_ACCOUNT_KEY env variable is not set');
    }
    return new google.auth.GoogleAuth({
      credentials: JSON.parse(raw),
      scopes: SCOPES,
    });
  }

  const keyPath = path.join(process.cwd(), 'keys/lunae-495820-1e32b0fd33d6.json');
  if (!fs.existsSync(keyPath)) {
    throw new Error('Google Service Account key file not found');
  }
  return new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: SCOPES,
  });
};

export const getCalendarClient = () => {
  const auth = getAuth();
  return google.calendar({ version: 'v3', auth });
};

export default getCalendarClient;