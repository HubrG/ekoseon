import ContactForm from "@/src/feature/layout/contact/ContactForm";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Contactez-nous"),
  description: "Ekoseon",
};

export default function contact() {
  return (
      <section className="contact-section">
        {/* Comment: Title for the Contact page */}
        <div className="content">
          <h1>Contactez Ekoseon</h1>
          {/* Comment: Brief description to encourage contact */}
          <p>
            Si vous êtes prêt à immortaliser les chapitres de votre vie ou si
            vous avez des questions sur nos services personnalisés, nous sommes
            à votre écoute. Chez Ekoseon, chaque histoire est précieuse et nous
            sommes dédiés à capturer, avec la plus grande attention, les récits
            qui vous tiennent à cœur.
          </p>

          {/* Comment: Contact method: Email */}
          <div className="contact-method">
            <h2>Écrivez-nous !</h2>
            <ContactForm />
          </div>

          {/* Comment: Contact method: Phone */}
          <div className="contact-method">
            <h2>Téléphone</h2>
            <p>
              Si vous préférez une prise de contact plus personnelle ou une
              réponse immédiate, n’hésitez pas à nous appeler au numéro suivant
              :
              <a href="tel:+33780947330" className="phone-link">
                0780947330
              </a>
              . Nous sommes disponibles pour échanger avec vous, comprendre vos
              attentes et vous guider à travers nos services.
            </p>
          </div>
        </div>
      </section>
  );
}
