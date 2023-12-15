// pages/api/sms-reply.ts
import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const messageBody = req.body.Body || ''; // Le corps du message SMS entrant

    // Vous pouvez implémenter ici une logique personnalisée basée sur le messageBody si nécessaire

    // Définissez le content-type en text/xml
    res.setHeader('Content-Type', 'text/xml');
    // Renvoyez le TwiML pour répondre au message
    res.send(`
      <?xml version="1.0" encoding="UTF-8"?>
      <Response>
        <Message>Test</Message>
      </Response>
    `);
  } else {
    // Gérez les autres méthodes de requête ou renvoyez une erreur
    res.status(405).end();
  }
}
