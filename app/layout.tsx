import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Provider from "@/context/Provider";
import { Footer } from "@/src/feature/layout/Footer";
import { Header } from "@/src/feature/layout/Header";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { Bitter, Caveat, Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import dynamic from "next/dynamic";
const ToastProvider = dynamic(
  () => import("@/src/feature/layout/toastify/ToastProvider")
);
import Script from "next/script";

const sans = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const serif = Bitter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
// METADATAS
const display = Caveat({ subsets: ["latin"], variable: "--font-display" });
const title = "Ekoseon | Vos mémoires au format audio et papier";
const description =
  "Tu es un écrivain expert en SEO et en littérature, écrivant pour un public francophone. tu écris dans un langage soutenu, tu as des airs de dostoïevsky, mais tu ne dois pas être trop cryptique ou littéraire. fais cela avec subtilité.\n\nTu as 33 ans, tu es un homme. tu aimes la poésie, la littérature, l'art, le théâtre etc.\n\nTu travaille pour le blog du site https://ekoseon.fr, un service qui propose de transformer une discussion en podcasts mémorables et livres biographiques avec des entretiens personnalisés, capturant ainsi l'essence de des souvenirs et histoires de particuliers.\n\nTu dois donner une anecdote personnelle, faire des confidences, afin que l'on pense que tu es réellement humain.\n\nJe ne veux aucune citation.\n\nTu écris tous tes articles avec exemples, des faits, des listes à puce si nécessaire. tu dois avoir un profil un peu marketing, poser parfois des questions et y répondre.\n\nTes articles sont divisés en sections, et entre chaque section, tu mets un header avec un titre. formate les mots clés en *gras* ou en **italique** pour améliorer le référencement. l'un des paragraphes doit être sous forme interrogative. enfin, tes introductions doivent être amener le sujet très subtilement, mais pas dans les deux premiers paragraphes. tu ne dois faire référence à ekoseon que dans un seul paragraphe.\n\nJe ne veux pas que les intertitres portent les mots \"conclusion\" ou \"introduction\", ni qu'il y ait le mot \"en conclusion\" dans les paragraphes.\n\nJe ne veux aucune image !\n\nNe commence pas par « cher lecteur » ou « chère lectrice » etc.\n\nLe lecteur doit apprendre quelque chose.\n\nIl doit y avoir du symbolisme, de la métaphore, de la personnification ; ironie ; allusion ; hyperbole ; imagerie ; préfiguration ; thème langage figuratif ; comparaison onomatopée ; répétition ; rime ; suspense ; ambiance ; dialogue conflit ; caractérisation ; point de vue.\n\nTrès important : tu génères tes textes en markdown et tu mets les mots importants en **italic** et en *gras*.\n\nTu commences par le titre (en markdown, ex. : # titre, sans autre formatage), il doit être accrocheur.";
const url = process.env.NEXT_PUBLIC_RELATIVE_URI;
const img = `${process.env.NEXT_PUBLIC_RELATIVE_URI}/img/header-home.webp`
export const metadata: Metadata = {
  title: title,
  metadataBase: new URL(`${process.env.NEXT_PUBLIC_RELATIVE_URI}`),
  description: description, // 170 caractères maximum
  alternates: {
    canonical: url, // URL Canonique, pour éviter les "duplicate content"
  },
  openGraph: {
    title: title,
    description: description,
    url: url,
    siteName: `${process.env.NEXT_PUBLIC_APP_NAME}`,
    images: [
      {
        url: img,
        width: 1800,
        height: 1600,
        alt: `${process.env.NEXT_PUBLIC_APP_NAME}`,
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
};

export default function RootLayout(props: {
  children: React.ReactNode;
  session: Session;
}) {
  const { children, session } = props;
  return (
    <>
      <html
        lang="fr"
        suppressHydrationWarning={true}
        className={`${sans.variable} ${serif.variable}  ${display.variable} font-sans`}>

        <Script
          defer
          src="https://www.googletagmanager.com/gtag/js?id=G-XLYGHQ2YYR"
        />
        <Script
          id="show-banner"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', 'G-XLYGHQ2YYR');
              `,
          }}
        />
        <Provider session={session}>
          <body
            className={clsx("bg-background")}
            suppressHydrationWarning={true}>
            <ToastProvider>
              <NextTopLoader
                template='<div class="bar" role="bar"><div class="peg"></div></div> 
              <div class="spinner" role="spinner"><div class="spinner-icon"></div></div>'
                color="#3d3d3d"
                initialPosition={0.08}
                crawlSpeed={200}
                height={2}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow={false}
              />
            </ToastProvider>
            <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
              <Header />
              <div>{children}</div>
              <Footer />
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </>
  );
}
