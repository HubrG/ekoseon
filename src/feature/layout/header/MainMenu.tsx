"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

interface Link {
  url: string;
  name: string;
}

interface MenuProps {
  links: Link[];
}

export default function MainMenu(props: MenuProps) {
  const pathname = usePathname();
  const { links } = props;
  useEffect(() => {
    if (typeof window !== 'undefined' && pathname !== "/") {
      const deleteClassOnNavbar = document.querySelector("#navbar-menu");
      deleteClassOnNavbar?.classList.remove("on-hero");
      deleteClassOnNavbar?.classList.add("on-content");
    } else {
      const deleteClassOnNavbar = document.querySelector("#navbar-menu");
      deleteClassOnNavbar?.classList.remove("on-content");
      deleteClassOnNavbar?.classList.add("on-hero");
    }
  }, [pathname]);
  

  return (
    <div className="main-menu" id="navbar-sticky">
      <ul className="main-menu">
        {links.map((link, index) => (
          <li key={index}>
            <Link
              href={link.url}
              className={`${
                pathname === link.url
                  ? "special-uderline-active"
                  : "text-app-900 special-uderline"
              } nunderline`}>
              {link.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
