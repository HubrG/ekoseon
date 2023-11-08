import {
  getBlogCategories,
  getTagsForPublishedPosts,
} from "@/src/query/blog.query";
import React from "react";
import Link from "next/link";
import { faFolderBookmark, faTag } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ScrollArea } from "@/components/ui/scroll-area";

export default async function SideBar() {
  const categories = await getBlogCategories();
  const tags = await getTagsForPublishedPosts();
  return (
    <div className="flex flex-col h-[85vh] md:pl-4">
      <div className=" max-h-[28vh]">
        <h3 className="mb-2">
          <FontAwesomeIcon icon={faFolderBookmark} className="mr-2" />{" "}
          Categories
        </h3>
        <ul>
          <ScrollArea className="h-full w-full p-3  border-app-200 bg-app-50 rounded-md border">
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
          </ScrollArea>
        </ul>
      </div>
      <div className="max-h-[51vh]">
        <h3 className="mb-2 mt-10">
          <FontAwesomeIcon icon={faTag} className="mr-2" /> Mots-clés
        </h3>
        <ul className="flex flex-col h-full gap-y-2 text-base">
          <ScrollArea className="h-full p-3 w-full border-app-200 bg-app-50 rounded-md border">
            {tags && tags.length > 0 ? (
              tags.map((tag) => (
                <li key={tag.id}>
                  <Link href={`/blog/tag/${tag.slug}`} className="font-normal italic" style={{"fontWeight" : "light"}}><span className="font-normal">{tag.name}</span></Link>
                </li>
              ))
            ) : (
              <li>Aucun tag</li>
            )}
          </ScrollArea>
        </ul>
      </div>
    </div>
  );
}
