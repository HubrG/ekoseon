import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: Meta("title", "Blog"),
  description: "Ekoseon",
};

export default async function faq() {
  return (
    <PageTransition>
    <div className="content">Blog</div>
    </PageTransition>
  )
}
