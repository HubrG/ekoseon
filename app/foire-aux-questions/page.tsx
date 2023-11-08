import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import FAQComponent from '../../src/feature/layout/FAQ/Faq';

export const metadata: Metadata = {
  title: Meta("title", "Foire aux questions"),
  description: "Ekoseon",
};

export default async function FAQ() {
  return (
    <PageTransition>
      <div className="content">
        <h1 className="title-page">Foire aux questions</h1>
        <div className="faqContent">
          <FAQComponent />
        </div>
      </div>
    </PageTransition>
  );
}
