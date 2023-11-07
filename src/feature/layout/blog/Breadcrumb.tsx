"use client";
import { faCaretRight } from "@fortawesome/pro-duotone-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState, useEffect, Suspense } from "react";
import { Tooltip } from "react-tooltip";

export const BlogBreadCrumb = ({ title } : {title: string}) => {
  const [isMobile, setIsMobile] = useState(false);
  const maxLength = isMobile ? 25 : 100;
  const displayedTitle = title
    ? title.length > maxLength
      ? title.slice(0, maxLength) + "..."
      : title
    : "";

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="sticky top-[4.6rem] w-full z-10 bg-white">
      <div
        className="flex justify-center w-full border-b-[1px] py-2 -mt-8 mb-14"
        aria-label="Breadcrumb">
        <ol className="inline-flex items-center space-x-1 md:space-x-3 text-sm">
          <li className="inline-flex items-center">
            <Link href="/" className="flex flex-row gap-x-2 items-center">
              Accueil
            </Link>
          </li>
          <li>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faCaretRight} className="mr-2" />
              <Link href="/blog">Blog</Link>
            </div>
          </li>
          <li aria-current="page" className="w-full">
            <div className="flex w-full items-center">
              <FontAwesomeIcon icon={faCaretRight} className="mr-1" />
              <div data-tooltip-id="ttTitle" data-tooltip-content={title}>
                <span className="cursor-default ml-1 text-sm font-medium text-gray-500 md:ml-2 dark:text-gray-400">
                  {displayedTitle}
                </span>
                {displayedTitle.length < title.length && (
                  <Tooltip place="bottom" id="ttTitle" className="tooltip" />
                )}
              </div>
            </div>
          </li>
        </ol>
      </div>
    </div>
  );
};
