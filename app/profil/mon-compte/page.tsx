import React, { Suspense } from "react";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { getAuthSession } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import LoginPage from "@/src/feature/layout/auth/AuthForm";
import { Skeleton } from "@/components/ui/skeleton";
import { UserAccount } from "../../../src/feature/layout/profil/account/UserAccount";
import { User } from "@prisma/client";
import { getUserLog } from "@/src/query/user.query";

export const metadata: Metadata = {
  title: Meta("title", "Mon compte"),
};

export default async function MyAccount() {
  const userLog = (await getUserLog()) as User;
  if (!userLog) {
    return (
      <div className="content max-w-lg">
        <h1 className="text-center">Veuillez vous connecter</h1>
        <Card>
          <Suspense fallback={<Skeleton />}>
            <LoginPage />
          </Suspense>
        </Card>
      </div>
    );
  }
  return (
    <>
      <div className="content mx-auto">
        <h1 className="text-center">Mon compte</h1>
        <div className="mx-auto flex justify-center">
          <Suspense fallback={<Skeleton />}>
            <UserAccount sessionUser={userLog} />
          </Suspense>
          </div>
      </div>
    </>
  );
}
