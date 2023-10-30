"use client";
import { motion } from "framer-motion";
import { FC, ReactNode } from "react";

interface MotionPageProps {
  children: ReactNode;
  type?: number;
  duration?:number;
}

const PageTransition: FC<MotionPageProps> = ({ children, type = 0, duration = 0.4 }) => {
  const commonProps = {
    initial: { opacity: 0 },
    exit: { opacity: 0 },
    transition: { duration: duration },
  };

  const blurProps = {
    ...commonProps,
    animate: { opacity: 1, filter: 'blur(0px)' },
    initial: { ...commonProps.initial, filter: 'blur(1px)' },
  };

  const opacityProps = {
    ...commonProps,
    animate: { opacity: 1 },
  };

  return (
    <motion.div {...(type === 0 ? blurProps : opacityProps)}>
      {children}
    </motion.div>
  );
};

export default PageTransition;