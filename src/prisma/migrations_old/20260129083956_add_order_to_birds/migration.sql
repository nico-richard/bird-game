-- CreateTable
CREATE TABLE "Order" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Bird" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "naturalist_id" INTEGER NOT NULL,
    "category" TEXT,
    "orderId" INTEGER,
    CONSTRAINT "Bird_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Bird" ("category", "id", "name", "naturalist_id") SELECT "category", "id", "name", "naturalist_id" FROM "Bird";
DROP TABLE "Bird";
ALTER TABLE "new_Bird" RENAME TO "Bird";
CREATE UNIQUE INDEX "Bird_name_key" ON "Bird"("name");
CREATE UNIQUE INDEX "Bird_naturalist_id_key" ON "Bird"("naturalist_id");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- CreateIndex
CREATE UNIQUE INDEX "Order_name_key" ON "Order"("name");
