-- AlterTable
ALTER TABLE "Order" ALTER COLUMN "addressBilling" DROP NOT NULL,
ALTER COLUMN "addressBillingComp" DROP NOT NULL,
ALTER COLUMN "addressComp" DROP NOT NULL;
