import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Conditions générales de vente"),
  description: "Ekoseon",
};

export default async function cgv() {
  return (
    <PageTransition>
      <section>
        <div className="content max-w-3xl">
          <h1  className="title-page">Conditions Générales de Vente (CGV)</h1>

          <h2>1. Identification de l&apos;entreprise</h2>
          <p>
            Ekoseon, micro-entreprise au capital variable, dont le siège social
            est situé au 32 bd Jules Verne, 44300 Nantes, France, SIRET
            50751843900033. La TVA n&apos;est pas applicable, art. 293 B du CGI.
          </p>

          <h2>2. Description des services</h2>
          <p>
            Ekoseon se spécialise dans la création de podcasts et livres
            biographiques personnalisés à partir d&apos;entretiens audio. Les
            services incluent l&apos;organisation d&apos;entretiens en ligne, leur montage
            en podcast, leur gravure sur CD et la transcription en livres
            reliés. Ekoseon vend également des micro-cravates pour améliorer
            l&apos;enregistrement audio des entretiens, réalisés via l&apos;application
            Zencastr.
          </p>

          <h2>3. Processus de commande</h2>
          <p>
            La sélection et le paiement des services se font sur le site
            d&apos;Ekoseon. Les clients choisissent le nombre d&apos;heures d&apos;entretien et
            les options désirées, avec un paiement sécurisé par Stripe. Un
            échelonnement du paiement est proposé pour des montants supérieurs à
            300€. Suite à la commande, un pré-entretien est organisé pour
            préciser le projet et planifier les séances d&apos;enregistrement.
          </p>

          <h2>4. Prix et paiement</h2>
          <p>
            Le tarif pour une heure d&apos;entretien est de 80€, et l&apos;option
            biographie est facturée à 240€ pour la première heure, avec un tarif
            dégressif par heure supplémentaire. Les transactions sont sécurisées
            via Stripe, et les facilités de paiement sont proposées conformément
            aux conditions mentionnées.
          </p>

          <h2>6. Livraison</h2>
          <p>
            Le podcast est livré en une semaine maximum après le dernier
            entretien, et la biographie est livrée en quatre semaines à partir
            du dernier enregistrement. Les micros sont expédiés immédiatement
            après la confirmation de la commande.
          </p>

          <h2>7. Rétractation et remboursement</h2>
          <p>
            Toute heure entamée est due et non remboursable. En cas de
            rétractation, les frais de Stripe sont déduits. Pour les
            biographies, le coût de l&apos;heure d&apos;entretien incluant la biographie
            est retenu avec une réduction dégressive allant jusqu&apos;à 30%.
          </p>

          <h2>8. Confidentialité et données personnelles</h2>
          <p>
            Ekoseon assure la confidentialité des données. Les cookies servent à
            améliorer l&apos;expérience utilisateur, les informations de paiement
            sont traitées exclusivement par Stripe, et les mots de passe sont
            sécurisés par cryptage.
          </p>

          <h2>9. Service après-vente et réclamations</h2>
          <p>
            Les clients peuvent adresser leurs réclamations par e-mail ou par
            téléphone. Ekoseon s&apos;engage à fournir une réponse sous 48 heures
            ouvrées.
          </p>

          <h2>10. Modification des CGV</h2>
          <p>
            Ekoseon peut réviser ces CGV à tout moment. Les clients seront
            soumis aux politiques et CGV en vigueur au moment de leur commande,
            sauf changement requis par la loi ou autorité gouvernementale.
          </p>

          <h2>11. Loi applicable et résolution des litiges</h2>
          <p>
            Ces CGV sont soumises au droit français. En cas de litige, les
            parties chercheront une résolution amiable avant toute procédure
            judiciaire. À défaut d&apos;accord, le litige sera porté devant les
            juridictions compétentes.
          </p>
        </div>
      </section>{" "}
    </PageTransition>
  );
}
