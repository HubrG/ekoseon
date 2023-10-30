import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Conditions générales de vente"),
  description: "Ekoseon",
};

export default async function cgv() {
  return (
    <PageTransition>
      <div className="content">cgv</div>
    </PageTransition>
  );
}
