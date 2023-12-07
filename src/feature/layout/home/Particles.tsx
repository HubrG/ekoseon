"use client";
import { useCallback } from "react";
import type { Container, Engine } from "tsparticles-engine";
import Particles from "react-particles";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.
import { loadSlim } from "tsparticles-slim"; // if you are going to use `loadSlim`, install the "tsparticles-slim" package too.

export const ParticlesDiv = () => {
  const particlesInit = useCallback(async (engine: Engine) => {

    // you can initialize the tsParticles instance (engine) here, adding custom shapes or presets
    // this loads the tsparticles package bundle, it's the easiest method for getting everything ready
    // starting from v2 you can add only the features you need reducing the bundle size
    //await loadFull(engine);
    await loadSlim(engine);
  }, []);

  const particlesLoaded = useCallback(
    async (container: Container | undefined) => {
      console.log(container);
    },
    []
  );
  return (
    <Particles
      id="tsparticles"
      className="h-full"
      init={particlesInit}
      loaded={particlesLoaded}
      options={{
        fpsLimit: 50,
        interactivity: {
          events: {
            onClick: {
              enable: true,
              mode: "push",
            },
            // onHover: {
            //     enable: true,
            //     mode: "",
            // },
            resize: false,
          },
          modes: {
            push: {
              quantity: 10,
            },
            repulse: {
              distance: 800,
              duration: 1,
            },
          },
        },
        particles: {
          color: {
            value: "#ffffff",
          },
          // links: {
          //     color: "#ffffff",
          //     distance: 150,
          //     enable: true,
          //     opacity: 0.5,
          //     width: 1,
          // },
          move: {
            direction: "none",
            enable: true,
            outModes: {
              default: "bounce",
            },
            random: false,
            speed: 0.7,
            straight: false,
          },
          number: {
            density: {
              enable: true,
              area: 500,
            },
            value: 80,
          },
          opacity: {
            value: 0.5,
          },
          shape: {
            type: "circle",
            // character: {
            //   fill: true,
            //   style: "",
            //   font:"Times New Roman",
            //   value: [ "!", "...", "?", "∞", "-", ".", ";", "…", "“ ”", "‘"],
            //   weight: "400",
              
            // },
          },
          size: {
            value: { min: 1, max: 4 },
          },
        },
        detectRetina: true,
      }}
    />
  );
};
