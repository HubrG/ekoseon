// metadata.ts
const titleBase = "Ekoseon | Vos mémoires au format audio et papier";
const descBase =
  "Ekoseon transforme vos dialogues en podcasts et livres biographiques avec des entretiens personnalisés, capturant ainsi l'essence de vos souvenirs et histoires.";

interface MetadataParams {
  title?: string;
  description?: string;
  url?: string;
  imgPath?: string;
  type?: string;
}

export const createMetadata = ({
  title = titleBase,
  type = "website",
  description = descBase,
  url = process.env.NEXT_PUBLIC_RELATIVE_URI,
  imgPath = "/img/header-home.webp",
}: MetadataParams) => {
  const imgURL = `${process.env.NEXT_PUBLIC_RELATIVE_URI}${imgPath}`;

  return {
    title: title,
    metadataBase: new URL(`${process.env.NEXT_PUBLIC_RELATIVE_URI}`),
    description: description, // 170 caractères maximum
    alternates: {
      canonical: url, // URL Canonique, pour éviter les "duplicate content"
    },
    openGraph: {
      title: title,
      type: type,
      description: description,
      url: url,
      siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
      images: [
        {
          url: imgURL,
          width: 1800,
          height: 1600,
          alt: `${process.env.NEXT_PUBLIC_APP_NAME}`,
        },
      ],
      locale: "fr_FR",
    },
  };
};

export default createMetadata;
