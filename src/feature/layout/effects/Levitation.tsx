"use client";
import React, { useState, useLayoutEffect, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";

interface LevitatingWrapperProps {
  children: React.ReactNode;
  duration?: number;
  amp?: number;
  className?: string;
}

const MotionLevitation: React.FC<LevitatingWrapperProps> = ({
  children,
  duration = 5, // Durée en secondes
  amp = 10, // Amplitude
  className,
}) => {
  const controls = useAnimation();
  const [initialPhase, setInitialPhase] = useState(Math.random() * 2 * Math.PI);

  useEffect(() => {
    setInitialPhase(Math.random() * 2 * Math.PI);
  }, []);

  useLayoutEffect(() => {
    let intervalId: number;
    let time = 0; // Compteur de temps

    const updatePosition = () => {
      const t = (time / duration) * 2 * Math.PI; // Normalisation du temps sur la durée
      const x = Math.sin(t + initialPhase) * amp;
      const y = Math.cos(t + initialPhase) * amp;
      controls.set({ x, y });

      time += 0.05; // Incrémente le temps à un rythme contrôlé
      if (time > duration) time = 0; // Réinitialise le temps pour un cycle continu
    };

    intervalId = window.setInterval(updatePosition, 50); // Met à jour toutes les 50ms

    return () => {
      clearInterval(intervalId);
    };
  }, [controls, duration, amp, initialPhase]);

  return <motion.div className={className} animate={controls}>{children}</motion.div>;
};

export default MotionLevitation;
