import React from "react";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { redirect } from "next/navigation";
import { getAuthSession } from "@/lib/auth";
import { CreatePost } from "../../../src/feature/layout/blog/admin/CreatePost";
import { CreatePostIA } from "@/src/feature/layout/blog/admin/CreatePostIAButton";
import BlogPostList from "@/src/feature/layout/blog/admin/BlogPostList";

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
          <div>
            <CreatePost />
          </div>
          <div>
            {session.user.id ? <CreatePostIA userId={session.user.id} /> : null}
          </div>
          <div>{session.user.id ? <BlogPostList /> : null}</div>
        </div>
      </PageTransition>
    </>
  );
}
