"use server";
import { prisma } from "@/lib/prisma";
import { getUserLog } from "@/src/query/user.query";

export const createNewPost = async () => {
  // On créé un nouvel article
  const user = await getUserLog();
  if (user) {
    const newPost = await prisma.blogPost.create({
      data: {
        title: "",
        content: "",
        published: false,
        authorId: user.id,
      },
    });
    return newPost;
  }
  return false;
};

export const getPost = async (id: string) => {
  // On récupère l'article
  const user = await getUserLog();
  if (user) {
    const post = await prisma.blogPost.findUnique({
      where: {
        id: id,
      },
    });
    return post;
  }
  return false;
};

export const saveEditPost = async ({
  id,
  title,
  content,
  image,
  canonicalSlug,
  excerpt,
  published,
  categoryId
}: {
  id: string;
  title: string;
  content: string;
  image: string;
  canonicalSlug: string;
  excerpt: string;
    published: boolean;
    categoryId: string;
  
}) => {
  // On sauvegarde l'article
  const user = await getUserLog();
  if (user) {
    const post = await prisma.blogPost.update({
      where: {
        id: id,
      },
      data: {
        title: title,
        content: content,
        image: image,
        canonicalSlug: canonicalSlug,
        excerpt: excerpt,
        published: published,
        publishedAt: published ? new Date() : null,
        categoryId: categoryId,
      },
    });
    return post;
  }
  return false;
};

export const getBlogCategories = async () => {
  // On récupère les catégories
  const user = await getUserLog();
  if (user) {
    const categories = await prisma.blogCategory.findMany();
    return categories;
  }
  return false;
}

export const getBlogTags = async () => {
  // On récupère les tags
  const user = await getUserLog();
  if (user) {
    const tags = await prisma.blogTag.findMany();
    return tags;
  }
  return false;
}

export const getBlogTagOnPost = async (id: string) => {
  // On récupère les tags
  const user = await getUserLog();
  if (user) {
    const tags = await prisma.blogTagOnPost.findMany({
      where: {
        postId: id
      }
    });
    return tags;
  }
  return false;
}
export const saveTagsForPost = async (id: string, tagNames: string[]) => {
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }

  // 1. Recherchez les tags existants
  const existingTags = await prisma.blogTag.findMany({
    where: {
      name: {
        in: tagNames,
      },
    },
  });

  // 2. Créez les nouveaux tags
  const existingTagNames = existingTags.map(tag => tag.name);
  const newTagNames = tagNames.filter(tagName => !existingTagNames.includes(tagName));
  const newTags = newTagNames.map(tagName => ({ name: tagName }));
  await prisma.blogTag.createMany({
    data: newTags,
  });

  // 3. Obtenez les IDs des tags
  const allTags = await prisma.blogTag.findMany({
    where: {
      name: {
        in: tagNames,
      },
    },
  });

  // 4. Supprimez les anciennes associations
  await prisma.blogTagOnPost.deleteMany({
    where: {
      postId: id,
    },
  });

  // 5. Créez les nouvelles associations
  const tagPostAssociations = allTags.map(tag => ({
    tagId: tag.id,
    postId: id,
  }));
  await prisma.blogTagOnPost.createMany({
    data: tagPostAssociations,
  });

  return true;
};

  
