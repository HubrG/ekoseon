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
        Comment faire
        <FontAwesomeIcon
          className="text-white italic"
          size="sm"
          icon={faQuestion}
          {...(isBounce ? { bounce: true } : { beatFade: true })}
        />
      </Button>
    </>
  ) : (
    <>
    <div className="flex justify-center mx-auto">
      <a href="#appFirstPage" className="  getStartedButton">
       Comment ça ?!
      </a>
      </div>
    </>
  );
};

export default GetStartButton;
