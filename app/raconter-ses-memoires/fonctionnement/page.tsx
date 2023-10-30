import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Fonctionnement"),
  description: "Ekoseon",
};

export default async function working() {
  return (
    <PageTransition>
    <div className="content">working</div>
    </PageTransition>
  )
}
