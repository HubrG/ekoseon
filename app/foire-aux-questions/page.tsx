import PageTransition from "@/src/feature/layout/effects/PageTransition";
import FAQComponent from "../../src/feature/layout/FAQ/Faq";

import { Meta } from "@/src/feature/layout/metadata/Metadata";
import createMetadata from "@/lib/metadatas";
export const metadata = createMetadata({
  title: Meta("title", "Foire aux questions"),
  description: "Ekoseon",
});

export default async function FAQ() {
  return (
    <div className="content">
      <h1 className="title-page">Foire aux questions</h1>
      <div className="faqContent">
        <FAQComponent />
      </div>
    </div>
  );
}
