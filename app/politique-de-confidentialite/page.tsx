import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import Link from "next/link";
export const metadata: Metadata = {
  title: Meta("title", "Politique de confidentialité"),
  description: "Ekoseon",
};
export default async function privacy() {
  return (
    <PageTransition>
      <section>
        <div className="content max-w-3xl">
          <h1 className="title-page">Politique de confidentialité</h1>
          <p className="text-sm">
          Cette politique de confidentialité définit et vous informe de la
          manière dont Ekoseon utilise et protège les informations que vous nous
          transmettez, le cas échéant, lorsque vous utilisez ce site accessible
          à partir de l&apos;URL suivante : <Link href="/">https://ekoseon.fr</Link>.
        </p>

        <h2>1. Collecte des informations</h2>
        <p>
          Ekoseon peut collecter vos informations personnelles lorsque vous
          naviguez sur le Site, y compris, mais sans s&apos;y limiter, votre nom,
          prénom, adresse e-mail, numéro de téléphone, et toute autre
          information saisie lors de l&apos;utilisation de nos services ou lors de la
          création d&apos;un compte utilisateur.
        </p>

        <h2>2. Utilisation des données personnelles</h2>
        <p>
          Les informations recueillies via le Site font l’objet d’un traitement
          informatique destiné à la gestion des commandes, à la fourniture de
          nos services, à l&apos;amélioration de l&apos;expérience utilisateur et, si vous
          y avez consenti, à l&apos;envoi de messages promotionnels. Ekoseon est le
          seul destinataire de vos données personnelles.
        </p>

        <h2>3. Confidentialité des données</h2>
        <p>
          Ekoseon s&apos;engage à ne pas vendre, partager ou divulguer vos données
          personnelles à des tiers hors consentement explicite. Cependant, ces
          données pourront être occasionnellement transmises à des tiers
          agissant pour le compte ou au nom de Ekoseon, ou en relation avec
          l&apos;activité de l&apos;entreprise, dans le cadre de l&apos;utilisation des
          services offerts par le Site.
        </p>

        <h2>4. Sécurité des informations</h2>
        <p>
          Ekoseon met en œuvre toutes les mesures techniques et
          organisationnelles nécessaires pour garantir la sécurité et la
          confidentialité de vos données personnelles.
        </p>

        <h2>5. Conservation des données</h2>
        <p>
          Vos données personnelles sont conservées par Ekoseon uniquement pour
          le temps correspondant à la finalité de la collecte tel qu&apos;indiqué en
          2 ci-dessus qui ne saurait excéder 24 mois.
        </p>

        <h2>6. Cookies</h2>
        <p>
          Le Site peut utiliser des “cookies” pour traiter des informations
          permettant d&apos;améliorer votre expérience en ligne. Ces cookies
          facilitent la navigation et optimisent la convivialité du Site. Vous
          pouvez vous opposer à l&apos;enregistrement de cookies en configurant votre
          navigateur.
        </p>

        <h2>7. Vos droits</h2>
        <p>
          Conformément à la loi Informatique et Libertés et au RGPD, vous
          disposez des droits d&apos;accès, de rectification, de portabilité et de
          suppression de vos données personnelles. Vous pouvez également vous
          opposer au traitement de vos données personnelles. Vous pouvez exercer
          ces droits en nous écrivant à l&apos;adresse suivante : <a href="mailto:contact@ekoseon.fr">contact@ekoseon.fr</a>.
        </p>

        <h2>8. Consentement</h2>
        <p>
          En utilisant notre Site, vous consentez à notre politique de
          confidentialité.
        </p>

        <h2>9. Mise à jour de la politique de confidentialité</h2>
        <p>
          Ekoseon se réserve le droit de modifier cette politique de
          confidentialité à tout moment, aussi les utilisateurs sont encouragés
          à la consulter de manière régulière.
        </p>

        <h2>10. Contact</h2>
        <p>
          Pour toute question relative à cette politique ou pour toute demande
          relative à vos données personnelles, vous pouvez nous contacter à
          l&apos;adresse suivante : <a href="mailto:contact@ekoseon.fr">contact@ekoseon.fr</a> ou par téléphone au
          0612758261.
        </p>
      </div>
      </section>
    </PageTransition>
  );
}
