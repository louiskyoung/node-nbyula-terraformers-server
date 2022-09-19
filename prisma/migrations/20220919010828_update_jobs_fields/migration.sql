/*
  Warnings:

  - You are about to drop the column `published` on the `Job` table. All the data in the column will be lost.
  - Added the required column `contactEmail` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `contantPhone` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `deadline` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `description` to the `Job` table without a default value. This is not possible if the table is not empty.
  - Added the required column `location` to the `Job` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Job" DROP COLUMN "published",
ADD COLUMN     "approved" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "contactEmail" TEXT NOT NULL,
ADD COLUMN     "contantPhone" TEXT NOT NULL,
ADD COLUMN     "deadline" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "description" TEXT NOT NULL,
ADD COLUMN     "location" TEXT NOT NULL;
