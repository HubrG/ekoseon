import MotionShow from "@/src/feature/layout/effects/Show";
import Hero from "@/src/feature/layout/home/Hero";


export default async function Home() {
  return (
    <>
      <Hero />
      <section className="first-section" id="appFirstPage">
        <div className="content">
          <h2>Biographie orale</h2>
          <ul>
            <li>Un véritable livre audio !</li>
          </ul>
        </div>
      </section>
      <section className="min-h-screen">
        <div className="content">
          <MotionShow threshold={0.3} animation="bounceIn">
            <h2>Biographie écrite</h2>
          </MotionShow>
        </div>
      </section>
    </>
  );
}
