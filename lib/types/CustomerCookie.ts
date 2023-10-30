export interface CustomerCookie {
    firstname:string;
    name:string;
    email:string;
    hashedPassword:string;
    emailExist:boolean;
    phone:string
    address:string;
    addressComp: string;
    addressBilling: string;
    addressBillingComp: string;
    isShippingChecked: boolean;
    billingName:string;
    deliveryName:string;
}