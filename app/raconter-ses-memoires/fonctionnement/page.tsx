import PageTransition from "@/src/feature/layout/effects/PageTransition";

export default async function working() {
  return (
    <PageTransition>
    <div className="content">working</div>
    </PageTransition>
  )
}
