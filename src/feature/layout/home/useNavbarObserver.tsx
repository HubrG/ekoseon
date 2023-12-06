"use client";
import { useEffect } from "react";

export const useNavbarObserver = () => {
  useEffect(() => {
    const navbar = document.querySelector("#navbar-menu");
    const DropdownUser = document.querySelector(".user-profile");
    const observer = new IntersectionObserver(
      (entries) => {
        if (navbar) {
          const isHeroVisible = entries.some(
            (entry) =>
              entry.target.id === "hero-section" && entry.isIntersecting
          );

          if (isHeroVisible) {
            navbar.classList.add("on-hero");
            navbar.classList.remove("opacity-0");
            navbar.classList.remove("on-content");
            DropdownUser?.classList.add("on-hero");
          } else {
            navbar.classList.add("on-content");
            navbar.classList.remove("opacity-0");
            navbar.classList.remove("on-hero");
            DropdownUser?.classList.remove("on-hero");
          }
        }
      },
      { threshold: 0 }
    );

    const heroSection = document.getElementById("hero-section");

    if (heroSection) observer.observe(heroSection);

    return () => {
      if (heroSection) observer.unobserve(heroSection);
    };
  }, []);
};
