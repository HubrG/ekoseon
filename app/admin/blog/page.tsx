import React from "react";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { CreatePost } from "../../../src/feature/layout/blog/admin/CreatePostButton";
import { CreatePostIA } from "@/src/feature/layout/blog/admin/CreatePostIAButton";
import BlogPostList from "@/src/feature/layout/blog/admin/BlogPostList";
import { Separator } from "@/components/ui/separator";

export default async function Blog() {
  const session = await getAuthSession();
  if (!session) {
    redirect("/connexion");
  }
  if (session.user.role !== "ADMIN") {
    redirect("/");
  }

  return (
    <>
      <PageTransition>
        <div className="content">
          <h1>Gestion des billets de blog</h1>
          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-3">
            <CreatePost />

            {session.user.id ? <CreatePostIA userId={session.user.id} /> : null}
          </div>
          <Separator className="my-6" />
          <div>{session.user.id ? <BlogPostList /> : null}</div>
        </div>
      </PageTransition>
    </>
  );
}
