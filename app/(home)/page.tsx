import MotionParallax from "@/src/feature/layout/effects/Parallax";
import Image from "next/image";
import GetStartButton from "@/src/feature/layout/home/GetStartButton";
import MotionShow from "@/src/feature/layout/effects/Show";

const AnimatedGradientText = ({ children }: { children:any }) => (
  <span className="animated-gradient-audio-paper">{children}</span>
);

export default async function Home() {
  return (
    <>
      <section className="static z-0">
        <MotionParallax speed={0.3} type={1}>
          <div className="flex items-center box-border h-screen bg-cover relative bg-center z-0">
            <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen">
              <Image
                priority={true}
                src="/img/header-home.webp"
                alt="Interview"
                fill
                className="object-center object-cover brightness-150"
              />
            </div>
            <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen bg-app-900 bg-opacity-50"></div>
            <div className="z-10 text-center text-neutral-content w-full">
              <MotionParallax speed={0.4} type={0}>
                <MotionShow threshold={0.6} animation="bounceIn">
                  <div className="max-w-3xl mx-auto">
                    <h1 className="mb-5 lg:text-7xl md:text-6xl px-2 text-5xl font-bold">
                      <small className="text-white flex flex-col gap-y-2">
                        <span>
                          <span>
                          <AnimatedGradientText>Une empreinte</AnimatedGradientText> éternelle <br />de
                          votre existence{" "}
                          </span><br />
                          <AnimatedGradientText>
                          par une discussion
                          </AnimatedGradientText>
                        </span>

                        <span className="text-5xl text-white px-2 font-display">
                          ( en{" "}
                          <AnimatedGradientText>
                            <span className=" font-display">audio </span>
                          </AnimatedGradientText>
                          , puis dans un
                          <AnimatedGradientText>
                            <span className=" font-display"> livre </span>
                          </AnimatedGradientText>
                          )
                        </span>
                      </small>
                    </h1>
                  </div>
                </MotionShow>
              </MotionParallax>
            </div>
          </div>
          <div className="absolute w-full flex justify-center mx-auto md:bottom-40 bottom-20">
            <GetStartButton />
          </div>
        </MotionParallax>
      </section>
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
