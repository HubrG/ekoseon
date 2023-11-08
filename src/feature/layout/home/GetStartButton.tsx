"use client";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/pro-duotone-svg-icons";
import { Button } from "@/components/ui/button";

export const GetStartButton = () => {
  const [isBounce, setIsBounce] = useState<Boolean>(false);
  const [isMounted, setIsMounted] = useState(false);

  //
  const handleScrollButton = 
     (anchorId: string) => (e: React.MouseEvent<HTMLButtonElement>) => {
     
      e.preventDefault();
      const elem = document.getElementById(anchorId);
      if (elem) {
        setTimeout(() => {
          elem.scrollIntoView({ behavior: "smooth" });
        }, 300); // Retarde l'appel de 300 millisecondes
      }
    };
	useEffect(() => {
		setIsMounted(true);
	}, []);

 
	
  return isMounted ? (
    <>
      <Button
        onMouseEnter={() => setIsBounce(true)}
        onMouseLeave={() => setIsBounce(false)}
        onClick={handleScrollButton("appFirstPage")}
        size="lg"
        variant="link"
        className="getStartedButton text-white">
        C&apos;est-à-dire
        <FontAwesomeIcon
          className="text-white"
          size="sm"
          icon={faQuestion}
          {...(isBounce ? { bounce: true } : { beatFade: true })}
        />
      </Button>
    </>
  ) : (
    <>
    <div className="flex justify-center mx-auto">
      <a href="#appFirstPage" className="inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 shadcnButton-link h-10 rounded-md px-8 text-base  getStartedButton">
       C&apos;est-à-dire ?
      </a>
      </div>
    </>
  );
};

export default GetStartButton;
