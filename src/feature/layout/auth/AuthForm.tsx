"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signIn } from "next-auth/react";
import React, { useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import { faSpinner,faArrowRightToArc  } from "@fortawesome/pro-duotone-svg-icons";
import { 
  CardContent,
  CardFooter,
  CardHeader } from "@/components/ui/card";

const LoginPage = () => {
  

  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const email = useRef("");
  const pass = useRef("");

  const onSubmit = async () => {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 3000);
    const result = await signIn("credentials", {
      email: email.current,
      password: pass.current,
      redirect: true,
      callbackUrl: "/",
    });
  };

  const onGithubSignIn = async () => {
    // Ajouté async
    setIsLoading(true); // Définir isLoading à true avant de signer
    await signIn("github", { callbackUrl: '/' }); // Attendre la fin de la signature
    setIsLoading(false); // Définir isLoading à false après la signature
  };

  return (
   <>
  <CardHeader className="no-card-header"></CardHeader>
      <CardContent className="grid gap-4">

        <Input
          onChange={(e) => (email.current = e.target.value)}
          placeholder="Adresse email"
        />
        <Input
          placeholder="Mot de passe"
          type={"password"}
          onChange={(e) => (pass.current = e.target.value)}
        />
        <Button  onClick={onSubmit} disabled={isLoading}>
          {isLoading && (
            <FontAwesomeIcon
              icon={faSpinner}
              className="mr-2 h-4 w-4 animate-spin"
            />
          )}
          Connexion
        </Button>
      <div className="relative mt-2">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-app-500" />
        </div>
        <div className="relative flex justify-center  text-xs uppercase">
          <span className="bg-app-50 text-app-900 dark:text-app-500 dark:bg-slate-900 px-2">
            Ou
          </span>
        </div>
      </div>
      </CardContent>
      <CardFooter>
      <Button
        variant="ghost"
        onClick={onGithubSignIn}
        className="w-full mt-1"
        type="button"
        disabled={isLoading}>
        {isLoading ? (
          <FontAwesomeIcon
            icon={faSpinner}
            className="mr-2 h-4 w-4 animate-spin"
          />
        ) : (
          <FontAwesomeIcon icon={faGoogle} className="mr-2 h-4 w-4" />
        )}{" "}
        Connexion avec Google
      </Button>
      </CardFooter>
</>
  );
};

export default LoginPage;
