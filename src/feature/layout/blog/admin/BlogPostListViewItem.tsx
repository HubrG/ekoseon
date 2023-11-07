"use client";
import Image from "next/image";
import React, { useTransition, useState } from "react";
import { BlogPost, BlogCategory } from "@prisma/client";
import { TableCell, TableRow } from "@/components/ui/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faFileEdit,
  faMicrochipAi,
  faTrash,
} from "@fortawesome/pro-solid-svg-icons";
import { deletePost, publishPost } from "./utils.server";
import { Toastify } from "../../toastify/Toastify";
import { Switch } from "@/components/ui/switch";
import { Loader } from "@/components/ui/loader";
import { Tooltip } from "react-tooltip";

interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
  } | null;
}

// Maintenant, vous définissez les props pour votre composant qui devraient inclure un seul post
interface BlogPostProps {
  post: CustomBlogPost;
}

const BlogPostListViewItem: React.FC<BlogPostProps> = ({ post }) => {
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  const [isTrashing, setIsTrashing] = useState<string | null>(null);
  const [isPending, startTransition] = useTransition();
  const [isPublished, setIsPublished] = useState<boolean>(
    post.published ? true : false
  );
  const [isTrashed, setIsTrashed] = useState<boolean>(false);

  const handleTrashBlogPost = async (id: string) => {
    setIsTrashing(id); // Active le loader immédiatement

    try {
      const trashPost = await deletePost(id);
      if (!trashPost) {
        Toastify({
          value: "Une erreur est survenue lors de la suppression",
          type: "error",
        });
      } else {
        Toastify({ value: "Article supprimé", type: "success" });
        setIsTrashed(true);
      }
    } catch (error) {
      // Gère toute exception qui pourrait survenir lors de l'appel de suppression
      Toastify({
        value: "Échec de la suppression de l'article",
        type: "error",
      });
    } finally {
      setIsTrashing(null); // Désactive le loader que la suppression ait réussi ou échoué
    }
  };

  const handlePublishChange = async (postId: string, newValue: boolean) => {
    setIsUpdating(postId);

    startTransition(async () => {
      try {
        const response = await publishPost(postId, newValue);
        if (response) {
          // Supposons que `response` indique le succès de l'opération
          Toastify({
            value: `Article ${newValue ? "publié" : "dépublié"}`,
            type: "success",
          });
          // Mettre à jour l'état ici si nécessaire, par exemple rafraîchir la liste des posts ou l'état du post
        } else {
          // Gérer le cas où `response` indique un échec
          Toastify({
            value: "Une erreur est survenue lors de la modification",
            type: "error",
          });
        }
      } catch (error) {
        // Gérer les erreurs potentielles du réseau ou autres exceptions
        Toastify({
          value:
            "Une erreur est survenue lors de la communication avec le serveur",
          type: "error",
        });
      } finally {
        setIsUpdating(null); // Désactive le loader après le traitement
      }
    });
  };

  return (
    <TableRow className={`${isTrashed && "hidden"}`}>
      <TableCell className="text-right">
        <div data-tooltip-id="ttEdit" data-tooltip-content={"Modifier"}>
          <Link
            href={`/admin/blog/edit/${post.id}/${
              post.title ? post.title : "article"
            }`}>
            <FontAwesomeIcon
              className="hover:text-app-500 hover:cursor-pointer"
              icon={faFileEdit}
            />
          </Link>
          <Tooltip id="ttEdit" className="tooltip" />
        </div>
      </TableCell>
      <TableCell className="text-right">
        <div data-tooltip-id="ttEye" data-tooltip-content={"Voir un aperçu"}>
          <Link
            target="_blank"
            href={`/blog/lecture/${post.canonicalSlug}/${post.id}`}>
            <FontAwesomeIcon
              className="hover:text-app-500 hover:cursor-pointer"
              icon={faEye}
            />
          </Link>
          <Tooltip id="ttEye" className="tooltip" />
        </div>
      </TableCell>
      <TableCell className="text-right">
        {post.image && (
          <div className="relative w-12 h-12 mx-auto rounded-full overflow-hidden">
            <Image
              src={post.image}
              alt={post.title ? post.title : ""}
              fill
              sizes="(max-width: 100) 10vw, (max-width: 100) 10vw, 13vw"
              className="object-cover"
            />
          </div>
        )}
      </TableCell>
      <TableCell className="font-medium">
        <span className={!post.title ? "italic opacity-50" : ""}>
          {post.isIA && (
            <FontAwesomeIcon icon={faMicrochipAi} className="mr-2" />
          )}
          {post.title ? post.title : `Sans titre`}
        </span>
      </TableCell>
      <TableCell className="text-center">
        <Switch
          checked={isPublished}
          onCheckedChange={(newValue) => {
            handlePublishChange(post.id, newValue);
            setIsPublished(newValue);
          }}
          disabled={isPending && isUpdating === post.id} // Désactive le Switch si une mise à jour est en cours sur ce post
          onClick={(e) => {
            setIsUpdating(post.id);
          }}
          className={`${isPending && isUpdating === post.id ? "hidden" : ""}`}
        />
        {isPending && isUpdating === post.id && <Loader className="mx-auto" />}
      </TableCell>
      <TableCell>{post.category?.name}</TableCell>
      <TableCell className="text-center  text-xs">
        {post.createdAt.toLocaleString()}
      </TableCell>
      <TableCell className="text-center  text-xs">
        {post.publishedAt ? post.publishedAt.toLocaleString() : ""}
      </TableCell>
      <TableCell className="text-center text-xs">
        {post.updatedAt.toLocaleString()}
      </TableCell>
      <TableCell className="text-center">
        <div
          className={`${isTrashing === post.id && "hidden"}`}
          data-tooltip-id="ttTrash"
          data-tooltip-content={"Supprimer"}>
          <FontAwesomeIcon
            onClick={() => {
              handleTrashBlogPost(post.id);
              setIsTrashing(post.id);
            }}
            className={`${
              isTrashing === post.id && "hidden"
            } hover:text-red-500 hover:cursor-pointer`}
            icon={faTrash}
          />
          <Tooltip id="ttTrash" className="tooltip" />
        </div>
        {isTrashing === post.id && <Loader className="mx-auto" size={16} />}
      </TableCell>
    </TableRow>
  );
};

export default BlogPostListViewItem;
