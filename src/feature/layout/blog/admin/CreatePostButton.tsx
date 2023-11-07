"use client";
import { Button } from "@/components/ui/button";
import React, { useTransition } from "react";
import { createNewPost } from "./utils.server";
import { Toastify } from "../../toastify/Toastify";
import { faSquarePlus } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useRouter } from "next/navigation";
import { Loader } from "@/components/ui/loader";

export const CreatePost = () => {
  const [isPending, startTransition] = useTransition();

  const router = useRouter();

  const handleClick = async () => {
    const res = await createNewPost();
    startTransition(() => {
      if (res && res.id) {
        router.refresh();
        router.push(`/admin/blog/edit/${res.id}/article`);
      } else {
        Toastify({
          value: "Une erreur est survenue",
          type: "error",
        });
      }
    });
  };
  return (
    <>
      <Button
        variant="ghost"
        disabled={isPending}
        className="flex flex-col shadow gap-y-2 h-auto py-2"
        onClick={handleClick}>
        {isPending ? <Loader className="mr-2 h-4 w-4" /> :
          <FontAwesomeIcon icon={faSquarePlus} className="mx-4" />
        }
        Créer un nouveau billet de blog
      </Button>
    </>
  );
};
