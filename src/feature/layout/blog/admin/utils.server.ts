"use server";
import { prisma } from "@/lib/prisma";
import { getUserLog } from "@/src/query/user.query";
import slugify from "slugify";

export const createNewPost = async () => {
  // On créé un nouvel article
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
  const newPost = await prisma.blogPost.create({
    data: {
      title: "",
      content: "",
      published: false,
      authorId: user.id,
    },
  });
  return newPost;
};

export const getPost = async (id: string) => {
  // On récupère l'article
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
    const post = await prisma.blogPost.findUnique({
      where: {
        id: id,
      },
    });
    return post;
};

export const saveEditPost = async ({
  id,
  title,
  content,
  image,
  canonicalSlug,
  excerpt,
  published,
  category,
}: {
  id: string;
  title: string;
  content: string;
  image: string;
  canonicalSlug: string;
  excerpt: string;
  published: boolean;
  category: string | null;
}) => {
  // On sauvegarde l'article
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
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
      categoryId: category ? category : null,
    },
  });
  return post;
};

export const getBlogCategories = async () => {
  // On récupère les catégories
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
  const categories = await prisma.blogCategory.findMany();
  return categories;
};

export const getBlogTags = async () => {
  // On récupère les tags
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
  const tags = await prisma.blogTag.findMany();
  return tags;
};

export const getBlogTagOnPost = async (id: string) => {
  // On récupère les tags
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
    const tags = await prisma.blogTagOnPost.findMany({
      where: {
        postId: id,
      },
    });
    return tags;
};

export const saveTagsForPost = async (id: string, tagNames: string[]) => {
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }

  // Démarrez une transaction Prisma
  return await prisma.$transaction(async (prisma) => {
    // 1. Recherchez les tags existants
    const existingTags = await prisma.blogTag.findMany({
      where: {
        name: {
          in: tagNames,
        },
      },
    });

    // 2. Créez les nouveaux tags
    const existingTagNames = existingTags.map((tag) => tag.name);
    const newTagNames = tagNames.filter(
      (tagName) => !existingTagNames.includes(tagName)
    );

    for (const tagName of newTagNames) {
      let slug = slugify(tagName, {
        lower: true,
        strict: true,
        remove: /[*+~.()'"!:@]/g,
      });
      let uniqueSlug = slug;
      let counter = 0;

      // Assurez-vous que le slug est unique
      while (await prisma.blogTag.findUnique({ where: { slug: uniqueSlug } })) {
        uniqueSlug = `${slug}-${++counter}`;
      }

      // Créez le tag avec un slug unique
      await prisma.blogTag.create({
        data: {
          name: tagName,
          slug: uniqueSlug,
        },
      });
    }

    // 3. Obtenez les IDs des tags à nouveau pour inclure les nouveaux tags
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
    const tagPostAssociations = allTags.map((tag) => ({
      tagId: tag.id,
      postId: id,
    }));
    await prisma.blogTagOnPost.createMany({
      data: tagPostAssociations,
      skipDuplicates: true, // Cette option saute les doublons si jamais ils existent
    });
    return true;
  });
};

// Suppression d'un post
export const deletePost = async (id: string) => {
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
    // Exécutez les deux opérations dans une transaction
    await prisma.$transaction(async (prisma) => {
      // Supprimez d'abord les BlogTagOnPost liés
      await prisma.blogTagOnPost.deleteMany({
        where: {
          postId: id,
        },
      });
      // Ensuite, supprimez le post lui-même
      await prisma.blogPost.delete({
        where: {
          id: id,
        },
      });
    });
    return true;
};

// Modificatio ndu status de publication d'un post (published)
export const publishPost = async (id: string, isPublished: boolean) => {
  const user = await getUserLog();
  if (!user) {
    throw new Error("User not logged in");
  }
  if (user.role !== "ADMIN") {
    throw new Error("User not admin");
  }
    const post = await prisma.blogPost.update({
      where: {
        id: id,
      },
      data: {
        published: isPublished,
        publishedAt: new Date(),
      },
    });
    return post;
};
