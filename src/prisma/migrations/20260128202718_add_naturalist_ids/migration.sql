/*
  Warnings:

  - Added the required column `naturalist_id` to the `Bird` table without a default value. This is not possible if the table is not empty.
  - Made the column `name` on table `Bird` required. This step will fail if there are existing NULL values in that column.
  - Added the required column `naturalist_id` to the `Photo` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bird" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "naturalist_id" INTEGER NOT NULL,
    "category" TEXT
);
INSERT INTO "new_Bird" ("category", "id", "name") SELECT "category", "id", "name" FROM "Bird";
DROP TABLE "Bird";
ALTER TABLE "new_Bird" RENAME TO "Bird";
CREATE TABLE "new_Photo" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "naturalist_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "birdId" INTEGER NOT NULL,
    CONSTRAINT "Photo_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Photo" ("birdId", "id", "title", "url") SELECT "birdId", "id", "title", "url" FROM "Photo";
DROP TABLE "Photo";
ALTER TABLE "new_Photo" RENAME TO "Photo";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
