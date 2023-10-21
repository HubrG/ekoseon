import Provider from "@/context/Provider";
import { Footer } from "@/src/feature/layout/Footer";
import { Header } from "@/src/feature/layout/Header";
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { Bitter, Caveat, Exo } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

const sans = Exo({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});
const serif = Bitter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-serif",
});
const display = Caveat({ subsets: ["latin"], variable: "--font-display" });

export const metadata: Metadata = {
  title: "Ekoseon",
  description: "Ekoseon",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <>
      <html
        lang="fr"
        suppressHydrationWarning={true}
        className={`${sans.variable} ${serif.variable}  ${display.variable} font-sans`}>
        <Provider session={session}>
          <body
            className={clsx("bg-background")}
            suppressHydrationWarning={true}>
            <NextTopLoader
              color="#86198f"
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
                <Header />
                  <PageTransition>
                <div className="">{children}</div>
            </PageTransition>
                <Footer />
              </ThemeProvider>
          </body>
        </Provider>
      </html>
    </>
  );
}
