import { google } from 'googleapis';
import path from 'path';
import fs from 'fs';

const getAuth = () => {
  const keyPath = path.join(process.cwd(), 'keys/lunae-495820-1e32b0fd33d6.json');
  
  if (!fs.existsSync(keyPath)) {
    throw new Error('Google Service Account key file not found');
  }

  const auth = new google.auth.GoogleAuth({
    keyFile: keyPath,
    scopes: ['https://www.googleapis.com/auth/calendar.events'],
  });

  return auth;
};

export const getCalendarClient = () => {
  const auth = getAuth();
  return google.calendar({ version: 'v3', auth });
};

export default getCalendarClient;