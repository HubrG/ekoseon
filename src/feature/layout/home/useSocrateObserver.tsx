"use client";
import { useEffect } from "react";

export const useSocrateObserver = () => {
  useEffect(() => {
    const socrate = document.querySelector("#socrate");
    const observer = new IntersectionObserver(
      (entries) => {
        if (socrate) {
          const isSocrateVisible = entries.some(
            (entry) =>
              entry.target.id === socrate.id && entry.isIntersecting
          );

          if (isSocrateVisible) {
            console.log("socrate");
            document.getElementsByTagName("body")[0].classList.add("blur-all-for-socrate");
          } else {
            document.getElementsByTagName("body")[0].classList.remove("blur-all-for-socrate");
          }
        }
      },
      { threshold: 1 }
    );

    const heroSection = document.getElementById("socrate");

    if (heroSection) observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };



    
  }, []);
};
