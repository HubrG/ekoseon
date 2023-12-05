"use client";
import Hero from "@/src/feature/layout/home/Hero";
import { useNavbarObserver } from "@/src/feature/layout/home/useNavbarObserver";

export default function Home() {
  useNavbarObserver();

  return (
    <>
      {/* !FIXME: M'INSPIRER DE ULYSSES */}
      <div>
        <Hero />
      </div>
      <div className="z-50">
        <section
          id="appFirstPage"
          className="story-section shadow-t-3xl first-section ">
          <div className="content">
            <h2>
              {/*  */}
              Immortalisez Votre Histoire : Vos Souvenirs dans un Podcast ou un
              Livre
            </h2>
            <p>
              Ekoseon transforme votre histoire personnelle en expériences
              captivantes grâce à nos services de création de podcasts et
              d’écriture de livres biographiques. Imprégnez ces formats de votre
              essence pour offrir à vos proches un morceau de votre vie, enrichi
              par une touche personnelle inoubliable.
            </p>
            <ul>
              <li>
                <strong>Authenticité de la Voix :</strong> Vos passions, vos
                rires et vos réflexions prennent vie dans l&apos;authenticité de
                l&apos;audio.
              </li>
              <li>
                <strong>Connexion Émotionnelle :</strong> Provoquez une
                résonance émotionnelle chez vos auditeurs, qui se sentiront
                comme à vos côtés.
              </li>
              <li>
                <strong>Accessibilité :</strong> Partagez votre récit avec
                facilité, que ce soit à l&apos;écoute d&apos;un podcast ou à la
                lecture d’un passage d&apos;un livre.
              </li>
              <li>
                <strong>Conservation Durable :</strong> Chaque mot, chaque pause
                en podcast, et chaque page écrite, deviennent des conservateurs
                de votre histoire.
              </li>
              <li>
                <strong>Expérience Personnalisée :</strong> Nous adaptons le
                récit en fonction de vos préférences, pour que chaque souvenir
                reflète fidèlement votre individualité.
              </li>
              <li>
                <strong>Transmission des Valeurs :</strong> Partagez vos
                expériences de vie et votre sagesse, fixées dans l&apos;oralité
                ou dans les mots.
              </li>
              <li>
                <strong>Votre Plateforme :</strong> Ekoseon est là pour célébrer
                et pérenniser vos aventures, afin qu&apos;elles résonnent avec
                profondeur et authenticité.
              </li>
            </ul>
          </div>
        </section>
        <section className="podcast-section -mt-10 section-gradient-opposite pb-14">
          <div className="content">
            <h2>Podcast Biographique : Votre Vie en Sonorités Envoûtantes</h2>
            <p>
              Opter pour un podcast biographique, c&apos;est choisir de vibrer
              au rythme de votre propre voix, de partager l&apos;intimité de vos
              souvenirs en tonalités. Chez Ekoseon, nous capturons la
              quintessence de vos expériences dans un format audio riche, créant
              ainsi un véritable feuilleton de votre vie. Vos anecdotes, vos
              rires, et les inflexions de votre voix s&apos;entremêlent pour
              donner naissance à un tableau sonore qui transcende le temps et
              touche les cœurs de façon unique.
            </p>
            <p>
              Nous mettons en scène vos récits avec une authenticité inégalable,
              orchestrant chaque détail sonore pour souligner l&apos;atmosphère
              de vos souvenirs. Que vos descendants découvrent vos exploits ou
              que vos amis se remémorent les moments partagés, chaque épisode
              podcasté est une fenêtre ouverte sur votre univers, accessible
              d&apos;un simple clic.
            </p>
            {/* Insérer ici des extraits audio et témoignages des podcasts réalisés, présentés avec une interface interactive */}
          </div>
        </section>
        <section
          id="yourStory"
          className="story-section section-gradient -mt-10 ">
          <div className="content">
            {/* Section optionnelle pour la biographie écrite */}
            <div className="written-biography-option">
              <h2>Laisser une trace écrite: Un héritage indélébile</h2>
              <p>
                Si vous optez pour une biographie écrite, Ekoseon vous
                accompagne dans la création d&apos;un livre-mémoire qui
                traversera les âges, tout comme les mythes et légendes ont
                survécu grâce à leur transcription.
              </p>
              {/* Insérer ici des images et devises des livres créés avec un effet parallaxe */}
            </div>
          </div>
        </section>

        {/* Section coffret numérique : requête cible pourrait être "archivage numérique personnalisé". Mettre en avant sécurité et accessibilité.*/}
        {/*
     Utiliser ici des animations subtiles pour simuler le processus d&apos;accès au coffret (ouverture virtuelle),
     afin de rendre tangible ce concept abstrait.
   */}
        <section id="digital-box" className="digital-box-section  -mt-10 section-gradient-opposite pb-14">
          <div className="content">
            <h2>
              Votre coffret numérique : Souvenirs préservés, accès facilité
            </h2>
            <p>
              Toutes vos créations - podcasts & livres - soigneusement
              conservées dans votre espace privé sécurisé.
            </p>

            {/* Ajouter image symbolique d&apos;un coffre-fort numérique ou capsule temporelle depuis placeholder.com*/}
          </div>
        </section>

        {/* Commentaire UI/UX: Cette section devrait avoir une atmosphère chaleureuse et inspirante, avec des images de personnes offrant des cadeaux ou partageant des souvenirs. */}
        <section className="perfect-gift-section  -mt-10 section-gradient pb-14">
          <div className="content">
            <h2>Un cadeau parfait, pour soi ou pour un proche</h2>
            <p>
              Marquez les esprits avec un présent personnalisé : immortalisez
              les histoires qui vous tiennent à cœur dans un podcast unique et
              une biographie illustrée.
            </p>

            {/* Suggestion d&apos;animation UI avec framer motion : Appliquer un effet doux sur le survol des images de cadeaux, comme une légère augmentation en taille pour souligner leur importance. */}

            {/* Image symbolique d&apos;un échange de cadeau ou quelqu&apos;un lisant son livre biographique, souriant - image disponible sur placeholder.com */}
          </div>
        </section>

        {/* Commentaire UI/UX: Mettre l&apos;accent sur l&apos;importance historique et personnelle de laisser des mémoires pour susciter une prise de conscience chez le visiteur. */}
        <section className="memories-section  -mt-10 section-gradient-opposite pb-14">
          <div className="content">
            <h2>Pourquoi consigner ses mémoires ?</h2>
            <p>
              La transmission de nos récits est un pont entre les générations,
              un moyen d&apos;apprendre, de partager et de se souvenir.
            </p>
            {/*
        Suggestion UX/UI: Illustrer cette section avec des photos d&apos;albums familiaux anciens ou d&apos;événements marquants,
        en utilisant une galerie photo interactive qui se dévoile au survol.
       */}

            {/* Image représentative du concept de mémoire et transmission (par exemple, un arbre généalogique stylisé ou des mains tenant une photographie ancienne) depuis placeholder.com */}
          </div>
        </section>

        {/* Commentaire UI/UX: Utiliser des visuels et témoignages de personnes jeunes et âgées pour montrer que le partage de mémoires concerne tout le monde. */}
        {/* Commentaire UI/UX: Cette section doit évoquer la modernité et l&apos;universalité des histoires personnelles. Opter pour un design dynamique et inclusif. */}
        <section className="timeless-memories-section  -mt-10 section-gradient pb-14">
          <div className="content">
            <h2>
              Pourquoi partager ses mémoires n&apos;est pas une question
              d&apos;âge ?
            </h2>
            <p>
              Que vous soyez dans la fleur de l&apos;âge ou que vous ayez
              accumulé une sagesse plus mûre, chaque histoire a sa valeur. Des
              premières expériences aux moments marquants, vos récits
              enrichissent le tissu de notre mémoire collective.
            </p>
            {/* Suggestion UX/UI : Présenter des histoires visuelles sous forme de chronologie interactive montrant comment les expériences se construisent à travers différents âges de la vie. */}
            <p>
              Ces partages sont aussi une façon de se libérer, d&apos;offrir ses
              leçons apprises à autrui et même parfois d&apos;alléger son cœur
              en immortalisant des souvenirs qui nous tiennent à cœur.
            </p>
            {/* Image représentative de personnes variées racontant leur histoire - jeunes adultes, professionnels en plein essor - image disponible sur placeholder.com */}
          </div>
        </section>
      </div>
    </>
  );
}
