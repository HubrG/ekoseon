"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect, Suspense } from "react";
import {
  isEmailExists,
  hashPassword,
} from "@/src/feature/layout/ecommerce/utils.server";
import validator from "validator";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import LocationSearchInput from "@/src/feature/layout/ecommerce/validation/LocationSearchInput";
import { Checkbox } from "@/components/ui/checkbox";
import Script from "next/script";
import Cookies from "js-cookie";
import Skeleton from "@/src/feature/layout/skeleton/Content";
import { Tooltip } from "react-tooltip";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInfoCircle,
  faTruck,
  faReceipt,
} from "@fortawesome/pro-solid-svg-icons";

interface CustomerInfoForm {
  setValidity: React.Dispatch<React.SetStateAction<boolean>>;
  isDelivery: boolean;
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

const CustomerInfoForm: React.FC<CustomerInfoForm> = ({
  setValidity,
  isDelivery,
}) => {
  // ANCHOR Cookie
  const storedCustomerInfo: string | undefined = Cookies.get("customerInfo");
  let customerInfo: CustomerInfo | null = null;
  if (storedCustomerInfo) {
    customerInfo = JSON.parse(storedCustomerInfo);
  }
  // ANCHOR Load state
  const [isCustomerInfoLoaded, setIsCustomerInfoLoaded] = useState(false);
  const [isGoogleScriptLoaded, setIsGoogleScriptLoaded] = useState(false);

  // ANCHOR Form state
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordCrypt, setPasswordCrypt] = useState<string>("");
  const [deliveryName, setDeliveryName] = useState<string>("");
  const [billingName, setBillingName] = useState<string>("");

  // ANCHOR Checks state
  const [isShippingChecked, setIsShippingChecked] = useState<boolean>(true); // Adresse de livraison
  const [shippingInputHidden, setShippingInputHidden] = useState("hidden");

  // ANCHOR Location state
  const [address, setAddress] = useState("");
  const [addressComp, setAddressComp] = useState("");
  const [addressBilling, setAddressBilling] = useState("");
  const [addressBillingComp, setAddressBillingComp] = useState("");
  const [locationDataBilling, setLocationDataBilling] = useState<string | null>(
    null
  );
  const [locationData, setLocationData] = useState<string | null>(null);

  // ANCHOR Errors state
  const [phoneError, setPhoneError] = useState<string>("");
  const [emailError, setEmailError] = useState<string>("");
  const [passwordError, setPasswordError] = useState<string>("");

  // ANCHOR Effects hook
  useEffect(() => {
    const loadCustomerCookie = () => {
      const storedCustomerInfo = Cookies.get("customerInfo");
      if (storedCustomerInfo) {
        const customerInfo = JSON.parse(storedCustomerInfo);
        setFirstName(customerInfo.firstname); // Notez que c'est customerInfo et non storedCustomerInfo
        setLastName(customerInfo.name); // Et c'est name au lieu de lastname
        setEmail(customerInfo.email);
        setPhone(customerInfo.phone);
        setDeliveryName(customerInfo.deliveryName);
        setBillingName(customerInfo.billingName);
        setAddress(customerInfo.address);
        setAddressComp(customerInfo.addressComp);
        setAddressBilling(customerInfo.addressBilling);
        setAddressBillingComp(customerInfo.addressBillingComp);
        setIsShippingChecked(customerInfo.isShippingChecked);
        setEmailExist(customerInfo.emailExist);
        if (!customerInfo.isShippingChecked) {
          setShippingInputHidden("block");
        }
      }
    };
    loadCustomerCookie();
    setIsCustomerInfoLoaded(true);
  }, []);

  useEffect(() => {
    if (isCustomerInfoLoaded) {
      const customerInfo = {
        firstname: firstName,
        name: lastName,
        email: email,
        hashedPassword: passwordCrypt,
        emailExist: emailExist,
        phone: phone,
        address: address,
        addressComp: addressComp,
        deliveryName: deliveryName,
        billingName: billingName,
        addressBilling: addressBilling,
        addressBillingComp: addressBillingComp,
        isShippingChecked: isShippingChecked,
      };
      Cookies.set("customerInfo", JSON.stringify(customerInfo), { expires: 1 });
    }
  }, [
    isCustomerInfoLoaded,
    firstName,
    lastName,
    email,
    passwordCrypt,
    deliveryName,
    billingName,
    emailExist,
    phone,
    address,
    addressComp,
    addressBilling,
    addressBillingComp,
    isShippingChecked,
  ]);

