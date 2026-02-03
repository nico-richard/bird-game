-- This is an empty migration.
-- UpdateTable
ALTER TABLE "Bird" RENAME TO "Bird_old";

CREATE TABLE "Bird" (
                        "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
                        "name" TEXT NOT NULL COLLATE NOCASE,
                        "naturalist_id" INTEGER NOT NULL,
                        "category" TEXT
);

INSERT INTO "Bird" (id, name, naturalist_id, category)
SELECT id, name, naturalist_id, category FROM "Bird_old";

DROP TABLE "Bird_old";