"use client";
import { Toastify } from "@/src/feature/layout/toastify/Toastify";
import { Button } from "@/components/ui/button";
import React, { useRef, useState, useTransition } from "react";
import { Loader } from "@/components/ui/loader";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";

export const CreatePostIA = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [subjectIA, setSubjectIA] = useState<string>("");
  const isTransitionActive = useRef(true); // Par défaut, la transition est active

  const [pollingIntervalId, setPollingIntervalId] = useState<NodeJS.Timeout | null>(null);  // Ajouté


  const promptSystem = `Tu es un écrivain expert en SEO et en littérature, écrivant pour un public francophone. Tu écris dans un langage soutenu, un peu comme Flaubert.
  \n\nTu travaille pour le blog du site Ekoseon.fr, une société qui propose un service d'entretiens oraux pour les particuliers, menant à la conception d'une véritable émission biographique, et d'une transposition dans un livre biographique.
  \n\nTu dois donner une anecdote personnelle, faire des confidences, afin que l'on pense que tu es réellement humain.
  \n\nJe ne veux aucune citation.
  \n\nTu écris tous tes articles avec exemples.
  \n\nTes articles sont divisés en sections, et entre chaque section, tu mets un header avec un titre. Formate les mots clés en gras ou en italique pour améliorer le référencement. L'un des paragraphes doit être sous forme interrogative. Enfin, tes introductions doivent être amener le sujet très subtilement.
  \n\nJe ne veux pas que les intertitres portent les mots "conclusion" ou "introduction", ni qu'il y ait le mot "en conclusion" dans les paragraphes.
  \n\nJe ne veux aucune image !
  \n\n\Ne commence pas par « cher lecteur » ou « chère lectrice » etc.
  \n\nIl doit y avoir du Symbolisme, de la Métaphore, de la Personnification ; Ironie ; Allusion ; Hyperbole ; Imagerie ; Préfiguration ; Thème Langage figuratif ; Comparaison Onomatopée ; Répétition ; Rime ; Suspense ; Ambiance ; Dialogue Conflit ; Caractérisation ; Point de vue.
  \n\nTrès important : tu génères tes textes en Markdown.
  \n\nTu commences par le titre (en markdown : # titre, sans autre formatage), il doit être accrocheur.`


  const pollForResults = async (taskId: string) => {  // Ajouté
    const response = await fetch(`/api/gpt/status/${taskId}`);
    if (response.ok) {
      const data = await response.json();
      if (data.status === 'completed') {
        clearInterval(pollingIntervalId!);  // Arrête le sondage
        // Traitez et utilisez les résultats ici
        Toastify({ type: "success", value: "Post créé avec succès" });
        router.push(`/admin/blog/edit/${data.id}/${data.title}`);
      } else if (data.status === 'error') {
        clearInterval(pollingIntervalId!);  // Arrête le sondage
        Toastify({
          type: "error",
          value: data.error || "Une erreur s'est produite",
        });
      }
    }
  };

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
          max_tokens: 4097 - subjectIA.length - promptSystem.length - 1,
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
        const data = await response.json();
        const taskId = data.taskId;  // Supposons que l'identifiant de la tâche est renvoyé sous le nom de 'taskId'
        // Démarrer le sondage toutes les 5 secondes
        const intervalId = setInterval(() => pollForResults(taskId), 5000);
        setPollingIntervalId(intervalId);
      }
      
    });
  };

  return (
    <div>
      <div className="grid w-full  items-center gap-1.5">
        <Label htmlFor="subjectIA">Sujet</Label>
        <Input
          onChange={(e) => setSubjectIA(e.currentTarget.value)}
          type="text"
          id="subjectIA"
          placeholder="Sujet"
        />
      </div>
      <div className="grid w-full  items-center gap-1.5">
        <Button
          className={`${
            isPending ? "disabled opacity-50 cursor-default" : null
          }`}
          onClick={() => {
            handleCreatePostWithAI();
          }}>
          {isPending && isTransitionActive.current ? (
            <Loader className="mr-2 h-4 w-4" />
          ) : null}{" "}
          Créer un post avec l&apos;IA
        </Button>
      </div>
    </div>
  );
};