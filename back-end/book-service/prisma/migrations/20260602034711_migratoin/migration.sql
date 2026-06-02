/*
  Warnings:

  - You are about to drop the column `categories` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `digitalPrice` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `physicalPrice` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `physicalStock` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `synopsis` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `totalPages` on the `Book` table. All the data in the column will be lost.
  - You are about to drop the column `accessType` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `favorite` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `lastPage` on the `Library` table. All the data in the column will be lost.
  - You are about to drop the column `readingStatus` on the `Library` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,bookId]` on the table `Library` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `price` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Made the column `pdfUrl` on table `Book` required. This step will fail if there are existing NULL values in that column.
  - Made the column `transactionId` on table `Library` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Book" DROP COLUMN "categories",
DROP COLUMN "digitalPrice",
DROP COLUMN "physicalPrice",
DROP COLUMN "physicalStock",
DROP COLUMN "synopsis",
DROP COLUMN "totalPages",
ADD COLUMN     "price" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "pdfUrl" SET NOT NULL;

-- AlterTable
ALTER TABLE "Library" DROP COLUMN "accessType",
DROP COLUMN "favorite",
DROP COLUMN "lastPage",
DROP COLUMN "readingStatus",
ALTER COLUMN "transactionId" SET NOT NULL;

-- DropEnum
DROP TYPE "LibraryAccessType";

-- DropEnum
DROP TYPE "ReadingStatus";

-- CreateIndex
CREATE UNIQUE INDEX "Library_userId_bookId_key" ON "Library"("userId", "bookId");
