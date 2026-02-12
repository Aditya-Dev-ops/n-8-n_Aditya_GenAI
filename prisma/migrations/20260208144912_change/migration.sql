/*
  Warnings:

  - You are about to drop the column `providerAccountId` on the `account` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[providerId,accountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `accountId` to the `account` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "account_providerId_providerAccountId_key";

-- AlterTable
ALTER TABLE "account" DROP COLUMN "providerAccountId",
ADD COLUMN     "accountId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_accountId_key" ON "account"("providerId", "accountId");
