/*
  Warnings:

  - You are about to drop the `Tags` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Tags";

-- CreateTable
CREATE TABLE "Tag" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Tag_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_BirdToTag" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL,

    CONSTRAINT "_BirdToTag_AB_pkey" PRIMARY KEY ("A","B")
);

-- CreateIndex
CREATE UNIQUE INDEX "Tag_name_key" ON "Tag"("name");

-- CreateIndex
CREATE INDEX "_BirdToTag_B_index" ON "_BirdToTag"("B");

-- AddForeignKey
ALTER TABLE "_BirdToTag" ADD CONSTRAINT "_BirdToTag_A_fkey" FOREIGN KEY ("A") REFERENCES "Bird"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BirdToTag" ADD CONSTRAINT "_BirdToTag_B_fkey" FOREIGN KEY ("B") REFERENCES "Tag"("id") ON DELETE CASCADE ON UPDATE CASCADE;
