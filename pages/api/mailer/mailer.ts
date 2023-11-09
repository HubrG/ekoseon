import { NextApiRequest, NextApiResponse } from 'next';
import sgMail from '@sendgrid/mail';

sgMail.setApiKey(process.env.SENDGRID_API_KEY || '');

export default async function sendMail(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === 'POST') {
    const { recipientEmail, subject, message, contactForm } = req.body;
      // console.log(recipientEmail, subject, message, contactForm)
    // Assurez-vous que l'email de l'expéditeur est défini
    const senderEmail = process.env.EMAIL_FROM || `contact@${process.env.APP_NAME}`;
    
    const msg = {
      to: contactForm ? senderEmail : recipientEmail , // Assurez-vous que ceci est une chaîne valide
      from: senderEmail, // Ceci ne doit pas être 'undefined'
      subject: contactForm ? `[CONTACTFORM - ${recipientEmail}] ${subject}` : subject, // Assurez-vous que ceci est une chaîne valide
      // text: message, // Assurez-vous que ceci est une chaîne valide
      html:message
    };

    try {
      await sgMail.send(msg);
      res.status(200).json({ message: 'Email sent successfully.' });
    } catch (error: any) { // Utilisez `any` ou un type plus spécifique si vous savez ce que l'erreur peut être
      console.error('Error sending email', error);

      // Vérifiez si l'erreur a une propriété `response`
      if (error.response) {
        // Maintenant que nous avons vérifié, TypeScript sait que `response` existe
        console.error(error.response.body);
      }

      // Envoyez une réponse avec le message d'erreur approprié
      res.status(500).json({ error: 'Error sending email', details: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
