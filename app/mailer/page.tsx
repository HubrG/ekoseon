"use client";
import React from 'react'

export default function page() {

    async function handleOnSubmit(event:any) {
      event.preventDefault();
      const form = new FormData(event.target);
      const recipientEmail = form.get('email');
      const subject = form.get('subject');
      const message = form.get('message');
      console.log(recipientEmail)
      
        const response = await fetch('/api/mailer/mailer', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ recipientEmail, subject, message }),
        });
        console.log(response)
        if (response.ok) {
          alert('Email sent successfully!');
        } else {
          alert('Failed to send email.');
        }
      }
  return (
      <div className="content">
          
          <form onSubmit={handleOnSubmit}>
  <input type="email" name="email" placeholder="Recipient's email" required />
  <input type="text" name="subject" placeholder="Subject" required />
  <textarea name="message" placeholder="Message" required></textarea>
  <button type="submit">Send Email</button>
</form>
    </div>
  )
}
