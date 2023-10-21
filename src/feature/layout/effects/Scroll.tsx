"use client";
import { motion, useTransform, useViewportScroll } from "framer-motion";
import React from "react";

interface MotionScrollProps {
  children: React.ReactNode;
  initialScale?: number;
  finalScale?: number;
  ratio?: number;
}

const MotionScroll: React.FC<MotionScrollProps> = ({
  children,
  initialScale = 0.2,
  finalScale = 2,
  ratio = 0.33,
}) => {
  const { scrollYProgress } = useViewportScroll();
  // Ajustez les valeurs ici pour que l'échelle soit de 1 à un tiers du défilement
  const scale = useTransform(
    scrollYProgress,
    [0, ratio, 1],
    [initialScale, 1, finalScale]
  );

  return <motion.div style={{ scale }}>{children}</motion.div>;
};

export default MotionScroll;
