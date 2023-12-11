"use client";
import React, { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faCommentDots } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { v4 } from "uuid";
// NOTE : Je n'ai rien à raconter d'interessant

export default function FAQComponent() {
  const [activeTriggers, setActiveTriggers] = useState<Set<string>>(new Set());

  const handleTriggerClick = (id: string) => {
    setActiveTriggers((prevActiveTriggers) => {
      const newActiveTriggers = new Set(prevActiveTriggers);
      if (newActiveTriggers.has(id)) {
        newActiveTriggers.delete(id);
      } else {
        newActiveTriggers.add(id);
      }
      return newActiveTriggers;
    });
  };
  const faqSections = [
    {
      title: "Informations Générales",
      items: [
        {
          question: "Qu'est-ce qu'Ekoseon ?",
          answer:
            "Ekoseon transforme vos dialogues en podcasts et livres biographiques mémorables via des entretiens personnalisés.",
        },
        {
          question:
            "Comment fonctionne le processus de création d'un podcast biographique ?",
          answer:
            "Le processus inclut des entretiens personnalisés, l'édition audio et, si choisi, la transcription en livre biographique.",
        },
        {
          question:
            "Qu'est-ce qu'un entretien personnalisé chez Ekoseon et comment se déroule-t-il ?",
          answer:
            "Un entretien personnalisé est une interview adaptée à votre histoire, enregistrée pour créer votre podcast ou livre biographique.",
        },
        {
          question:
            "Quels équipements dois-je avoir pour enregistrer mon entretien avec Ekoseon ?",
          answer:
            "Un ordinateur avec une connexion internet stable et une webcam sont nécessaires pour l'entretien en visioconférence.",
        },
        {
          question:
            "Puis-je acheter un micro-cravate directement chez Ekoseon ?",
          answer:
            "Ekoseon propose des micro-cravates à la vente pour améliorer la qualité de l'entretien.",
        },
      ],
    },
    {
      title: "Le Processus d'Entretien",
      items: [
        {
          question: "Combien de temps dure un entretien type avec Ekoseon ?",
          answer:
            "La durée standard d'un entretien est de 1 heure, mais il est possible de le prolonger si nécessaire.",
        },
        {
          question: "Puis-je préparer mon entretien ?",
          answer:
            "Oui, Ekoseon fournit des conseils et une trame pour vous aider à vous préparer.",
        },
        {
          question: "Qui va réaliser mon entretien ?",
          answer:
            "Les intervieweurs sont soigneusement sélectionnés par Ekoseon pour leur expertise.",
        },
        {
          question: "Comment se déroule un entretien en visioconférence ?",
          answer:
            "L'entretien se déroule via une plateforme en ligne, telle que Zencastr, en plusieurs étapes structurées.",
        },
        {
          question:
            "Comment la qualité de l'audio est-elle assurée pour le podcast ?",
          answer:
            "Grâce à Zencastr, la qualité audio des podcasts est assurée en recréant l'expérience d'un studio d'enregistrement virtuel. Cela signifie que même si les participants sont dispersés aux quatre coins du globe, chacun peut se connecter depuis son ordinateur à Zencastr. La plateforme enregistre alors la conversation comme si tout le monde était réuni dans un studio professionnel, garantissant ainsi une qualité sonore claire et nette pour votre podcast.<br /><br />Par ailleurs, Zencastr jouit d'une très grande simplicité d'utilisation, plus simple encore que Zoom.",
        },
        {
          question:
            "Comment puis-je être sûr que mon histoire sera bien représentée ?",
          answer:
            "Ekoseon travaille étroitement avec vous pour capturer l'essence de vos récits de manière fidèle.",
        },
        {
          question:
            "Est-il possible de commander plusieurs exemplaires du livre biographique ?",
          answer:
            "Oui, des copies supplémentaires peuvent être commandées à un coût additionnel.",
        },
        {
          question:
            "Puis-je choisir la couverture ou le style de mon livre biographique ?",
          answer:
            "Des options de personnalisation sont disponibles pour la couverture et le style du livre.",
        },
        {
          question: "Les entretiens sont-ils confidentiels ?",
          answer:
            "Ekoseon garantit la confidentialité de vos entretiens et respecte la vie privée de ses clients.",
        },
        {
          question:
            "Puis-je intégrer des photos ou des documents dans mon livre biographique ?",
          answer:
            "Oui, il est possible d'ajouter des éléments visuels au livre, selon un processus défini.",
        },
        {
          question: "Y a-t-il des restrictions sur le contenu des entretiens ?",
          answer:
            "Ekoseon peut imposer des limites pour respecter la légalité et la sensibilité des sujets.",
        },
        {
          question: "Comment les entretiens sont-ils planifiés ?",
          answer:
            "Les dates et heures des entretiens sont fixées en concertation avec le client après la commande.",
        },
        {
          question:
            "Qu'advient-il si je dois annuler ou reprogrammer un entretien ?",
          answer:
            "Ekoseon offre une certaine flexibilité pour l'annulation ou la reprogrammation selon sa politique.",
        },
        {
          question:
            "Comment puis-je suivre la progression de mon projet de podcast ou de livre ?",
          answer:
            "Ekoseon fournit des mises à jour régulières sur la progression de votre projet.",
        },
        {
          question:
            "Le livre biographique est-il disponible en format numérique ?",
          answer:
            "Une version électronique de la biographie peut être fournie sur demande.",
        },
      ],
    },
    {
      title: "Commande, Paiement et Livraison",
      items: [
        {
          question:
            "Comment puis-je passer commande pour un podcast ou un livre biographique ?",
          answer:
            "Les commandes se font via la section « tarifs » du site, avec sélection de la durée d'entretien et paiement en ligne.",
        },
        {
          question: "Quelles sont les options de paiement disponibles ?",
          answer:
            "Le paiement peut se faire en ligne via Stripe, avec possibilité de paiement en plusieurs fois à partir de 300€.",
        },
        {
          question:
            "Combien de temps après mon dernier entretien recevrai-je mon podcast ou mon livre ?",
          answer:
            "Le podcast est livré sous une semaine et le livre biographique sous quatre semaines après le dernier enregistrement.",
        },
        {
          question: "Que se passe-t-il si je souhaite annuler ma commande ?",
          answer:
            "Les heures d'entretien déjà effectuées sont dues, avec une politique de rétractation spécifique pour les autres services.",
        },
      ],
    },
    {
      title: "Politique de Confidentialité et Sécurité",
      items: [
        {
          question: "Comment Ekoseon protège-t-elle mes données personnelles ?",
          answer:
            "Ekoseon respecte la confidentialité, ne conserve pas les numéros de carte bancaire, et utilise des mots de passe hachés.",
        },
      ],
    },
    {
      title: "Service Client et Modifications",
      items: [
        {
          question:
            "Puis-je faire une réclamation si je ne suis pas satisfait du service ?",
          answer:
            "Les réclamations peuvent être faites par mail ou par téléphone, avec un service client disponible du lundi au vendredi.",
        },
        {
          question:
            "Les CGV d'Ekoseon peuvent-elles changer et comment serai-je informé ?",
          answer:
            "Ekoseon se réserve le droit de modifier les CGV, qui ne seront pas rétroactives pour les commandes déjà passées.",
        },
      ],
    },
  ];

  return (
    <>
      {faqSections.map((section, sectionIndex) => (
        <section className="relative" key={"f" + sectionIndex}>
          <h2 className="py-5 sticky top-[4.63rem] bg-white z-10">
            {section.title}
          </h2>
          <Accordion type="multiple" className="w-full">
            {section.items.map((item, itemIndex) => {
              const triggerId = `section-${sectionIndex}-item-${itemIndex}`;
              return (
                <React.Fragment key={v4() + itemIndex}>
                  <AccordionItem
                    value={triggerId}
                    className="transition-all duration-200">
                    <AccordionTrigger
                      className={`w-full text-left text-lg flex items-center hover:bg-app-100 italic font-semibold  px-2 ${
                        activeTriggers.has(triggerId) ? "bg-app-100 " : ""
                      }`}
                      onClick={() => handleTriggerClick(triggerId)}>
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="transition-all duration-200">
                      <p className="py-2 pt-4 flex flex-row items-baseline pl-4 gap-x-2">
                        <FontAwesomeIcon
                          icon={faCommentDots}
                          flip="horizontal"
                        />
                        <span
                          dangerouslySetInnerHTML={{
                            __html: item.answer,
                          }}></span>
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </React.Fragment>
              );
            })}
          </Accordion>
        </section>
      ))}
    </>
  );
}
