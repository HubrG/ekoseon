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

interface BlogPostListProps {
  blogPosts: BlogPost[];
}
interface CustomBlogPost extends BlogPost {
  category?: {
    name: string;
  } | null;
}
const BlogPostListView: React.FC<BlogPostListProps> = ({ blogPosts }) => {
  return (
    <div>
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
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
            )
            .map((post: CustomBlogPost) => (
              <TableRow key={post.id}>
                <TableCell className="text-right">
                  <Link
                    href={`/admin/blog/edit/${post.id}/${
                      post.title ? post.title : "article"
                    }`}>
                    Modifier
                  </Link>
                </TableCell>
                <TableCell className="text-right">
                  <Image
                    width="36"
                    height="36"
                    src={post.image ? post.image : ""}
                    alt={post.title ? post.title : ""}
                  />
                </TableCell>
                <TableCell className="font-medium">
                  {post.title ? post.title : ""}
                </TableCell>
                <TableCell>
                  {post.published ? "Published" : "Unpublished"}
                </TableCell>
                <TableCell>{post.category?.name}</TableCell>
                <TableCell className="text-right">
                  {post.createdAt.toLocaleString()}
                </TableCell>
                <TableCell className="text-right">
                  {post.publishedAt ? post.publishedAt.toLocaleString() : "N/A"}
                </TableCell>
                <TableCell className="text-right">
                  {post.updatedAt.toLocaleString()}
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BlogPostListView;
