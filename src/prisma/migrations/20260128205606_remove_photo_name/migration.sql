/*
  Warnings:

  - You are about to drop the column `title` on the `Photo` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "naturalist_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "birdId" INTEGER NOT NULL,
    CONSTRAINT "Photo_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("birdId", "id", "naturalist_id", "url") SELECT "birdId", "id", "naturalist_id", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
