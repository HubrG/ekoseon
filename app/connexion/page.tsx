import LoginPage from "@/src/feature/layout/auth/AuthForm";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React, { Suspense } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Card
} from "@/components/ui/card";
import { faArrowRightToArc } from "@fortawesome/pro-duotone-svg-icons";
import Skeleton from "@/src/feature/layout/skeleton/Content";

const Auth = async () => {
  const session = await getAuthSession();
  if (session) {
    redirect("/");
  }

  return (
    <section>
      <div className="content  max-w-lg">
        <h1 className="title-page">
          <FontAwesomeIcon icon={faArrowRightToArc} /> Connexion sur Ekoseon
        </h1>
        <Card>
          <Suspense fallback={<Skeleton />}>
            <LoginPage />
          </Suspense>
        </Card>
      </div>
    </section>
  );
};

export default Auth;
