/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `AthleteProfile` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `AthleteProfile` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "AthleteProfile" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "AthleteProfile_slug_key" ON "AthleteProfile"("slug");
