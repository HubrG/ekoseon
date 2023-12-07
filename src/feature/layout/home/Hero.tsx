import React, { Suspense } from "react";
import MotionParallax from "../effects/Parallax";
import MotionShow from "../effects/Show";
import GetStartButton from "./GetStartButton";
import Image from "next/image";
import { ParticlesDiv } from "./Particles";
// import Particles from 'react-particles-js';

const AnimatedGradientText = ({ children }: { children: any }) => (
  <span className="animated-gradient-audio-paper">{children}</span>
);
export default function Hero() {
  return (
    <section className=" -z-20 pb-0 mb-0" id="hero-section">
      <MotionParallax speed={0.3} type={1}>
        <div className="absolute  z-10  h-screen w-full">
          <Image
            priority={true}
            src="/img/home/hero.webp"
            alt="Ekoseon - Raconter ses mémoires"
            fill
            className="object-center object-cover  brightness-150"
          />
        </div>
        <div className="absolute w-full h-full z-10">
          <ParticlesDiv />
        </div>
        <div className="absolute  w-full background-hero  z-10 h-screen bg-app-900 bg-opacity-50"></div>
        <div className="flex items-center  h-[97vh]   relative bg-center z-20">
          <div className="z-10 text-center text-neutral-content w-full ">
            <MotionParallax speed={0.4} type={0} initial={false}>
            <div className="max-w-3xl mx-auto">
              <h1 className="mb-5 px-5 md:text-7xl xs:text-6xl text-5xl  font-bold">
                <MotionShow
                  threshold={0.6}
                  animation="bounceIn"
                  initial={false}>
                <small className="text-white flex flex-col gap-y-2">
                  <span className="gap-y-2 text-white">
                    Transformez vos récits personnels en{" "}
                    <AnimatedGradientText>
                      {" "}
                      œuvres intemporelles
                    </AnimatedGradientText>
                  </span>
                </small>
                </MotionShow>
              </h1>
              <MotionShow threshold={0.6} animation="bounceIn" initial={false}>
                <GetStartButton />
              </MotionShow>
            </div>
            </MotionParallax>
          </div>
          <div id="appFirstPage" className="bottom-[2.35rem] absolute"></div>
        </div>
      </MotionParallax>
    </section>
  );
}
