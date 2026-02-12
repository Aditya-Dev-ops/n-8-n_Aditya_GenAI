/*
  Warnings:

  - Added the required column `accountId` to the `account` table without a default value. This is not possible if the table is not empty.
  - Added the required column `providerId` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "account" ADD COLUMN     "accountId" TEXT NOT NULL,
ADD COLUMN     "providerId" TEXT NOT NULL;
