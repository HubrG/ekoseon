"use client";
import React, { useState, useEffect, useTransition } from "react";
import { Product as PrismaProduct } from "@prisma/client";
import { Badge } from "@/components/ui/badge";
import { CartProduct } from "@/lib/types/CartProduct";
import Cookies from "js-cookie";
import {
  Card,
  CardContent,
  CardDescription,
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
  faBookSparkles,
  faArrowRightToArc,
  faMicrophoneStand,
  faMinusCircle,
  faPlusCircle,
} from "@fortawesome/pro-solid-svg-icons";
import { useRouter } from "next/navigation";

type ProductProps = {
  product: FetchedProduct;
  products: FetchedProduct[];
  key:string
};

type FetchedProduct = Omit<PrismaProduct, "price"> & {
  price: string;
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
      if (qte > 1) {
        rebatePercentage = Math.min(5 * qte, 30);
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
      cartItems.push(microCartItem); // Ajoutez directement au tableau cartItems
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
      cartItems.push(bioCartItem); // Ajoutez directement au tableau cartItems
    }

    // Remplacer l'objet "items" du localStorage par le nouvel objet
    let cart: Cart = { items: cartItems };

    Cookies.set("cart", JSON.stringify(cart));
    router.push("/achat/validation");
  };

  return (
    <Card>
      <CardHeader className="bg-app-100/50 text-center rounded-xl mb-10 rounded-b-none shadow shadow-app-200">
        <CardTitle>
          <span className="text-4xl">{formatTime(qte)}</span> d&apos;interview
        </CardTitle>
        {/* <CardDescription>{product.description}</CardDescription> */}
        <CardDescription>{product.description}</CardDescription>
        <div className="grid grid-cols-2 gap-x-5  pt-3">
          <Button
            aria-label="Réduire d'une unité de quantité"
            variant="outline"
            className={`${
              qte === 1 ? "opacity-50 cursor-default" : null
            } bg-app-50/50`}
            onClick={() => handleQte(qte - 0.5)}>
            <FontAwesomeIcon icon={faMinusCircle} />
          </Button>
          <Button
            aria-label="Ajouter d'une unité de quantité"
            variant="outline"
            onClick={() => handleQte(qte + 0.5)}
            className=" bg-app-50/50">
            <FontAwesomeIcon icon={faPlusCircle} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex md:flex-row flex-col gap-y-2 gap-x-2  ">
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
                icon={faMicrophoneStand}
                className=" md:text-7xl text-4xl text-app-900"
              />
              {/* {productWithMicro?.price} */}
              J&apos;ai besoin d&apos;un meilleur microphone pour assurer la
              qualité de l&apos;enregistrement.
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
                icon={faBookSparkles}
                className="md:text-7xl text-4xl  text-app-900"
              />
              Je souhaite faire écrire une jolie biographie à partir de cet
              enregistrement.
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

                    {/* <span
                      style={{
                        textDecoration: "line-through",
                        marginLeft: "8px",
                        marginRight: "8px",
                      }}>
                      {originalBioPrice.toFixed(0)}€
                    </span> */}
                  </div>
                )}
              </Badge>
            </Label>
          </div>
        </div>
      </CardContent>
      <CardContent></CardContent>
      <CardContent className="text-center">
        <div className="product-price">{finalPrice}€</div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button
          aria-label="Procéder au paiement"
          className={`${
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
  );
};
