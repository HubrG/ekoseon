/*
  Warnings:

  - A unique constraint covering the columns `[canonicalSlug]` on the table `BlogPost` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `canonicalSlug` to the `BlogPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "BlogPost" ADD COLUMN     "canonicalSlug" TEXT NOT NULL,
ADD COLUMN     "excerpt" TEXT,
ADD COLUMN     "published" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "publishedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "BlogPost_canonicalSlug_key" ON "BlogPost"("canonicalSlug");