  useEffect(() => {
    const isValid = () => {
      if (emailExist) {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
          password.trim() === "" &&
          deliveryName.trim() !== "" && 
          validator.isMobilePhone(phone) &&
          (isDelivery === true
            ? address?.trim() !== "" &&
              (isShippingChecked === true
                ? true
                : addressBilling?.trim() !== "" &&  billingName.trim() !== ""

                ? true
                : false)
            : true)
        );
      } else {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
          password.trim() !== "" &&
          deliveryName.trim() !== "" && 
          (password.trim() === "" || password === passwordConfirm) &&
          validator.isMobilePhone(phone) &&
          (isDelivery === true
            ? address?.trim() !== "" &&
              (isShippingChecked === true
                ? true
                : addressBilling?.trim() !== "" &&  billingName.trim() !== ""
                ? true
                : false)
            : true)
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
    isDelivery,
    passwordConfirm,
    emailExist,
    phone,
    address,
    deliveryName,
    billingName,
    isShippingChecked,
    addressBilling,
    passwordCrypt,
    addressBillingComp,
    addressComp,
  ]);

  useEffect(() => {
    if (typeof google !== "undefined") {
      setIsGoogleScriptLoaded(true);
    }
  }, []);

  // Consts/functions

  const handleDeliveryNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDeliveryName(e.target.value);
  };

