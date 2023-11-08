import { OpenAI } from "openai";
import { NextApiRequest, NextApiResponse } from "next";
import Showdown from "showdown";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

const openai = new OpenAI({
  apiKey: process.env.API_KEY_GPT,
});
export const config = {
  maxDuration: 300, // Durée maximale de 5 minutes
};
const strip_tags = (str: string) => {
  if (typeof str === "string") {
    return str.replace(/<\/?[^>]+(>|$)/g, "");
  }
  return "";
};

const retrievePrompt = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    // Configuring Showdown
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

    const converter = new Showdown.Converter({
      extensions: ["tasklists"],
      tables: true,
      backslashEscapesHTMLTags: true,
    });

    console.log("⚙️  Réponse de GPT en cours de génération...");
    const response = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        { role: "system", content: req.body.promptSystem },
        { role: "user", content: req.body.prompt },
      ],
      temperature: req.body.temperature,
      max_tokens: req.body.max_tokens,
      top_p: req.body.top_p,
      frequency_penalty: req.body.frequency_penalty,
      presence_penalty: req.body.presence_penalty,
    });
    console.log("✅ Réponse de GPT");

    const resp = response.choices[0].message.content;

    if (!resp) throw new Error("Réponse vide de GPT");

    console.log("⚙️  Création du post...");
    const match = resp.match(/^#\s*(.*?)(\n|$)/);
    const title = match && match[1];
    const newContent = resp.replace(/^#\s*.*?(\n|$)/, "");
    const contentHTML = converter.makeHtml(newContent);
    // excerpt : prendre les 200 premiers caractères de la première balise <p> et terminer avec des ...
    // On cherche la première balise <p><P> et on extrait le contenu
    let firstParagraphContent;
    if (contentHTML) {
      const match = contentHTML.match(/<p>(.*?)<\/p>/);
      firstParagraphContent = match ? match[1] : "";
    } else {
      firstParagraphContent = "";
    }
    // On supprime les balises HTML
    const excerpt = strip_tags(firstParagraphContent).slice(0, 200) + "...";
    //
    if (!req.body.userId) throw new Error("UserId manquant");

    if (!title) {
      console.log("❌ Le titre n'a pas été trouvé");
      return res.status(400).json({ error: "Le titre n'a pas été trouvé" });
    }

    const newBlogPost = await prisma.blogPost.create({
      data: {
        title: title,
        canonicalSlug: slugify(title, {
          lower: true,
          strict: true,
          remove: /[*+~.()'"!:@]/g,
        }),
        content: contentHTML,
        excerpt: excerpt,
        published: false,
        authorId: req.body.userId,
        category: undefined,
        isIA: true,
      },
    });
    console.log("✅ Post créé");
    // On récupère l'ID du post
    const postId = newBlogPost.id;
    // On fait un nouvel appel à GPT pour récupérer les tags
    const responseTag = await openai.chat.completions.create({
      model: "gpt-4-1106-preview",
      messages: [
        {
          role: "system",
          content: "Tu es expert en SEO",
        },
        {
          role: "user",
          content: `Donne 3 mots-clés génériques pour cet article, séparés par des points-virgules. Aucun autre commentaire, uniquement les mots clés séparés par des virgules ! : ${newContent}`,
        },
      ],
      temperature: req.body.temperature,
      // max_tokens: req.body.max_tokens,
      max_tokens: 1000,
      top_p: req.body.top_p,
      frequency_penalty: req.body.frequency_penalty,
      presence_penalty: req.body.presence_penalty,
    });
    // On récupère les tags
    const tags = responseTag.choices[0].message.content;
    if (tags) {
      console.log("⚙️  Création des tags...");

      // Ils sont séparés par des ; donc on les split
      const tagsArray = tags
        .split(";")
        .map((tag) => tag.trim()[0].toUpperCase() + tag.trim().slice(1));

      // Démarrez une transaction Prisma
      await prisma.$transaction(async (prisma) => {
        // 1. Recherchez les tags existants
        const existingTags = await prisma.blogTag.findMany({
          where: {
            name: {
              in: tagsArray,
            },
          },
        });

        // 2. Créez les nouveaux tags qui n'existent pas à partir de la liste
        for (const tagName of tagsArray) {
          if (!existingTags.some((tag) => tag.name === tagName)) {
            let slug = slugify(tagName, {
              lower: true,
              remove: /[*+~.()'"!:@]/g,
            });
            let uniqueSlug = slug;
            let counter = 0;

            // Vérifiez l'unicité du slug et ajustez si nécessaire
            while (
              await prisma.blogTag.findUnique({ where: { slug: uniqueSlug } })
            ) {
              uniqueSlug = `${slug}-${++counter}`;
            }

            // Créer le tag avec le slug unique
            await prisma.blogTag.create({
              data: {
                name: tagName,
                slug: uniqueSlug,
              },
            });
          }
        }

        // 3. Obtenez les IDs des tags à nouveau pour inclure les nouveaux tags
        const allTags = await prisma.blogTag.findMany({
          where: {
            name: {
              in: tagsArray,
            },
          },
        });

        // 4. Associez tous les tags au post dans blogTagOnPost
        await prisma.blogTagOnPost.deleteMany({
          where: {
            postId: postId,
          },
        });

        const tagPostAssociations = allTags.map((tag) => ({
          postId: postId,
          tagId: tag.id,
        }));

        await prisma.blogTagOnPost.createMany({
          data: tagPostAssociations,
          skipDuplicates: true, // Cette option saute les doublons
        });
      });

      console.log("✅ Tags ajoutés au post");
    }
    //
    let image;
    if (title) {
      console.log(
        `⚙️  Image en cours de génération pour le titre « ${title} »...`
      );
      image = await openai.images.generate({
        model: "dall-e-3",
        n: 1,
        prompt: `Génère une image dans le style Modern Art\n\n je ne veux pas que tu écrives quelque chose.\n\n Je veux des paysages ou des personnes, des concepts, des idées, mais pas d'écriture\n\nVoici le thème : ${req.body.prompt}`,
        size: "1792x1024",
      });
      console.log("✅ Image générée");
    }
    // On envoie l'image sur Cloudinary :
    if (!image) throw new Error("Image manquante");
    const imageToUpload = image.data[0].url;
    //

    
    const uploadedResponse = await uploadAndRenameImage( imageToUpload ? imageToUpload : "", slugify(title, {
      lower: true,
      strict: true,
      remove: /[*+~.()'"!:@]/g,
    }))
      .then(result => {
        console.log("✅ Image envoyée sur Cloudinary");
        console.log(`⚙️  Ajout de l'image au post...`);
        return result;
      }
      )
    .catch(error => console.error('Rename failed:', error));


    const imageToPost = uploadedResponse;
   
    // On ajoute l'image dans le post par un update via postId

    console.log("✅ Image envoyée sur Cloudinary");
    console.log(`⚙️  Ajout de l'image au post...`);
    await prisma.blogPost.update({
      where: {
        id: postId,
      },
      data: {
        image: imageToPost ? imageToPost : imageToUpload,
      },
    });
    if (!imageToPost) {
      console.log(
        "❌ Erreur lors de l'envoi sur Cloudinary, l'image de DALLE-2 a été ajoutée"
      );
    }
    console.log("🥳 Tout est prêt !");
    res.status(200).json(newBlogPost);
  } catch (error: any) {
    console.error(error.message);
    res.status(500).json({ error: error.message });
  }
};

export default retrievePrompt;


async function uploadAndRenameImage(imageToUpload:string, newName:string) {
  try {
    // Téléverse l'image
    const uploadedResponse = await cloudinary.uploader.upload(
      imageToUpload || "", {
        resource_type: "image",
        aspect_ratio: "16:9",
        crop: "fill",
        gravity: "face",
        format: "webp",
      }
    );

    // Vérifie si l'image a bien été téléversée
    if (uploadedResponse.public_id) {
      // Renomme l'image téléversée
      const renameResponse = await cloudinary.uploader.rename(
        uploadedResponse.public_id, 
        newName,
        { overwrite: false } // Changez cette option selon vos besoins
      );

      // Retourne la réponse du renommage
      return renameResponse.secure_url;
    } else {
      throw new Error("Image upload failed");
    }
  } catch (error) {
    console.error("Error during image upload or rename:", error);
    throw error;
  }
}