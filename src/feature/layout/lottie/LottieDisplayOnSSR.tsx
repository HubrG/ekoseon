"use client";
import Lottie from "lottie-react";
import animationValidation from "./lottie-validation.json";
import animation404 from "./lottie-404.json";

type Lottie = {
  autoplay?: boolean;
  animation: string;
  loop?: boolean;
};

export const LottieDisplayOnSSR = ({ animation, autoplay = true, loop = false }: Lottie) => {
  let illustration;
  if (animation === "validation") {
    illustration = animationValidation;
  }
  if (animation === "404") {
    illustration = animation404;
  }


  return (
    <Lottie
      loop={loop}
      autoplay={autoplay}
      animationData={illustration}
      style={{ width: "100%", height: "100%" }}
      rendererSettings={{
        preserveAspectRatio: "xMidYMid slice",
      }}
    />
  );
};
