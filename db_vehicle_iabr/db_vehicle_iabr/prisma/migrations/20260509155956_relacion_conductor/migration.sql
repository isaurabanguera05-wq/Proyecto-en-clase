/*
  Warnings:

  - You are about to drop the column `isActive` on the `Vehiculo` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[placa]` on the table `Vehiculo` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Vehiculo" DROP COLUMN "isActive",
ADD COLUMN     "conductorId" INTEGER;

-- CreateTable
CREATE TABLE "Conductor" (
    "id" SERIAL NOT NULL,
    "nombre" TEXT NOT NULL,
    "documento" TEXT NOT NULL,
    "telefono" TEXT,

    CONSTRAINT "Conductor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Conductor_documento_key" ON "Conductor"("documento");

-- CreateIndex
CREATE UNIQUE INDEX "Vehiculo_placa_key" ON "Vehiculo"("placa");

-- AddForeignKey
ALTER TABLE "Vehiculo" ADD CONSTRAINT "Vehiculo_conductorId_fkey" FOREIGN KEY ("conductorId") REFERENCES "Conductor"("id") ON DELETE CASCADE ON UPDATE CASCADE;
