/*
  Warnings:

  - You are about to drop the column `isSub` on the `Payment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "monthly" INTEGER DEFAULT 0,
ALTER COLUMN "isSub" SET DEFAULT '',
ALTER COLUMN "isSub" SET DATA TYPE TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "isSub";
