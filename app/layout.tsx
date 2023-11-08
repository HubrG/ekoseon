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
import { SpeedInsights } from '@vercel/speed-insights/next';

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
  "Ekoseon transforme vos dialogues en podcasts mémorables et livres biographiques avec des entretiens personnalisés, capturant ainsi l'essence de vos souvenirs et histoires.";
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
              <div>
                {children}
                <SpeedInsights />
              </div>
              <Footer />
            </ThemeProvider>
          </body>
        </Provider>
      </html>
    </>
  );
}
