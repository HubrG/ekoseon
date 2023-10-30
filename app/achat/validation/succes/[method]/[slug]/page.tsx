import PageTransition from "@/src/feature/layout/effects/PageTransition";
import { Meta } from "@/src/feature/layout/metadata/Metadata";
import { Metadata } from "next";
import { SubscriptionCreateOrder } from "@/src/feature/layout/ecommerce/validation/success/SubscriptionCreateOrder";
import { ToastDisplayOnSSR } from "@/src/feature/layout/toastify/ToastDisplayOnSSR";
import { LottieDisplayOnSSR } from "@/src/feature/layout/lottie/LottieDisplayOnSSR";
import { getOrder } from "@/src/query/order.query";
import { redirect } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/pro-solid-svg-icons";
import { Separator } from "@/components/ui/separator";

export const metadata: Metadata = {
  title: Meta("title", "Merci !"),
  description: "Ekoseon",
};

export default async function Success({
  params,
}: {
  params: { method: string; slug: string };
}) {
  // Lottie

  const method = params.method;
  // new Promise((resolve) => setTimeout(resolve, ms));

  let subValidation;
  let order;
  if (method == "sub") {
    subValidation = await SubscriptionCreateOrder(params.slug);
    order = await getOrder(subValidation?.orderId);
    if (order) {
      redirect("/achat/validation/succes/commande/" + subValidation?.orderId);
    } else if (subValidation.type == "warning") {
      redirect("/achat/validation/error/commande-payee-mais-non-creee");
    }
  } else if (method == "commande") {
    order = await getOrder(params.slug);
  } else {
    order = await getOrder(params.slug);
  }
  //
  return (
    <>
      <PageTransition>
        <div className="content  items-center justify-center flex flex-col max-w-lg">
          {!order && (
            <>
              <h1>La commande demandée n&apos;existe pas.</h1>
            </>
          )}
          {!order && subValidation && (
            <>
              <h1>
                {subValidation?.type && (
                  <ToastDisplayOnSSR
                    type={subValidation.type}
                    value={subValidation.value}
                    autoClose={subValidation.autoClose}
                  />
                )}
              </h1>
            </>
          )}
          {order && (
            <>
              <Card>
                <CardHeader className="bg-app-100/50 text-center rounded-xl mb-10 rounded-b-none shadow shadow-app-200">
                  <CardTitle>
                    <div className="w-1/5 flex justify-center mx-auto">
                      <LottieDisplayOnSSR animation="validation" />
                    </div>
                    Merci pour votre commande !
                  </CardTitle>
                  <CardDescription>
                    <small>ref</small>. #{order.orderRef}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <p>
                    Retrouvez toutes les informations concernant votre commande
                    dans votre <Link href="/profil">espace client</Link>.
                  </p>
                  <h3>Ensuite ?</h3>
                  <p>
                    Nous vous contacterons dans les 24 prochaines heures
                    (ouvrées) pour discuter de votre projet et prendre
                    rendez-vous pour sa réalisation.
                  </p>
                </CardContent>
                <CardFooter>
                  <div>
                    <Separator />
                    <p className="text-sm flex flex-row  items-baseline gap-x-5 text-left mt-10">
                      <FontAwesomeIcon icon={faInfoCircle} />
                      Si vous avez la moindre question d&apos;ici là,
                      n&apos;hésitez pas à nous contacter au 06.12.75.82.61
                    </p>
                  </div>
                </CardFooter>
              </Card>
            </>
          )}
        </div>
      </PageTransition>
    </>
  );
}
