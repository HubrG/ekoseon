import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { getUser } from "@/src/query/user.query";
import {  Card,
  CardContent,
  CardDescription,
  CardHeader } from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faScaleBalanced } from "@fortawesome/pro-duotone-svg-icons";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Mentions légales"),
  description: "Ekoseon",
};



export default async function legal() {

  return (
    <PageTransition>
      <section>
        <div  className="content max-w-3xl">
          <h1 className="title-page"><FontAwesomeIcon icon={faScaleBalanced} /> Mentions Légales</h1>
      <Card>
      <CardHeader className="space-y-1">
        <CardDescription>
        Conformément aux dispositions de la loi n° 2004-575 du 21 juin 2004 pour la confiance en l’économie numérique, il est précisé aux utilisateurs du site ekoseon.fr l’identité des différents intervenants dans le cadre de sa réalisation et de son suivi.
        </CardDescription>
      </CardHeader>
      <CardContent className=" gap-4">

     
		
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
          E-mail : <a href="mailto:contact@ekoseon.fr">contact@ekoseon.fr</a>
          <br />
          Numéro de SIRET : 50751843900033
        </p>

        <h2>Hébergement et site internet :</h2>
        <p>
          Développeur du site internet : <a href="mailto:contact@ekoseon.fr">Hubert Giorgi</a>
        <br />
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
          Le site utilise des cookies afin d&apos;améliorer l&apos;expérience
          utilisateur et de réaliser des statistiques de visite.
        </p>

        <h2>Limitation de responsabilité :</h2>
        <p>
          Ekoseon ne saurait être tenu responsable des dommages directs ou
          indirects résultant de l&apos;accès ou de l&apos;utilisation du site, y
          compris l&apos;inaccessibilité, les pertes de données, et/ou la
          présence de virus sur le site.
        </p>
        </CardContent>
        </Card>
        </div>
      </section>
    </PageTransition>
  );
}
