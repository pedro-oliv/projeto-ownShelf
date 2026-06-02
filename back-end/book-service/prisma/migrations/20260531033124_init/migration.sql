-- CreateEnum
CREATE TYPE "LibraryAccessType" AS ENUM ('DIGITAL', 'PHYSICAL', 'BOTH');

-- CreateEnum
CREATE TYPE "ReadingStatus" AS ENUM ('NOT_STARTED', 'READING', 'FINISHED', 'PAUSED');

-- CreateTable
CREATE TABLE "Book" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "synopsis" TEXT NOT NULL,
    "categories" TEXT[],
    "publishYear" TEXT NOT NULL,
    "physicalStock" INTEGER NOT NULL,
    "coverUrl" TEXT NOT NULL,
    "pdfUrl" TEXT,
    "totalPages" INTEGER,
    "physicalPrice" DECIMAL(10,2),
    "digitalPrice" DECIMAL(10,2),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Book_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Library" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "bookId" TEXT NOT NULL,
    "transactionId" TEXT,
    "favorite" BOOLEAN NOT NULL DEFAULT false,
    "accessType" "LibraryAccessType" NOT NULL,
    "readingStatus" "ReadingStatus" NOT NULL DEFAULT 'NOT_STARTED',
    "lastPage" INTEGER NOT NULL DEFAULT 1,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Library_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Library" ADD CONSTRAINT "Library_bookId_fkey" FOREIGN KEY ("bookId") REFERENCES "Book"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
