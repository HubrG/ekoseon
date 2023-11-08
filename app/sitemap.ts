import {
  getCategoriesForPublishedPosts,
  getTagsForPublishedPosts,
  getBlogPosts,
  getBlogTags,
} from "@/src/query/blog.query";

export default async function sitemap() {
 
  const sitemap = [
    {
      url: "http://ekoseon.fr/raconter-ses-memoires/tarifs",
    },
    {
      url: "http://ekoseon.fr/raconter-ses-memoires/fonctionnement",
    },
    {
      url: "http://ekoseon.fr/raconter-ses-memoires/contact",
    },
    {
      url: "http://ekoseon.fr/blog",
    },
    {
      url: "http://ekoseon.fr/foire-aux-questions",
    },
    {
      url: "http://ekoseon.fr/mentions-legales",
    },
    {
      url: "http://ekoseon.fr/politique-de-confidentialite",
    },
    {
      url: "http://ekoseon.fr/conditions-generales-de-vente",
    },
  ];
    

  


  const baseUrl = process.env.NEXT_PUBLIC_RELATIVE_URI;

  const posts = await getBlogPosts({ publishedOnly: true });
  
  const postsUrls =
    posts?.map((post) => {
      return {
        url: `${baseUrl}/blog/lecture/${post.canonicalSlug}/${post.id}`,
        lastModified: post.createdAt,
      };
    }) ?? [];

  const categories = await getCategoriesForPublishedPosts();
  const categoriesUrls =
    categories?.map((category) => {
      return {
        url: `${baseUrl}/blog/categorie/${category.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  const tags = await getTagsForPublishedPosts();
  const tagsUrls =
    tags?.map((tag) => {
      return {
        url: `${baseUrl}/blog/tag/${tag.slug}`,
        lastModified: new Date(),
      };
    }) ?? [];

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
    },
    ...postsUrls,
    ...categoriesUrls,
    ...tagsUrls,
    ...sitemap,
  ];
}