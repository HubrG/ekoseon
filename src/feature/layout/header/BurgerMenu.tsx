"use client";
import { Button } from "@/components/ui/button";
import { faBars } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

interface Link {
  url: string;
  name: string;
}

interface MenuProps {
  links: Link[];
}

export default function BurgerMenu(props:MenuProps) {
  const pathname = usePathname();
  const { links } = props;
  const [display, setDisplay] = useState(false);
  return (
    <>
    <Button
      variant="ghost"
        onClick={() => { display ? setDisplay(false) : setDisplay(true) }}
      type="button"
      size="sm"
      className="inline-flex sm:hidden"
      >
      <span className="sr-only">Ouvrir le menu principal</span>
      <FontAwesomeIcon icon={faBars} />
    </Button>
    <div className={`${display? "hidden sm:absolute" : "hidden"} burger-menu`}>
    <ul>
    {links.map((link, index) => (
          <li key={index}>
            <Link
             onClick={() => { setDisplay(false) }}
              href={link.url}
              className={`${
                pathname === link.url
                  ? "burger-active"
                  : "text-app-900"
              } nunderline`}>
              {link.name}
            </Link>
          </li>
        ))}
        </ul>
      </div>
    </>
  );
}
