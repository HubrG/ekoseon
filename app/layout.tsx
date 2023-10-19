import { ThemeProvider } from "@/src/theme/ThemeProvider";
import "./globals.css";
import '@fortawesome/fontawesome-svg-core/styles.css'; // Import the CSS
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { clsx } from "clsx";
import { Header } from "@/src/feature/layout/Header";
import { Footer } from "@/src/feature/layout/Footer";
import Provider from "@/context/Provider";
import { Session } from "next-auth";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ekoseon",
  description: "Ekoséon",
};

export default function RootLayout({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <html lang="fr">
      <Provider session={session}>
        <body className={clsx(inter.className, "bg-background")}>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Header />
            <div className="py-0 p-0">{children}</div>
            <Footer />
          </ThemeProvider>
        </body>
      </Provider>
    </html>
  );
}
