"use client";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState, useEffect } from "react";
import {
  isEmailExists,
  hashPassword,
} from "@/src/feature/ecommerce/validation/utils.server";
import validator from "validator";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";

interface CustomerInfoForm {
  setValidity: React.Dispatch<React.SetStateAction<boolean>>;
}

const CustomerInfoForm: React.FC<CustomerInfoForm> = ({ setValidity }) => {
  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>("");
  const [emailExist, setEmailExist] = useState<boolean>(false);
  const [password, setPassword] = useState<string>("");
  const [passwordConfirm, setPasswordConfirm] = useState<string>("");
  const [passwordCrypt, setPasswordCrypt] = useState<string>("");
  const [areFieldsValid, setAreFieldsValid] = useState(false);

  const handleFirstNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLastName(e.target.value);
  };

  const handlePhoneChange = (value: string) => {
    setPhone(value || "");
  };

  const handleEmailChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailExists = await isEmailExists(e.target.value);
    setEmailExist(emailExists);
    setEmail(e.target.value);
    // Utilisez le résultat pour mettre à jour l'état ou les props si nécessaire.
  };

  const handlePasswordChange = async (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = e.target.value;
    setPassword(inputValue);
    const hashedValue = await hashPassword(inputValue);
    setPasswordCrypt(hashedValue);
  };
  const handlePasswordConfirmChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setPasswordConfirm(e.target.value);
  };

  useEffect(() => {
    const isValid = () => {
      if (emailExist) {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
            password.trim() === ""
            && validator.isMobilePhone(phone)
        );
      } else {
        return (
          firstName.trim() !== "" &&
          lastName.trim() !== "" &&
          validator.isEmail(email.trim()) &&
          email.trim() !== "" &&
          password.trim() !== "" &&
            (password.trim() === "" || password === passwordConfirm)
            && validator.isMobilePhone(phone)

        );
      }
    };

    setValidity(isValid());
  }, [
    setValidity,
    firstName,
    lastName,
    email,
    password,
    passwordConfirm,
      emailExist,
    phone
  ]);

  return (
    <>
      <div className="grid grid-cols-1 grid-flow-row w-full gap-y-4 mb-5">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-x-2 gap-y-4">
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="firstname">Votre prénom</Label>
            <Input id="firstname" onChange={handleFirstNameChange} />
          </div>
          <div className="grid w-full  items-center gap-1.5">
            <Label htmlFor="lastname">Votre nom</Label>
            <Input id="lastname" onChange={handleLastNameChange} />
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
            <Input id="email" type="email" onChange={handleEmailChange} />
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
                <Label htmlFor="password">Confirmez le mot de passe</Label>
                <Input
                  type="password"
                  id="password"
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
      </div>
    </>
  );
};

export default CustomerInfoForm;
