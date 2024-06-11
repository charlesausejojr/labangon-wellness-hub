/*
  Warnings:

  - You are about to drop the column `password` on the `User` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "Role" ADD VALUE 'FACILITATOR';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "password";
