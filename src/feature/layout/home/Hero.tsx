import React from "react";
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
    <section className=" -z-20 pb-0 mb-0" id="hero-section" >
      <MotionParallax speed={0.3} type={1}>
        <div className="flex items-center box-border h-[97vh] bg-cover relative bg-center z-0">
          <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen">
              <Image
                priority={true}
                src="https://res.cloudinary.com/dxdwu31ry/image/upload/f_auto/v1701944384/Ekoseon/Home/header-home_ichsyf.webp"
                alt="Interview"
                fill
                className="object-center object-cover brightness-150"
              />
          </div>
          <ParticlesDiv />
          <div className="absolute box-border background-hero bottom-0 z-0 inset-0 backdrop-brightness-80 h-screen bg-app-900 bg-opacity-50"></div>
          <div className="z-10 text-center text-neutral-content w-full">
            <MotionParallax speed={0.4} type={0} initial={false}>
              <MotionShow threshold={0.6} animation="bounceIn" initial={false}>
                <div className="max-w-3xl mx-auto">
                  <h1 className="mb-5 px-5 md:text-7xl xs:text-6xl text-5xl  font-bold">
                    <small className="text-white flex flex-col gap-y-2">
                      <span className="gap-y-2 text-white">
                        Transformez vos récits personnels en{" "}
                        <AnimatedGradientText>
                          {" "}
                          œuvres intemporelles
                        </AnimatedGradientText>
                      </span>
                    </small>
                  </h1>
                  <GetStartButton />
                </div>
              </MotionShow>
            </MotionParallax>
          </div>
          <div  id="appFirstPage" className="bottom-[2.35rem] absolute" ></div>
        </div>
      </MotionParallax>
    </section>
  );
}
