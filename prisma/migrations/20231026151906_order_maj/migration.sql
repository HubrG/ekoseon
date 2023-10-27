/*
  Warnings:

  - Added the required column `address` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressBilling` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressBillingComp` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `addressComp` to the `Order` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "address" TEXT NOT NULL,
ADD COLUMN     "addressBilling" TEXT NOT NULL,
ADD COLUMN     "addressBillingComp" TEXT NOT NULL,
ADD COLUMN     "addressComp" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;
