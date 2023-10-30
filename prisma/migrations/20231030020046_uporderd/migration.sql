-- AlterTable
ALTER TABLE "Product" ADD COLUMN     "rebate" DOUBLE PRECISION,
ADD COLUMN     "rebateProgressive" BOOLEAN,
ADD COLUMN     "rebateProgressiveMaxInPercent" INTEGER;
