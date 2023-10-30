
import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: Meta("title", "Contactez-nous"),
  description: "Ekoseon",
};

export default  function contact() {
  return (
    <PageTransition>
    <div className="content">contact</div>
    </PageTransition>
  )
}
