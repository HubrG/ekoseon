import MotionParallax from "@/src/feature/layout/effects/Parallax";
import MotionShow from "@/src/feature/layout/effects/Show";
import Image from "next/image";
import GetStartButton from "@/src/feature/layout/home/GetStartButton";

export default async function Home() {
  return (
    <>
        <section className=" relative z-0  ">
          <MotionParallax speed={0.3} type={1}>
            <div className="flex items-center box-border h-screen bg-cover relative bg-center z-0">
            <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen">
                <Image
                  priority={true}
                  src="/img/test.jpeg"
                  alt="Interview"
                  fill
                  className="rounded-md object-center object-cover brightness-90"
                />
              </div>
              <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen  bg-fuchsia-900 bg-opacity-50"></div>
              <div className="z-10 text-center text-neutral-content w-full">
                <MotionParallax speed={0.4} type={0}>
                  <MotionShow threshold={0.3} animation="bounceIn">
                    <MotionShow
                      threshold={0.1}
                      triggerOnce={true}
                      animation="zoomIn">
                      <div className="max-w-3xl -mt-52  mx-auto">
                        <h1 className="mb-5  lg:text-7xl md:text-6xl px-2  text-5xl   font-bold">
                          <small className="text-white">
                            {" "}
                            Nous vous interviewons et consignons vos mémoires{" "}
                            <br />
                            sur des supports{" "}
                            <span className="animated-gradient-audio-paper">
                              audio
                            </span>
                            <span className="text-xl mx-2 text-white">&</span>
                            <span className="animated-gradient-audio-paper">
                              papier
                            </span>
                          </small>
                        </h1>
                      </div>
                      <div className="absolute justify-center w-full">
                        <GetStartButton />
                      </div>
                    </MotionShow>
                  </MotionShow>
                </MotionParallax>
              </div>
            </div>
          </MotionParallax>
        </section>
        <div className="">
          <section className="first-section" id="ekoseon">
            <div className="content">
              <h2>Biographie orale</h2>
              <ul>
                <li>Un véritable livre audio !</li>
              </ul>
            </div>
          </section>
          <section className="min-h-screen">
            <div className="content">
              <h2>Biographie écrite</h2>
            </div>
          </section>
        </div>
    </>
  );
}
