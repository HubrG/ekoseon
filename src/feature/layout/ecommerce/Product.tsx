"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Badge } from "@/components/ui/badge";
import { CartProduct } from "@/lib/types/CartProduct";
import Cookies from "js-cookie";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Loader } from "@/components/ui/loader";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import DecimalJS from "decimal.js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightToArc,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/pro-solid-svg-icons";
import {
  faMicrophoneLines,
  faBookUser,
} from "@fortawesome/pro-duotone-svg-icons";
import { useRouter } from "next/navigation";

type ProductProps = {
  product: FetchedProduct;
  products: FetchedProduct[];
  key: string;
};

type FetchedProduct = Omit<
  {
    id: string;
    title: string;
    description: string;
    price: number;
    imageUrl: string | null;
    stock: number;
    categoryId: string;
    display: boolean | null;
    rebate: number | null;
    rebateProgressive: boolean | null;
    rebateProgressiveMaxInPercent: number | null;
  },
  "price"
> & {
  price: number;
  // ajoutez d'autres propriétés ici si nécessaire
};

interface Cart {
  items: CartProduct[];
}

export const Product: React.FC<ProductProps> = ({ product, products, key }) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // Initialisation des états
  const [qte, setQte] = useState<number>(1);
  const [microChecked, setMicroChecked] = useState<Boolean>(false);
  const [bioChecked, setBioChecked] = useState<Boolean>(false);
  const [microCost, setMicroCost] = useState(new DecimalJS(0));
  const [bioCost, setBioCost] = useState(new DecimalJS(0));
  const [bioCostDisplay, setBioCostDisplay] = useState(new DecimalJS(0));
  const [rebatePercentageDisplay, setRebatePercentageDisplay] =
    useState<number>(0);

  // Recherche des produits avec les titres spécifiques
  const productWithBio = products.find(
    (product) => product.title === "Biographie"
  );
  const productWithMicro = products.find(
    (product) => product.title === "Microphone"
  );

  // Gestion des effets lors des mises à jour d'états
  useEffect(() => {
    if (productWithBio) {
      let bioPriceForQte = new DecimalJS(productWithBio.price).mul(qte);
      let totalBioPrice = bioPriceForQte;
      let rebatePercentage = 0;
      if (
        qte > 1 &&
        productWithBio &&
        productWithBio.rebate &&
        productWithBio.rebateProgressiveMaxInPercent
      ) {
        rebatePercentage = Math.min(
          productWithBio.rebate * qte,
          productWithBio.rebateProgressiveMaxInPercent
        );
        totalBioPrice = totalBioPrice.mul(
          new DecimalJS(1).minus(new DecimalJS(rebatePercentage).div(100))
        );
      }
      setRebatePercentageDisplay(rebatePercentage);
      totalBioPrice = new DecimalJS(totalBioPrice.toFixed(0));
      if (bioChecked) {
        setBioCost(totalBioPrice);
      } else {
        setBioCost(new DecimalJS(0));
      }
      setBioCostDisplay(totalBioPrice);
    }
  }, [qte, productWithBio, bioChecked]);

  // Handlers pour les évènements sur les éléments Micro et Bio
  const handleMicro = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (event.currentTarget instanceof HTMLButtonElement) {
      const state = event.currentTarget.getAttribute("data-state");
      if (productWithMicro) {
        const newMicroCost =
          state === "unchecked"
            ? new DecimalJS(productWithMicro.price)
            : new DecimalJS(0);
        setMicroCost(newMicroCost);
        state === "unchecked" ? setMicroChecked(true) : setMicroChecked(false);
      }
    }
  };

  const handleBio = (event: React.MouseEvent<HTMLButtonElement>) => {
    const state = event.currentTarget.getAttribute("data-state");
    if (productWithBio) {
      if (state === "unchecked") {
        setBioChecked(true);
      } else if (state === "checked") {
        setBioChecked(false);
      }
    }
  };

  // Handlers pour la redirection des clicks
  const handleMicroClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    const switchElem = event.currentTarget.querySelector("#microphone");
    if (switchElem instanceof HTMLElement) {
      switchElem.click();
    }
  };

  const handleBioClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target !== event.currentTarget) {
      return;
    }
    const switchElem = event.currentTarget.querySelector("#biography");
    if (switchElem instanceof HTMLElement) {
      switchElem.click();
    }
  };

  // Gestion de la quantité
  const handleQte = (qte: number) => {
    if (qte <= 1) {
      setQte(1);
    } else {
      setQte(qte);
    }
  };

  // Calcul du prix final
  const finalPrice = new DecimalJS(product.price)
    .mul(qte)
    .plus(microCost)
    .plus(bioCost)
    .toString();

  // Fonction pour formater le temps
  function formatTime(value: number): string {
    const integerPart = Math.floor(value);
    const fractionalPart = value - integerPart;

    if (fractionalPart === 0.5) {
      return `${integerPart}h30`;
    } else {
      return `${integerPart}h00`;
    }
  }

  const addToCart = () => {
    startTransition(() => console.log());
    let cartItems: CartProduct[] = []; // Créez un tableau pour stocker tous les produits

    const mainCartItem: CartProduct = {
      id: product.id,
      name: product.title,
      price:
        parseFloat(finalPrice) -
        parseFloat(microCost.toString()) -
        parseFloat(bioCost.toString()),
      quantity: qte,
      img: product.imageUrl ?? undefined,
      description: product.description,
      products: [],
    };
    cartItems.push(mainCartItem);

    if (microChecked && productWithMicro) {
      const microCartItem: CartProduct = {
        id: productWithMicro.id,
        name: productWithMicro.title,
        price: parseFloat(microCost.toString()),
        quantity: 1,
        img: productWithMicro.imageUrl ?? undefined,
        description: productWithMicro.description,
        products: [],
      };
      cartItems.push(microCartItem);
    }

    if (bioChecked && productWithBio) {
      const bioCartItem: CartProduct = {
        id: productWithBio.id,
        name: productWithBio.title,
        price: parseFloat(bioCost.toString()),
        quantity: 1,
        img: productWithBio.imageUrl ?? undefined,
        description: productWithBio.description,
        products: [],
      };
      cartItems.push(bioCartItem);
    }

    // Remplace l'objet "items" du localStorage par le nouvel objet
    let cart: Cart = { items: cartItems };

    Cookies.set("cart", JSON.stringify(cart));
    router.push("/achat/validation");
  };
  // Schema
  const Schema = {
    "@context": "http://schema.org/",
    "@type": "Product",
    name: product.title,
    image: [product.imageUrl],
    description: product.description,
    sku: product.id,
    brand: {
      "@type": "Brand",
      name: process.env.NEXT_PUBLIC_APP_NAME,
    },
    offers: {
      "@type": "Offer",
      url: process.env.NEXT_PUBLIC_RELATIVE_URI,
      priceCurrency: "EUR",
      price: product.price,
      priceValidUntil: "2024-11-05",
      itemCondition: "http://schema.org/NewCondition",
      availability: "http://schema.org/InStock",
      seller: {
        "@type": "Organization",
        name: process.env.NEXT_PUBLIC_APP_NAME,
      },
    },
  };
  return (
    <>
      {product.title === "Entretien audio" && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(Schema) }}
        />
      )}
      <Card>
        <CardHeader className="bg-app-100/50 text-center rounded-xl mb-10 rounded-b-none shadow shadow-app-200">
          <CardTitle className="py-0 my-0 px-0 mx-0">
            <div className="flex flex-row justify-center  gap-x-2  pt-0 items-center">
              <Button
                aria-label="Réduire d'une unité de quantité"
                variant="ghost"
                className={` rounded-full  md:h-20 h-14 w-2/12 ${
                  qte === 1 ? "opacity-50 cursor-default" : null
                } bg-app-50/50`}
                onClick={() => handleQte(qte - 0.5)}>
                <FontAwesomeIcon icon={faMinusCircle} />
              </Button>
              <div className="w-full flex flex-col">
                {" "}
                <span className="md:text-4xl text-2xl">
                  {formatTime(qte)}
                </span>{" "}
                d&apos;entretien
              </div>
              <Button
                aria-label="Ajouter d'une unité de quantité"
                variant="ghost"
                onClick={() => handleQte(qte + 0.5)}
                className="w-2/12 md:h-20 h-14 rounded-full  bg-app-50/50">
                <FontAwesomeIcon icon={faPlusCircle} />
              </Button>
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex md:flex-row flex-col gap-y-2 gap-x-2  ">
            <div
              onClick={handleBioClick}
              className={`product-alt ${
                bioChecked
                  ? "border border-app-500 bg-app-200/50"
                  : "border border-transparent"
              }`}>
              <Switch
                id={`${key}-biography`}
                aria-label="Ajouter une biographie"
                onClick={handleBio}
                className="absolute bottom-5"
              />
              <Label
                htmlFor={`${key}-biography`}
                className="text-center  select-none cursor-pointer  flex flex-col gap-y-5 ">
                <FontAwesomeIcon
                  icon={faBookUser}
                  className="md:text-7xl text-4xl  text-app-900"
                />
                <span className="font-semibold">
                  Je souhaite faire écrire une jolie biographie à partir de cet
                  enregistrement.
                </span>
                <Badge
                  className={`${
                    bioChecked
                      ? "hover:bg-app-600  bg-app-600"
                      : "hover:bg-app-500  bg-app-500"
                  } rounded-lg rounded-tl-none rounded-br-none absolute text-base right-0 top-0 flex flex-col `}>
                  <span className="text-base">
                    +
                    {productWithBio?.price
                      ? new DecimalJS(bioCostDisplay).toFixed(0)
                      : "0"}
                    €
                  </span>
                  {rebatePercentageDisplay > 0 && (
                    <div className="-mt-2">
                      <small className="opacity-70">
                        {" "}
                        -{rebatePercentageDisplay.toFixed(2)}%
                      </small>
                    </div>
                  )}
                </Badge>
              </Label>
            </div>
            <div
              onClick={handleMicroClick}
              className={`product-alt ${
                microChecked
                  ? "border border-app-500  bg-app-200/50"
                  : "border border-transparent"
              }`}>
              <Switch
                id={`${key}-microphone`}
                aria-label="Ajouter un micro"
                onClick={handleMicro}
                className="absolute bottom-5"
              />
              <Label
                htmlFor={`${key}-microphone`}
                className="text-center select-none cursor-pointer flex flex-col gap-y-5">
                <FontAwesomeIcon
                  icon={faMicrophoneLines}
                  className=" md:text-7xl text-4xl text-app-900"
                />
                {/* {productWithMicro?.price} */}
                <span className="font-semibold">
                  J&apos;ai besoin d&apos;un meilleur microphone pour assurer la
                  qualité de l&apos;enregistrement.
                </span>
                <Badge
                  className={`${
                    microChecked
                      ? "hover:bg-app-600  bg-app-600"
                      : "hover:bg-app-500  bg-app-500"
                  } rounded-lg rounded-tl-none rounded-br-none absolute text-base right-0 top-0 flex flex-col `}>
                  <span>
                    {" "}
                    +
                    {productWithMicro?.price
                      ? new DecimalJS(productWithMicro.price).toFixed(0)
                      : "0"}
                    €
                  </span>
                </Badge>
              </Label>
            </div>
          </div>
        </CardContent>
        <CardContent></CardContent>
        <CardContent className="text-center">
          <Separator className="-mt-2 h-1 rounded-full" />
          <div className="product-price">{finalPrice}€</div>
          {/* <Separator className=" h-1 rounded-full" /> */}
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            aria-label="Procéder au paiement"
            className={`-mt-5 ${
              isPending ? "disabled opacity-50 cursor-default" : null
            } w-full`}
            onClick={addToCart}>
            C&apos;est parti !
            {isPending ? (
              <Loader className="ml-2 h-4 w-4" />
            ) : (
              <FontAwesomeIcon
                className="ml-2 h-4 w-4"
                icon={faArrowRightToArc}
              />
            )}
          </Button>
        </CardFooter>
      </Card>
    </>
  );
};
