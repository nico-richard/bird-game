/*
  Warnings:

  - A unique constraint covering the columns `[naturalist_id]` on the table `Bird` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[naturalist_id]` on the table `Photo` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Bird_naturalist_id_key" ON "Bird"("naturalist_id");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_naturalist_id_key" ON "Photo"("naturalist_id");
