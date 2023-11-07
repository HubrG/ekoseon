"use client";
import { Button } from "@/components/ui/button";
import React, { useState, useTransition } from "react";
import { createNewPost } from "./utils.server";
import { Toastify } from "../../toastify/Toastify";
import { faSquarePlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

export const CreatePost = () => {
  const [isPending, startTransition] = useTransition();
  const [isCreating, setIsCreating] = useState<boolean>(false);
  const router = useRouter();

  const handleClick = async () => {
    setIsCreating(true); // Supposons que vous avez un état pour gérer l'affichage du loader
  
    try {
      const res = await createNewPost();
      if (res && res.id) {
        // Vous pouvez omettre startTransition ici si vous voulez naviguer immédiatement
        router.push(`/admin/blog/edit/${res.id}/article`);
        router.refresh();
      } else {
        Toastify({
          value: "Impossible de créer un nouvel article",
          type: "error",
        });
      }
    } catch (error) {
      // En cas d'erreur dans la requête, notifier l'utilisateur
      Toastify({
        value: "Une erreur est survenue lors de la création de l'article",
        type: "error",
      });
      setIsCreating(false);
    } finally {
       // Désactiver le loader après la création ou en cas d'erreur
    }
  };
  
  return (
    <>
      <Button
        variant="ghost"
        disabled={isCreating}
        className="flex flex-col shadow gap-y-2 h-auto py-2"
        onClick={handleClick}>
        {isCreating ? <Loader className="mr-2 h-4 w-4" /> :
          <FontAwesomeIcon icon={faSquarePlus} className="mx-4" />
        }
        Créer un nouveau billet de blog
      </Button>
    </>
  );
};
