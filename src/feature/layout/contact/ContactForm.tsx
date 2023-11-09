"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Toastify } from "../toastify/Toastify";
import { Loader } from "@/components/ui/loader";
import validator from 'validator';

export default function ContactForm() {
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);


  async function handleOnSubmit(event: any) {
    event.preventDefault();
    setIsLoading(true);

    const form = new FormData(event.target);
    const recipientEmail = form.get("email");
    const subject = form.get("subject");
    const message = form.get("message");
    const contactForm = true;

    const response = await fetch("/api/mailer/mailer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ recipientEmail, subject, message, contactForm }),
    });
    console.log(response);
    if (response.ok) {
      Toastify({
        type: "success",
        value:
          "Votre message a bien été envoyé ! Nous prendons contact avec vous dans les plus brefs délais.",
      });
      // On vide les champs du formulaire
      setEmail("");
      setSubject("");
      setMessage("");
    } else {
      Toastify({
        type: "error",
        value:
          "Une erreur est survenue. Votre message n'a pas été envoyé, veuillez réessayer.",
      });
    }
    setIsLoading(false);
  }

  return (
    <div>
      {" "}
      <form onSubmit={handleOnSubmit} className="flex flex-col gap-y-5">
        <Input
          type="email"
          name="email"
          onChange={(e) => setEmail(e.currentTarget.value)}
          placeholder="Votre adresse email"
          value={email}
          required
        />
        <Input
          type="text"
          name="subject"
          onChange={(e) => setSubject(e.currentTarget.value)}
          placeholder="À quel sujet ?"
          value={subject}
          required
        />
        <textarea
          name="message"
          value={message}
          onChange={(e) => setMessage(e.currentTarget.value)}
          placeholder="Votre message"
          className="shadcnTextarea"
          style={{"height":"150px"}}
          required></textarea>
        <Button type="submit" disabled={isLoading || !message || !subject || !email || !validator.isEmail(email)}>{ isLoading && <Loader /> } Envoyer votre message</Button>
      </form>
    </div>
  );
}
