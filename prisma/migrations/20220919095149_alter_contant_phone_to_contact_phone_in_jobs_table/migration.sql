/*
  Warnings:

  - You are about to drop the column `contantPhone` on the `Job` table. All the data in the column will be lost.
  - Added the required column `contactPhone` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "contantPhone",
ADD COLUMN     "contactPhone" TEXT NOT NULL;
