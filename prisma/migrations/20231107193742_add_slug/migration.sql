/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `BlogCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `BlogTag` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "BlogCategory" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "BlogTag" ADD COLUMN     "slug" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "BlogCategory_slug_key" ON "BlogCategory"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "BlogTag_slug_key" ON "BlogTag"("slug");
