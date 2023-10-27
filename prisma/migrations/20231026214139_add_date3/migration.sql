/*
  Warnings:

  - You are about to drop the column `isMonthly` on the `Order` table. All the data in the column will be lost.
  - You are about to drop the column `isSubscription` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" DROP COLUMN "isMonthly",
ADD COLUMN     "isSub" INTEGER;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "isSubscription",
ADD COLUMN     "isSub" TEXT;
