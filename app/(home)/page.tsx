"use client";
// import { getAuthSession } from "@/lib/auth";
import Parallax from "@/src/feature/layout/effects/Parallax";
import MotionAnimate from "@/src/feature/layout/effects/Motion";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/pro-duotone-svg-icons";
import { useState } from "react";

export default function Home() {
  
  const [isBounce, setIsBounce] = useState<Boolean>(false);
  
  const handleScrollButton =
    (anchorId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
      e.preventDefault();
      const elem = document.getElementById(anchorId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 300); // Retarde l'appel de 300 millisecondes
      }
    };

  return (
    <>
      <section className=" relative z-0">
        <Parallax speed={0.2} type={1}>
          <div className="flex items-center box-border h-screen bg-cover relative bg-center z-0">
            <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen">
              <Image
                src="/img/test.jpeg"
                alt="Interview"
                fill
                className="rounded-md object-center object-cover brightness-90"
              />
            </div>
            <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen  bg-fuchsia-900 bg-opacity-50"></div>
            <div className="z-10 text-center text-neutral-content w-full">
              <Parallax speed={0.3}  type={0}>
                <MotionAnimate threshold={0.3} animation="bounceIn">
                  <MotionAnimate
                    threshold={0.1}
                    triggerOnce={true}
                    animation="zoomIn">
                    <div className="max-w-3xl -mt-52  mx-auto">
                      <h1 className="mb-5  lg:text-7xl md:text-6xl px-2  text-5xl  text-white font-bold">
                        <small>
                          {" "}
                          Nous vous <span>interviewons</span> et consignons votre mémoire{" "}
                          <br />
                          sur des supports{" "}
                          <span className="animated-gradient-audio-paper">
                            audio
                          </span>
                          <span className="text-xl mx-2">&</span>
                          <span className="animated-gradient-audio-paper">
                            papier
                          </span>
                        </small>
                      </h1>
                    </div>
                    <div className="absolute justify-center w-full">
                      <Button
                        onMouseEnter={() => setIsBounce(true)}
                        onMouseLeave={() =>  setIsBounce(false)}
                        onClick={handleScrollButton("start")}
                        size="lg"
                        variant="link"
                        className="mx-auto flex flex-row hover:no-underline gap-x-5 items-center mt-10 md:text-2xl text-xl font-display py-8 justify-center   gap-y-1 hover:bg-opacity-60 border border-fuchsia-100  hover:border-fuchsia-800 hover:border-solid hover:bg-fuchsia-900  text-white hover:text-fuchsia-100  bg-opacity-80">
                        C&apos;est-à-dire 
                        <FontAwesomeIcon icon={faQuestion} {...(isBounce ? { bounce: true } : { beatFade: true })} />
                      </Button>
                    </div>
                  </MotionAnimate>
                </MotionAnimate>
              </Parallax>
            </div>
          </div>
        </Parallax>
      </section>
      <section
        className="first-section"
        id="start">
        <div className="content">d{/* Home {session?.user.email} */}</div>
      </section>
    </>
  );
}
