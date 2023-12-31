import "./globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css";
import "react-toastify/dist/ReactToastify.css";
import Provider from "@/context/Provider";
import { Footer } from "@/src/feature/layout/Footer";
import { Header } from "@/src/feature/layout/Header";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import { clsx } from "clsx";
import { Session } from "next-auth";
import { Caveat, Nunito, Newsreader, Cormorant } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import dynamic from "next/dynamic";
const ToastProvider = dynamic(
  () => import("@/src/feature/layout/toastify/ToastProvider")
);
import Script from "next/script";

import createMetadata from "@/lib/metadatas";
export const metadata = createMetadata({
  // Voir la configuration des métadonnées dans metadatas.ts
  // file://@/lib/metadatas
});

const sans = Nunito({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const serif = Newsreader({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
const display = Caveat({ subsets: ["latin"], variable: "--font-display" });

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
              <ThemeProvider
                attribute="class"
                defaultTheme="light"
                enableSystem>
                <div>
                  <Header />
                  {children}
                  {/* <SpeedInsights /> */}
                </div>
                <Footer />
              </ThemeProvider>
            </ToastProvider>
          </body>
        </Provider>
      </html>
    </>
  );
}
