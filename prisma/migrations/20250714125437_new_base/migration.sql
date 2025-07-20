/*
  Warnings:

  - You are about to drop the column `materialId` on the `Dispatch` table. All the data in the column will be lost.
  - You are about to drop the `SupplyItem` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `material` to the `Dispatch` table without a default value. This is not possible if the table is not empty.
  - Added the required column `material` to the `Supply` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Supply` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Dispatch" DROP CONSTRAINT "Dispatch_materialId_fkey";

-- DropForeignKey
ALTER TABLE "SupplyItem" DROP CONSTRAINT "SupplyItem_materialId_fkey";

-- DropForeignKey
ALTER TABLE "SupplyItem" DROP CONSTRAINT "SupplyItem_supplyId_fkey";

-- AlterTable
ALTER TABLE "Dispatch" DROP COLUMN "materialId",
ADD COLUMN     "material" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Supply" ADD COLUMN     "material" TEXT NOT NULL,
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "SupplyItem";
