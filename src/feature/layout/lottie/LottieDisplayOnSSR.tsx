"use client";
import Lottie from 'lottie-react';
import animationValidation from './lottie-validation.json';
import animationAchat from './lottie-achat.json';

export const LottieDisplayOnSSR = (animationD:{animation:string}) => {
 const animation = animationD.animation
  return (
    <Lottie 
      loop={false}
      autoplay={true}
      animationData={
        animation === "validation" ? animationValidation : animation === "achat" ? animationAchat : null}
      style={{ width: '100%', height: '100%' }}
      rendererSettings={{
        preserveAspectRatio: 'xMidYMid slice',
      }}
    />
  );
}
