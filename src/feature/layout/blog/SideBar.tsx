import { getBlogCategories } from "@/src/query/blog.query";
import React from "react";
import Link from 'next/link';
import { faFolderBookmark, faTag } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getBlogTags } from "./admin/utils.server";
import { getTagsForPublishedPosts } from "@/src/query/tag.query";

export default async function SideBar() {
  const categories = await getBlogCategories();
  const tags = await getTagsForPublishedPosts();
  return (
    <div className=" h-full md:pl-4">
      <h3 className="mb-2"><FontAwesomeIcon icon={faFolderBookmark} className="mr-2" /> Categories</h3>
      <ul>
      {categories && categories.length > 0 ? (
          categories.map((category) => (
            <li key={category.id}>
              <Link href={`/blog/categorie/${category.slug}`}>
                {category.name}
              </Link>
            </li>
          ))
        ) : (
          <li>Aucune catégorie</li>
        )}
      </ul>
      <h3 className="mb-2 mt-10"><FontAwesomeIcon icon={faTag} className="mr-2" /> Mots-clés</h3>
      <ul>
      {tags && tags.length > 0 ? (
          tags.map((tag) => (
            <li key={tag.id}>
              <Link href={`/blog/tag/${tag.slug}`}>
                {tag.name}
              </Link>
            </li>
          ))
        ) : (
          <li>Aucun tag</li>
        )}
      </ul>
    </div>
  );
}
