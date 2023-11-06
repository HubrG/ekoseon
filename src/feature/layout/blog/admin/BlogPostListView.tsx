"use client";
import Image from "next/image";
import React from "react";

import { BlogPost } from "@prisma/client";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFileEdit, faTrash } from "@fortawesome/pro-solid-svg-icons";
import { deletePost, publishPost } from "./utils.server";
import { Toastify } from "../../toastify/Toastify";
import { useRouter } from "next/navigation";
import { Switch } from "@/components/ui/switch";

interface BlogPostListProps {
  blogPosts: BlogPost[];
}
interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
  } | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {
  const router = useRouter();
  const handleTrashBlogPost = async (id: string) => {
    // console.log("id", id);
    // return
    const trashPost = await deletePost(id);
    if (!trashPost) {
      Toastify({ value: "Une erreur est survenue", type: "error" });
    }
    router.refresh();
    Toastify({ value: "Article supprimé", type: "success" });
    // On refresh
  };

  const handlePublishChange = async (postId: string, newValue: boolean) => {
    publishPost(postId, newValue);
    router.refresh();
  };

  return (
    <Table>
      <TableCaption>Liste des articles</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead></TableHead>
          <TableHead className="w-[100px]"></TableHead>
          <TableHead>Titre</TableHead>
          <TableHead>Statut</TableHead>
          <TableHead className="text-right">Catégorie</TableHead>
          <TableHead className="text-right">Créé le</TableHead>
          <TableHead className="text-right">Publié le</TableHead>
          <TableHead className="text-right">Modifié le</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {blogPosts
          .slice()
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((post: CustomBlogPost) => (
            <TableRow key={post.id}>
              <TableCell className="text-right">
                <Link
                prefetch={false}
                  href={`/admin/blog/edit/${post.id}/${
                    post.title ? post.title : "article"
                  }`}>
                  <FontAwesomeIcon
                    className="hover:text-app-500 hover:cursor-pointer"
                    icon={faFileEdit}
                  />
                </Link>
              </TableCell>
              <TableCell className="text-right">
                {post.image && (
                  <div className="relative w-12 h-12 mx-auto rounded-full overflow-hidden">
                    <Image
                      src={post.image}
                      alt={post.title ? post.title : ""}
                      layout="fill"
                      objectFit="cover"
                    />
                  </div>
                )}
              </TableCell>
              <TableCell className="font-medium">
                <span className={!post.title ? "italic opacity-50" : ""}>{post.title ? post.title : `Sans titre`}</span>
              </TableCell>
              <TableCell>
               
                  <Switch
                    className="my-0 py-0"
                    checked={post.published}
                    onCheckedChange={(newValue) =>
                      handlePublishChange(post.id, newValue)
                    }
                  />
               
              </TableCell>
              <TableCell>{post.category?.name}</TableCell>
              <TableCell className="text-right  text-xs">
                {post.createdAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-right  text-xs">
                {post.publishedAt ? post.publishedAt.toLocaleString() : ""}
              </TableCell>
              <TableCell className="text-right text-xs">
                {post.updatedAt.toLocaleString()}
              </TableCell>
              <TableCell className="text-right">
                <FontAwesomeIcon
                  className="hover:text-red-500 hover:cursor-pointer"
                  onClick={() => {
                    handleTrashBlogPost(post.id);
                  }}
                  icon={faTrash}
                />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default BlogPostListView;
