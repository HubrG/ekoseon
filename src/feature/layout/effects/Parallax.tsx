"use client";
import React, { useState, useEffect, useMemo } from "react";
import { motion } from "framer-motion";

type ParallaxProps = {
  children: React.ReactNode;
  speed?: number;
  type?: 0 | 1 | 2 | 3 | 4;
};

const Parallax: React.FC<ParallaxProps> = ({ children, speed = 0.2, type = 0 }) => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const transformValue = useMemo(() => {
    switch (type) {
      case 0: // Parallaxe verticale vers le haut
        return { y: -scrollY * speed };
      case 1: // Parallaxe verticale vers le bas
        return { y: scrollY * speed };
      case 2: // Parallaxe horizontale vers la gauche
        return { x: -scrollY * speed };
      case 3: // Parallaxe horizontale vers la droite
        return { x: scrollY * speed };
      case 4: // Parallaxe diagonale
        return { x: scrollY * speed, y: scrollY * speed };
      default:
        return { y: -scrollY * speed };
    }
  }, [scrollY, speed, type]);  // Les dépendances indiquent quand recalcule la valeur

  return (
    <motion.div
      style={transformValue}
    >
      {children}
    </motion.div>
  );
};

export default Parallax;
