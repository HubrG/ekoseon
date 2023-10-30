import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Politique de confidentialité"),
  description: "Ekoseon",
};
export default async function privacy() {
  return (
    <PageTransition>
    <div className="content">privacy</div>
    </PageTransition>
  )
}
