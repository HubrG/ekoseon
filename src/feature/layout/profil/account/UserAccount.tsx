import { User } from "@prisma/client";
import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/pro-solid-svg-icons";
import { Separator } from "@/components/ui/separator";
import { UpdatePassword } from "./UpdatePassword";

interface AccountProps {
  sessionUser: User;
}

export const UserAccount = ({ sessionUser }: AccountProps) => {
  return (
    <Card>
      <CardHeader className="shadcnCard-header">
        <CardTitle className="shadcnCard-title">
          <FontAwesomeIcon icon={faUser} />
        </CardTitle>
        <CardDescription className="shadcnCard-description h-auto font-bold">
          <span className="text-2xl -mt-5">{sessionUser.name}</span>
        </CardDescription>
      </CardHeader>
      <CardContent className="text-base">
        <div className="grid grid-cols-2">
          <div className="font-bold">Adresse email :</div>
          <div>{sessionUser.email}</div>
        </div>
        <div className="grid grid-cols-2">
          <div className="font-bold">Identifiant unique : </div>
          <div>{sessionUser.id}</div>
        </div>
        <Separator className="my-5" />
        <div className="grid grid-cols-1">
         <UpdatePassword id={sessionUser.id} />
        </div>
      </CardContent>
      <CardFooter className="flex justify-between py-0 my-0"></CardFooter>
    </Card>
  );
};
