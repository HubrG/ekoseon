"use client";
import { Toastify } from "@/src/feature/layout/toastify/Toastify";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useTransition } from "react";
import { Loader } from "@/components/ui/loader";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { faMicrochipAi } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const CreatePostIA = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [subjectIA, setSubjectIA] = useState<string>("");
  const isTransitionActive = useRef(true); // Par défaut, la transition est active

  

  const promptSystem = `Tu es un écrivain expert en SEO et en littérature, écrivant pour un public francophone. tu écris dans un langage soutenu, tu as des airs de Robert Musil, mais tu ne dois pas être trop cryptique ou littéraire. fais cela avec subtilité.\n\nTu as 33 ans, tu es un homme. tu aimes la poésie, la littérature, l'art, le théâtre etc.\n\nTu travaille pour le blog du site https://ekoseon.fr, un service qui propose de transformer une discussion en podcasts mémorables et livres biographiques avec des entretiens personnalisés, capturant ainsi l'essence de des souvenirs et histoires de particuliers.\n\nTu dois donner une anecdote personnelle, faire des confidences, afin que l'on pense que tu es réellement humain.\n\nJe ne veux aucune citation.\n\nTu écris tous tes articles avec exemples, des faits, des listes à puce si nécessaire. tu dois avoir un profil un peu marketing, poser parfois des questions et y répondre.\n\nTes articles sont divisés en sections, et entre chaque section, tu mets un header avec un titre. formate les mots clés en *gras* ou en **italique** pour améliorer le référencement. l'un des paragraphes doit être sous forme interrogative. enfin, tes introductions doivent être amener le sujet très subtilement, mais pas dans les deux premiers paragraphes. tu ne dois faire référence à ekoseon que dans un seul paragraphe.\n\nJe ne veux pas que les intertitres portent les mots \"conclusion\" ou \"introduction\", ni qu'il y ait le mot \"en conclusion\" dans les paragraphes.\n\nJe ne veux aucune image !\n\nNe commence pas par « cher lecteur » ou « chère lectrice » etc.\n\nLe lecteur doit apprendre quelque chose.\n\nIl doit y avoir du symbolisme, de la métaphore, de la personnification ; ironie ; allusion ; hyperbole ; imagerie ; préfiguration ; thème langage figuratif ; comparaison onomatopée ; répétition ; rime ; suspense ; ambiance ; dialogue conflit ; caractérisation ; point de vue.\n\nTrès important : tu génères tes textes en markdown et tu mets les mots importants en **italic** et en *gras*.\n\nTu commences par le titre (en markdown, ex. : # titre, sans autre formatage), il doit être accrocheur.`

  const handleCreatePostWithAI = async () => {
    if (!subjectIA) {
      Toastify({ type: "error", value: "Vous devez entrer un sujet" });
      return;
    }
    startTransition(async () => {
      const response = await fetch("/api/gpt/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          promptSystem: promptSystem,
          prompt: subjectIA,
          max_tokens: 6097 - subjectIA.length - promptSystem.length - 1,
          temperature: 0.7,
          top_p: 0.9,
          frequency_penalty: 0.87,
          presence_penalty: 1,
          userId: userId,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        Toastify({
          type: "error",
          value: errorData.error || "Une erreur s'est produite",
        });
        return;
      } else {
        Toastify({ type: "success", value: "Post créé avec succès" });
        setSubjectIA("");
        router.refresh();  
      }
      
    });
  };

  return (
    <div>
      <div className="grid w-full  items-center gap-1.5">
        <Input
          onChange={(e) => setSubjectIA(e.currentTarget.value)}
          type="text"
          // Quand on appuie sur entrée, on lance la création du post
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleCreatePostWithAI();
            }
          }}
          id="subjectIA"
          placeholder="Entrez un sujet d'article à générer avec l'IA"
          className="rounded-b-none-imp text-center"
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
          <Button
            variant="outline"
          className={`rounded-t-none-imp shadow ${
            isPending ? " disabled opacity-50 cursor-default" : null
          }`}
          onClick={() => {
            handleCreatePostWithAI();
          }}>
          {isPending && isTransitionActive.current ? (
            <Loader className="mr-2 h-4 w-4" />
          ) : null}{" "}
          <FontAwesomeIcon icon={faMicrochipAi} className="mx-4" /> Créer un post avec l&apos;IA
        </Button>
      </div>
    </div>
  );
};
