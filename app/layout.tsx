import Provider from "@/context/Provider";
import { Footer } from "@/src/feature/layout/Footer";
import { Header } from "@/src/feature/layout/Header";
import { ThemeProvider } from "@/src/theme/ThemeProvider";
import "@fortawesome/fontawesome-svg-core/styles.css";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from "react-toastify";
import { clsx } from "clsx";
import type { Metadata } from "next";
import { Session } from "next-auth";
import { Bitter, Caveat, Nunito } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";
import Head from "next/head";

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
          <ToastContainer
          
        />
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
