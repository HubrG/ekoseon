"use client";

import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faQuestion } from "@fortawesome/pro-duotone-svg-icons";
import { Button } from "@/components/ui/button";

export const GetStartButton = () => {
  const [isBounce, setIsBounce] = useState<Boolean>(false);

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
  return (
	<Button
	  onMouseEnter={() => setIsBounce(true)}
	  onMouseLeave={() => setIsBounce(false)}
	  onClick={handleScrollButton("ekoseon")}
	  size="lg"
	  variant="link"
	  className="mx-auto flex flex-row hover:no-underline gap-x-5 items-center mt-10 md:text-3xl text-2xl font-display py-8 justify-center   gap-y-1 hover:bg-opacity-60 border border-fuchsia-100  hover:border-fuchsia-800 hover:border-solid hover:bg-fuchsia-900  text-white hover:text-fuchsia-100  bg-opacity-80">
	  C&apos;est-à-dire
		  <FontAwesomeIcon
			  size="sm"
		icon={faQuestion}
		{...(isBounce ? { bounce: true } : { beatFade: true })}
	  />
	</Button>
  );
}; 

export default GetStartButton
