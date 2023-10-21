import PageTransition from "@/src/feature/layout/effects/PageTransition";
import Link from "next/link";

export default async function legal() {
	return (
    <PageTransition>
      <section className="content">
        <h1>Mentions Légales</h1>
			<p>Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l’économie numérique, il est précisé aux utilisateurs du site legalplace.fr l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi. </p>
        <h2>
          Identification de l’éditeur et du responsable de la publication :
        </h2>
        <p>
          Nom de la société : Ekoseon
          <br />
          Adresse : 32 boulevard Jules Verne
          <br />
          Téléphone : +33 6 12 75 82 61
          <br />
          E-mail : <Link href="mailto:contact@ekoseon.fr">contact@ekoseon.fr</Link>
          <br />
          Numéro de SIRET : 50751843900033
        </p>

        <h2>Hébergement :</h2>
        <p>
          Nom de l’hébergeur : <a href="https://vercel.com" target="_blank" >Vercel</a>
        </p>

        <h2>Propriété intellectuelle :</h2>
        <p>
          Les contenus présents sur le site, notamment les textes, images, sons
          et vidéos, sont protégés par des droits de propriété intellectuelle.
          Toute reproduction ou diffusion non autorisée de ces contenus est
          interdite.
        </p>

        <h2>Protection des données personnelles :</h2>
        <p>
          Nous recueillons et traitons des données personnelles dans le cadre
          des services proposés sur ce site. Ces traitements sont réalisés dans
          le respect des réglementations en vigueur, et notamment du Règlement
          Général sur la Protection des Données (RGPD).
        </p>

        <h2>Cookies :</h2>
        <p>
          Le site utilise des cookies afin d&aposaméliorer l&aposexpérience
          utilisateur et de réaliser des statistiques de visite.
        </p>

        <h2>Limitation de responsabilité :</h2>
        <p>
          Ekoseon ne saurait être tenu responsable des dommages directs ou
          indirects résultant de l&aposaccès ou de l&aposutilisation du site, y
          compris l&aposinaccessibilité, les pertes de données, et/ou la
          présence de virus sur le site.
        </p>
      </section>
    </PageTransition>
  );
}
