"use client";
import React, { useRef, useState, useEffect, useTransition } from "react";
import Showdown from "showdown";
import { Input } from "@/components/ui/input";
import { BlogCategory, BlogPost, BlogTag, BlogTagOnPost } from "@prisma/client";
import { saveEditPost, saveTagsForPost } from "./utils.server";
import { Button } from "@/components/ui/button";
import { Toastify } from "../../toastify/Toastify";
import { faFloppyDisk } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Image from "next/image";
import validator from "validator";
import { faTrash } from "@fortawesome/pro-solid-svg-icons";
import { Label } from "@/components/ui/label";
import slugify from "slugify";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import CreatableSelect from "react-select/creatable";
import { Loader } from '@/components/ui/loader';

interface EditPostProps {
  post: BlogPost;
  categories: BlogCategory[];
  tagsOnPost: BlogTagOnPost[] | undefined;
  tags: BlogTag[] | undefined;
}

type OptionType = { value: string; label: string; __isNew__?: boolean };

Showdown.extension("tasklists", function () {
  return [
    {
      type: "output",
      regex: /<li>\[ \](.*?)(<\/li>)/g,
      replace:
        '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled> $1$2',
    },
    {
      type: "output",
      regex: /<li>\[x\](.*?)(<\/li>)/g,
      replace:
        '<li class="task-list-item"><input type="checkbox" class="task-list-item-checkbox" disabled checked> $1$2',
    },
  ];
});
const EditPost = ({ post, categories, tagsOnPost, tags }: EditPostProps) => {
  //
  const converter = new Showdown.Converter({
    extensions: ["tasklists"],
    tables: true,
    backslashEscapesHTMLTags: true,
  });

  const [isPending, startTransition] = useTransition();
  const isTransitionActive = useRef(true); // Par défaut, la transition est active
  const [delta, setDelta] = useState<string>(post?.content || "");
  const [markdown, setMarkdown] = useState<string>(
    post?.content ? converter.makeMarkdown(post.content) : ""
  );
  const [markDownIA, setMarkDownIA] = useState<string>("");
  const [title, setTitle] = useState<string>(post?.title || "");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [image, setImage] = useState<string>(post?.image || "");
  const [excerpt, setExcerpt] = useState<string>(post?.excerpt || "");
  const [published, setPublished] = useState<boolean>(post?.published || false);
  const [canonicalSlugInitial, setCanonicalSlugInitial] = useState<string>(
    post?.canonicalSlug ? post.canonicalSlug : ""
  );
  const [canonicalSlug, setCanonicalSlug] = useState<string>(
    post?.canonicalSlug
      ? post.canonicalSlug
      : slugify(title, { lower: true }) || ""
  );

  // Showdown
  useEffect(() => {
    if (post.categoryId) {
      setSelectedCategory(post.categoryId);
    }
  }, [post.categoryId]);
  const handleCategoryChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setSelectedCategory(event.target.value);
  };
  const handleMouseDown = (e: any) => {
    e.preventDefault();
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  const handleMouseMove = (e: any) => {
    if (textareaRef.current) {
      const rect = textareaRef.current.getBoundingClientRect();
      const height = rect.bottom - e.clientY;
      textareaRef.current.style.height = `${height}px`;
    }
  };

  const handleMouseUp = () => {
    document.removeEventListener("mousemove", handleMouseMove);
    document.removeEventListener("mouseup", handleMouseUp);
  };

  const formattedMarkdown = converter.makeHtml(delta);

  useEffect(() => {
    setDelta(markdown);
  }, [markdown]);

  const handleSavePost = async () => {
    const tagIds = selectedTags.map((tag) => tag.value); // Assumant que 'value' contient l'ID du tag

    const save = await saveEditPost({
      id: post.id,
      image: image,
      title: title,
      content: formattedMarkdown,
      canonicalSlug: slugify(canonicalSlug, { lower: true }),
      excerpt: excerpt,
      published: published,
      categoryId: selectedCategory ? selectedCategory : "nothing",
    });
    await saveTagsForPost(post.id, tagIds);

    if (!save) {
      Toastify({ type: "error", value: "Une erreur est survenue" });
    } else {
      Toastify({ type: "success", value: "L'article a bien été enregistré" });
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if ((event.ctrlKey || event.metaKey) && event.key === "s") {
      event.preventDefault(); // Empêche l'action par défaut du navigateur pour CTRL/CMD + S
      handleSavePost();
    }
  };

  const handlePublish = (event: React.MouseEvent<HTMLButtonElement>) => {
    const state = event.currentTarget.getAttribute("data-state");

    if (state === "checked") {
      setPublished(false);
    } else if (state === "unchecked") {
      setPublished(true);
    }
  };

  const [selectedTags, setSelectedTags] = useState<
    { value: string; label: string; __isNew__?: boolean }[]
  >([]);

  useEffect(() => {
    const initialSelectedTags = tagsOnPost
      ? tagsOnPost.map((tagOnPost) => {
          const tag = tags?.find((tag) => tag.id === tagOnPost.tagId);
          return {
            id: tagOnPost.tagId,
            label: tag?.name || "",
            value: tag?.name ? tag.name : tagOnPost.tagId,
          };
        })
      : [];
    setSelectedTags(initialSelectedTags);
  }, [tags, tagsOnPost]);

  const [tagsOptions, setTagsOptions] = useState(
    tags
      ? tags.map((tag) => ({ id: tag.id, label: tag.name, value: tag.name }))
      : []
  );

  const handleChangeTags = (
    newValue: ReadonlyArray<OptionType> | null,
    actionMeta: any
  ) => {
    setSelectedTags([...(newValue || [])]);

    const newTags = (newValue || []).filter(
      (option) =>
        option.__isNew__ &&
        !tagsOptions.some((tagsOption) => tagsOption.label === option.label)
    );

    const newTagsWithId = newTags.map(
      (tag: { label: string; value: string }) => ({
        id: "",
        label: tag.label,
        value: tag.value,
      })
    );
    // Ajouter les nouveaux tags à tagsOptions
    setTagsOptions((prevOptions) => [...prevOptions, ...newTagsWithId]);
  };

  //  On fait appel à l'api api/prompt pour créer un post avec l'IA
  const handleCreatePostWithAI = async () => {
    startTransition(async () => {
      const response = await fetch("/api/gpt/prompt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          prompt: "Créer un post avec l'IA",
          max_tokens: 100,
          temperature: 0.9,
          top_p: 1,
          n: 1,
          stream: false,
          logprobs: null,
          stop: ["###"],
        }),
      });

      const data = await response.json();

      setMarkDownIA(converter.makeMarkdown(data));
    });
  };

  return (
    <>
      <div className="flex flex-col gap-4 relative justify-center w-full mx-auto">
        <Input
          placeholder="Titre de l'article"
          value={title}
          onChange={(e) => {
            setTitle(e.currentTarget.value);
            setCanonicalSlug(
              !canonicalSlugInitial
                ? slugify(e.currentTarget.value, { lower: true })
                : canonicalSlugInitial
            );
          }}
          className="input-blog-title"
        />
        {!validator.isURL(image) && (
          <Input
            placeholder="URL de l'image de couverture"
            value={image}
            onChange={(e) => {
              setImage(e.currentTarget.value);
            }}
            className="input-blog-image"
          />
        )}
        {image && validator.isURL(image) && (
          <div className="h-[35vh] w-full relative object-cover">
            {" "}
            <div
              className="absolute top-0 right-0 h-8 w-8 z-10 flex items-center justify-center rounded-bl-lg rounded-tr-lg bg-app-950  hover:bg-app-800 cursor-pointer"
              onClick={() => {
                setImage("");
              }}>
              <FontAwesomeIcon
                className="text-app-50 px-2"
                size="xs"
                icon={faTrash}
              />
            </div>
            <Image
              src={image}
              // width={1920}
              // height={1080}
              fill={true}
              alt={title}
              className="object-cover rounded-lg"
            />
          </div>
        )}

        <article
          className="min-h-[100vh] p-5 rounded-lg"
          dangerouslySetInnerHTML={{ __html: formattedMarkdown }}></article>
        <div className="sticky bottom-[-10px]" onKeyDown={handleKeyDown}>
          <Button
            className="absolute top-0 w-auto right-0"
            onClick={handleSavePost}>
            <FontAwesomeIcon icon={faFloppyDisk} className="mr-2" />
          </Button>
          <Textarea
            ref={textareaRef}
            placeholder="Votre article en Markdown..."
            className="textareaBlogPostEditor"
            value={markdown.replace("<br>", "")}
            onChange={(e) => {
              setMarkdown(e.currentTarget.value);
            }} // change here
          />
          <div className="textarea-resizer" onMouseDown={handleMouseDown}></div>
        </div>
        <div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="canonicalSlug">URL Canonique</Label>
            <Input
              id="canonicalSlug"
              onChange={(e) => {
                setCanonicalSlug(e.currentTarget.value);
              }}
              value={
                canonicalSlug ? canonicalSlug : slugify(title, { lower: true })
              }
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="excerpt">Extrait</Label>
            <Textarea
              id="excerpt"
              className="shadcnInput"
              style={{ height: "10rem" }}
              onChange={(e) => {
                setExcerpt(e.currentTarget.value);
              }}
              value={
                !excerpt
                  ? // récupérer le premier paragraphe de formattedMarkdown
                    formattedMarkdown.split("</p>")[0].replace("<p>", "")
                  : excerpt
              }
            />
          </div>
          <div className="flex items-center space-x-2 mt-5 absolute -top-14 right-0">
            <Switch
              id="published"
              checked={published}
              onMouseDown={handlePublish}
            />
            <Label htmlFor="published">Publier</Label>
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="category">Catégorie</Label>
            <select
              id="category"
              className="shadcnInput"
              value={selectedCategory || ""}
              onChange={handleCategoryChange}>
              <option value="">Sans catégorie</option>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </select>
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="tags">Tags</Label>
            <CreatableSelect
              id="tags"
              className="react-select-container"
              classNamePrefix="react-select"
              noOptionsMessage={() =>
                "Aucune autre option. Vous pouvez créer un nouveau tag."
              }
              formatCreateLabel={(inputValue) => `Créer le tag "${inputValue}"`}
              onChange={handleChangeTags}
              isMulti
              options={tagsOptions}
              value={selectedTags}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="textIA">Générateur de texte</Label>
            <Button
               className={`${
                isPending 
                  ? "disabled opacity-50 cursor-default"
                  : null
              }`}
              onClick={() => {
                handleCreatePostWithAI();
              }}>
              {isPending && isTransitionActive.current ? (
                <Loader className="mr-2 h-4 w-4" />
              ) : null}{" "}
              Créer un post avec l&apos;IA
            </Button>
          </div>
        </div>
        <div className="mt-5">
          <article
            className="min-h-[100vh] p-5 rounded-lg"
            dangerouslySetInnerHTML={{
              __html: markDownIA.replace(/\\/g, ""),
            }}></article>
        </div>
      </div>
    </>
  );
};

export default EditPost;