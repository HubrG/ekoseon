import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Fonctionnement"),
  description: "Ekoseon",
};

export default async function working() {
  return (
    <PageTransition>
      <section className="how-it-works-section">
        <div className="content">
          {/* Comment: Title for the How It Works section */}
          <h1>Comment Ça Marche ?</h1>

          {/* Comment: Step-by-step guide to Ekoseon&apos;s process */}
          <ol className="steps-list">
            {/* Comment: Step 1 - Choosing interview hours */}
            <li>
              <h3>
                1) Définissez la Durée de Votre Entretien et l’Option Biographie
              </h3>
              <p>
                Votre voyage narratif commence en optant pour des heures
                d&apos;entretien qui se transformeront en une série de podcasts
                passionnants. L&apos;offre de base est calculée selon un tarif
                transparent de 80€ de l&apos;heure pour les sessions audio. À
                cette étape, vous pouvez également sélectionner l&apos;option
                supplémentaire : la création d&apos;une biographie écrite. Ce
                choix permet de transposer les récits de vos entretiens en un
                livre commémoratif, témoignage pérenne de votre héritage pour
                les générations futures.
              </p>
            </li>
            {/* Comment: Step 2 - Pre-interview preparation */}
            <li>
              <h3>2) Planification de Votre Pré-Entretien</h3>
              <p>
                Après avoir confirmé votre commande, nous organisons un
                pré-entretien. Ce dialogue initial est essentiel pour cerner les
                contours de votre projet, élucider les axes principaux de votre
                récit et convenir des dates des entretiens. C&apos;est le
                fondement qui nous permet de personnaliser votre expérience avec
                Ekoseon.
              </p>
            </li>

            {/* Comment: Step 3 - The interview itself */}
            <li>
              <h3>3) Réalisation de l&apos;Entretien</h3>
              <p>
                L&apos;étape clé du processus est l&apos;entretien lui-même.
                Pendant cette période, vous partagez, en toute confiance, vos
                souvenirs et vos histoires avec notre interviewer qualifié.
                L&apos;objectif est de capturer l&apos;essence de vos
                expériences dans un échange authentique et agréable.
              </p>
            </li>

            {/* Comment: Step 4 - Editing, sending the podcast, and if chosen, writing and sending the biography */}
            <li>
              <h3>4) Montage, Envoi et Option Biographie</h3>
              <p>
                Suite à vos entretiens, notre équipe se lance dans le montage de
                votre podcast, s&apos;attelant à polir et assembler le contenu
                pour en accentuer la qualité narrative et émotionnelle. Une fois
                le montage finalisé, nous vous envoyons votre série de podcasts.
                Si vous avez opté pour l&apos;option biographie, nous procédons
                également au montage écrit et à la rédaction de votre livre, qui
                sera ensuite acheminé vers vous, prêt à rejoindre votre héritage
                familial.
              </p>
            </li>
          </ol>
        </div>
      </section>
    </PageTransition>
  );
}
