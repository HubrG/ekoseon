import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: Meta("title", "Merci !"),
  description: "Ekoseon",
};

export default async function Success() {
 
  //
  return (
    <>
      <PageTransition>
        <div className="content">
        <h1 className="text-center">
                Votre commande a bien été réglée, toutefois cette dernière n&apos;a pas été enregistrée en base de données. Veuillez nous contacter.
              </h1>
        </div>
      </PageTransition>
    </>
  );
}
