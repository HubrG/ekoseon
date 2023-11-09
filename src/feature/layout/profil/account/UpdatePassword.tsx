"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { DialogClose } from "@radix-ui/react-dialog";
import { Loader } from "@/components/ui/loader";
import { updatePwd } from "../utils.server";
import { Toastify } from "../../toastify/Toastify";

export const UpdatePassword = ({ id }: { id: string }) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleClickPwd = async () => {
    const infos = {
      id: id,
      newPassword: password,
      newPasswordConfirm: passwordConfirm,
    };
    setIsLoading(true);
    const update = await updatePwd(infos);
    if (update) {
      Toastify({
        value:
          "Votre mot de passe a bien été modifié",
        type: "success",
      }); 
      const closeButton = document.querySelector(".closeDialogPwdUpdate");
      if (closeButton !== null) {
        (document.querySelector('.closeDialogPwdUpdate') as HTMLElement)?.click();
      }
    } else {
      Toastify({ value: "Une erreur est survenue : " + update, type: "error" }); 
    }
    setIsLoading(false);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="py-2 h-auto font-semibold">
          Modifier mon mot de passe
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="text-center">
            Modification de votre mot de passe
          </DialogTitle>
          <DialogDescription className="text-center pt-0 bg-app-50 p-2 rounded-lg text-app-500">
            Veuillez remplir les champs ci-dessous afin de modifier votre mot de
            passe.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-0">
          <div className="flex flex-col  items-center gap-2">
            <Input
              type="password"
              onKeyUp={(e) => {
                if (e.key === "Enter") handleClickPwd();
              }}
              onChange={(e) => setPassword(e.currentTarget.value)}
              placeholder="Nouveau mot de passe"
              className="col-span-3"
            />
          </div>
          <div className="flex flex-col  items-center gap-2">
            <Input
              type="password"
              onKeyUp={(e) => {
                if (e.key === "Enter") handleClickPwd();
              }}
              onChange={(e) => setPasswordConfirm(e.currentTarget.value)}
              placeholder="Confirmer votre nouveau mot de passe"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button
            type="button"
            disabled={
              !password ||
              !passwordConfirm ||
              passwordConfirm != password ||
              isLoading
            }
            onClick={handleClickPwd}>
            {isLoading && <Loader className="mr-2" />} Modifier mon mot de passe
          </Button>
          <DialogClose asChild>
            <Button
              type="button"
              className="hidden closeDialogPwdUpdate"
              variant="secondary">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