  const handleBillingNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBillingName(e.target.value);
  };

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
    if (deliveryName === firstName + " " + lastName || deliveryName === "") {
      setDeliveryName(e.target.value + " " + lastName)
    }
  };
  

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
    if (deliveryName === firstName + " " + lastName || deliveryName === "") {
      setDeliveryName(firstName + " " + e.target.value)
    }
  };

  const handleAddressCompChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAddressComp(e.target.value);
  };

  const handleAddressBillingCompChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAddressBillingComp(e.target.value);
  };

  const handlePhoneChange = (value: string) => {
    value = value || ""; // Utilisez une chaîne vide si la valeur est undefined ou nulle
    setPhone(value);
    if (validator.isMobilePhone(value)) {
      setPhoneError("");
    }
  };

  const handlePhoneBlur = () => {
    const value = phone;
    if (!validator.isMobilePhone(value) && value != "") {
      setPhoneError("Le numéro de téléphone est au mauvais format");
    } else {
      setPhoneError("");
    }
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
    const emailExists = await isEmailExists(e.target.value);
    setEmailExist(emailExists);
    if (emailExists) {
      setPassword("");
      setPasswordConfirm("");
    }
    if (validator.isEmail(e.target.value)) {
      setEmailError("");
    }
  };

  const handleEmailBlur = () => {
    const value = email;
    if (!validator.isEmail(value) && value != "") {
      setEmailError("Votre adresse email est au mauvais format");
    } else {
      setEmailError("");
    }
  };

  const handlePasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const hashedValue = await hashPassword(inputValue);
    setPasswordCrypt(hashedValue);
    if (e.target.value == passwordConfirm) {
      setPasswordError("");
    }
  };

  const handlePasswordBlur = () => {
    if (passwordConfirm != password && password != "") {
      setPasswordError("Les mots de passe ne correspondent pas");
    } else {
      setPasswordError("");
    }
  };

  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
    if (e.target.value == password) {
      setPasswordError("");
    }
  };

  const handleCheckboxShippingChange = (
    e: React.MouseEvent<HTMLButtonElement>
  ) => {
    const isChecked = e.currentTarget.getAttribute("aria-checked") === "true";
    setIsShippingChecked(!isChecked);
    if (isShippingChecked) {
      setShippingInputHidden("block");
    } else {
      setShippingInputHidden("hidden");
      setLocationDataBilling("");
      setAddressBilling("");
      setBillingName("");
      setAddressBillingComp("");
    }
  };

  // ANCHOR RETURN

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        onLoad={() => {
          setIsGoogleScriptLoaded(true);
        }}></Script>

      <div className="grid grid-cols-1 grid-flow-row w-full gap-y-5  mb-5 -mt-4">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-4 gap-y-4">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="firstname">Prénom *</Label>
            <Input
              id="firstname"
              value={firstName}
              onChange={handleFirstNameChange}
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="lastname">Nom *</Label>
            <Input
              id="lastname"
              value={lastName}
              onChange={handleLastNameChange}
            />
          </div>
        </div>
        <div className="grid md:grid-cols-2 grid-cols-1 w-full  items-center gap-x-4 gap-y-4 gap-1.5">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="phone">
              {phoneError !== "" && (
                <>
                  <span
                    className="w-full"
                    data-tooltip-id="ttPhone"
                    data-tooltip-content={phoneError}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-red-500 mr-2"
                    />
                    <Tooltip id="ttPhone" className="tooltip" />
                  </span>
                </>
              )}
              Téléphone *{" "}
            </Label>
            <PhoneInput
              id="phone"
              countrySelectComponent={() => null}
              value={phone}
              onChange={handlePhoneChange}
              onBlur={handlePhoneBlur}
              defaultCountry="FR"
            />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="email">
              {emailError !== "" && (
                <>
                  <span
                    className="w-full"
                    data-tooltip-id="ttEmail"
                    data-tooltip-content={emailError}>
                    <FontAwesomeIcon
                      icon={faInfoCircle}
                      className="text-red-500 mr-2"
                    />
                    <Tooltip id="ttEmail" className="tooltip" />
                  </span>
                </>
              )}
              Adresse email *
            </Label>
            <Input
              id="email"
              type="email"
              onBlur={handleEmailBlur}
              value={email}
              onChange={handleEmailChange}
            />
          </div>
        </div>
        {!emailExist ? (
          <>
            <div className="grid md:grid-cols-2 grid-cols-1 gap-y-4 gap-x-4">
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="password">
                  {passwordError !== "" && (
                    <>
                      <span
                        className="w-full"
                        data-tooltip-id="ttPassword"
                        data-tooltip-content={passwordError}>
                        <FontAwesomeIcon
                          icon={faInfoCircle}
                          className="text-red-500 mr-2"
                        />
                        <Tooltip id="ttPassword" className="tooltip" />
                      </span>
                    </>
                  )}
                  Créer un mot de passe *
                </Label>
                <Input
                  type="password"
                  id="password"
                  onChange={handlePasswordChange}
                />
              </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="passwordConfirm">
                  Confirmer le mot de passe *
                </Label>
                <Input
                  type="password"
                  id="passwordConfirm"
                  onChange={handlePasswordConfirmChange}
                  onBlur={handlePasswordBlur}
                />
              </div>
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-center mb-0">
              Vous avez déjà commandé avec cette adresse email, cette commande
              sera ajoutée à votre compte.
            </p>
          </>
        )}
        {isDelivery && (
          <>
            <div className="separatorWithText">
              <div>
                <span />
              </div>
              <div>
                <span>
                  <FontAwesomeIcon
                    icon={faTruck}
                    className="mx-2"
                  />
                  Livraison
                </span>
              </div>
            </div>
            <Suspense fallback={<Skeleton />}>
            
                <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="deliveryName">Nom et prénom, société... *</Label>
                  <Input
                    id="deliveryName"
                    value={deliveryName}
                    onChange={handleDeliveryNameChange}
                  />
                </div>
                
             
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="addLivraison">
                  Adresse complète de livraison *
                </Label>
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
            </Suspense>
            <div className="grid w-full  items-center gap-1.5">
              <Label htmlFor="addComp">Complément d&apos;adresse</Label>
              <Input
                id="addComp"
                value={addressComp}
                onChange={handleAddressCompChange}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox
                id="enableBilling"
                checked={isShippingChecked}
                onClick={(e) => {
                  handleCheckboxShippingChange(e);
                }}
              />
              <label htmlFor="enableBilling">
                Cette adresse est aussi votre adresse de facturation
              </label>
            </div>

            <div
              className={`${
                shippingInputHidden === "hidden"
                  ? "hidden"
                  : "grid grid-cols-1 grid-flow-row w-full gap-y-4 mb-5 "
              }`}>
              <div className="separatorWithText">
                <div>
                  <span />
                </div>
                <div>
                  <span>
                    <FontAwesomeIcon
                      icon={faReceipt}
                      className="mx-2"     
                    />
                    Facturation
                  </span>
                </div>
              </div>

                <div className="grid w-full  items-center gap-1.5">
                  <Label htmlFor="billingName">Nom et prénom, société... *</Label>
                  <Input
                    id="billingName"
                    value={billingName}
                    onChange={handleBillingNameChange}
                  />
                </div>
              <div className="grid w-full  items-center gap-1.5">
                <Label htmlFor="addBilling">
                  Adresse complète de facturation *
                </Label>


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
                <Label htmlFor="addBillingComp">
                  Complément d&apos;adresse
                </Label>
                <Input
                  id="addBillingComp"
                  onChange={handleAddressBillingCompChange}
                />
              </div>
            </div>
          </>
        )}
      </div>
      {/* <Separator className="my-4" /> */}
    </>
  );
};

export default CustomerInfoForm;
