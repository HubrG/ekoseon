"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import {
  isEmailExists,
  hashPassword,
} from "@/src/feature/layout/ecommerce/validation/utils.server";
import validator from "validator";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LocationSearchInput from "@/src/feature/layout/ecommerce/validation/LocationSearchInput";
import { Checkbox } from "@/components/ui/checkbox";
import Script from "next/script";
import Cookies from 'js-cookie';

interface CustomerInfoForm {
  setValidity: React.Dispatch<React.SetStateAction<boolean>>;
}

interface CustomerInfo {
  firstname: string;
  name: string;
  email: string;
  hashedPassword?: string;
  emailExist?: boolean;
  phone: string;
  address: string;
  addressComp: string;
  addressBilling: string;
  addressBillingComp: string;
  isShippingChecked: boolean;
}


const CustomerInfoForm: React.FC<CustomerInfoForm> = ({ setValidity }) => {

  const storedCustomerInfo: string | undefined = Cookies.get("customerInfo");

  let customerInfo: CustomerInfo | null = null;
  
  if (storedCustomerInfo) {
    customerInfo = JSON.parse(storedCustomerInfo);
  }
  

  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);
  //
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordCrypt, setPasswordCrypt] = useState<string>("");
  // Checks
  const [isShippingChecked, setIsShippingChecked] = useState<boolean>(true); // Adresse de livraison
  const [shippingInputHidden, setShippingInputHidden] = useState("hidden");
  // Location
  const [address, setAddress] = useState("");
  const [addressComp, setAddressComp] = useState("");
  const [addressBilling, setAddressBilling] = useState("");
  const [addressBillingComp, setAddressBillingComp] = useState("");
  const [locationDataBilling, setLocationDataBilling] = useState<string | null>(
    null
  );
  const [locationData, setLocationData] = useState<string | null>(null);
  // 


  
  
  const loadCustomerCookie = () => {
    const storedCustomerInfo = Cookies.get("customerInfo");
    if (storedCustomerInfo) {
        const customerInfo = JSON.parse(storedCustomerInfo);
        console.log(customerInfo)
        setFirstName(customerInfo.firstname);  // Notez que c'est customerInfo et non storedCustomerInfo
        setLastName(customerInfo.name);  // Et c'est name au lieu de lastname
        setEmail(customerInfo.email);
        setPhone(customerInfo.phone);
        setAddress(customerInfo.address);
        setAddressComp(customerInfo.addressComp);
        setAddressBilling(customerInfo.addressBilling);
        setAddressBillingComp(customerInfo.addressBillingComp);
        setIsShippingChecked(customerInfo.isShippingChecked);
        if (!customerInfo.isShippingChecked) {
            setShippingInputHidden("block");
        }
    }
}


  useEffect(() => {
    loadCustomerCookie();
  }, []);


  
  const saveCustomerCookie = () => {
    const customerInfo = {
      firstname: firstName,
      name: lastName,
      email: email,
      hashedPassword: passwordCrypt,
      emailExist: emailExist,
      phone:phone,
      address:address,
      addressComp: addressComp,
      addressBilling: addressBilling,
      addressBillingComp: addressBillingComp,
      isShippingChecked: isShippingChecked,
    };
    Cookies.set('customerInfo', JSON.stringify(customerInfo), { expires: 1 });
  }



  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    saveCustomerCookie()
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    saveCustomerCookie()
  };

  const handleAddressCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressComp(e.target.value);
    saveCustomerCookie()
  };

  const handleAddressBillingCompChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressBillingComp(e.target.value);
    saveCustomerCookie()
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value || "");
    saveCustomerCookie()
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailExists = await isEmailExists(e.target.value);
    setEmailExist(emailExists);
    setEmail(e.target.value);
    if (emailExists) {
      setPassword("");
      setPasswordConfirm("");
    }
    saveCustomerCookie()
    // Utilisez le résultat pour mettre à jour l'état ou les props si nécessaire.
  };

  const handlePasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const hashedValue = await hashPassword(inputValue);
    setPasswordCrypt(hashedValue);
    saveCustomerCookie()
  };
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    saveCustomerCookie()
  };

  const handleCheckboxShippingChange = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const isChecked = e.currentTarget.getAttribute("aria-checked") === "true";
    console.log(isChecked); // logs true or false
    setIsShippingChecked(!isChecked);
    if (isShippingChecked) {
      setShippingInputHidden("block");
    } else {
      setShippingInputHidden("hidden");
      setLocationDataBilling("");
      setAddressBilling("");
      setAddressBillingComp("");
    }
    saveCustomerCookie()
  };

  useEffect(() => {
    const isValid = () => {
      if (emailExist) {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
          password.trim() === "" &&
          validator.isMobilePhone(phone) &&
          address?.trim() !== "" &&
          (isShippingChecked === true ? true : addressBilling?.trim() !== "" ? true : false)
        );
      } else {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
          password.trim() !== "" &&
          (password.trim() === "" || password === passwordConfirm) &&
          validator.isMobilePhone(phone) && 
          address?.trim() !== "" &&
          (isShippingChecked === true ? true : addressBilling?.trim() !== "" ? true : false)
        );
      }
    };
    setValidity(isValid());
    // 
  }, [
    setValidity,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
    emailExist,
    phone,
    address,
    isShippingChecked,
    addressBilling,
    passwordCrypt,
    addressBillingComp,
    addressComp
  ]);


  
  

  useEffect(() => {
    if (typeof google !== "undefined") {
      setIsGoogleScriptLoaded(true);
    }
  }, []);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => {
          setIsGoogleScriptLoaded(true);
        }}></Script>

      <div className="grid grid-cols-1 grid-flow-row w-full gap-y-4 mb-5 -mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="firstname">Votre prénom</Label>
            <Input id="firstname" value={firstName} onChange={handleFirstNameChange} />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="lastname">Votre nom</Label>
            <Input id="lastname" value={lastName} onChange={handleLastNameChange} />
          </div>
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="phone">Votre numéro de téléphone</Label>
          <PhoneInput
            id="phone"
            value={phone}
            onChange={handlePhoneChange}
            defaultCountry="FR"
          />
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="email">Votre adresse email</Label>
          <Input id="email" type="email" value={email} onChange={handleEmailChange} />
        </div>

        {!emailExist ? (
          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2">
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="password">Créer un mot de passe</Label>
                <Input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="passwordConfirm">
                  Confirmez le mot de passe
                </Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  onChange={handlePasswordConfirmChange}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-xs">
              Vous avez déjà commandé avec cette adresse email, cette commande
              sera ajoutée à votre compte.
            </p>
          </>
        )}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-app-500" />
          </div>
          <div className="relative flex justify-center  text-xs ">
            <span className="bg-app-50 font-bold text-base text-app-900 dark:text-app-500 dark:bg-slate-900 px-2">
              Informations de livraison
            </span>
          </div>
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="addLivraison">Adresse de livraison</Label>
          {isGoogleScriptLoaded ? (
            <>
              <LocationSearchInput
                address={address}
                setAddress={setAddress}
                setLocationData={setLocationData}
              />
            </>
          ) : (
            ""
          )}
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="addComp">Complément d&apos;adresse</Label>
          <Input id="addComp" value={addressComp} onChange={handleAddressCompChange} />
        </div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="enableBilling"
            checked={isShippingChecked}
            onClick={(e) => {
              handleCheckboxShippingChange(e);
            }}
          />
          <label
            htmlFor="enableBilling"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
            Cette adresse est aussi mon adresse de facturation
          </label>
        </div>
      </div>
      <div
        className={`${
          shippingInputHidden === "hidden"
            ? "hidden"
            : "grid grid-cols-1 grid-flow-row w-full gap-y-4 mb-5 "
        }`}>
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-app-500" />
          </div>
          <div className="relative flex justify-center  text-xs ">
            <span className="bg-app-50 font-bold text-base text-app-900 dark:text-app-500 dark:bg-slate-900 px-2">
              Informations de facturation
            </span>
          </div>
        </div>

        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="addBilling">Adresse de livraison</Label>
          {isGoogleScriptLoaded ? (
            <>
              <LocationSearchInput
                address={addressBilling}
                setAddress={setAddressBilling}
                setLocationData={setLocationDataBilling}
              />
            </>
          ) : null}
        </div>
        <div className="grid w-full  items-center gap-1.5">
          <Label htmlFor="addBillingComp">Complément d&apos;adresse</Label>
          <Input
            id="addBillingComp"
            onChange={handleAddressBillingCompChange}
          />
        </div>
      </div>
    </>
  );
};

export default CustomerInfoForm;
