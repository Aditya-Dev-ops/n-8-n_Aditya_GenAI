/*
  Warnings:

  - A unique constraint covering the columns `[providerId,providerAccountId]` on the table `account` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "account_providerId_providerAccountId_key" ON "account"("providerId", "providerAccountId");
