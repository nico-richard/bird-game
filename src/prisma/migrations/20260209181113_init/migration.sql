-- CreateTable
CREATE TABLE "Order" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bird" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "naturalist_id" INTEGER NOT NULL,
    "category" TEXT,
    "orderId" INTEGER,

    CONSTRAINT "Bird_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Photo" (
    "id" SERIAL NOT NULL,
    "naturalist_id" INTEGER NOT NULL,
    "url" TEXT NOT NULL,
    "birdId" INTEGER NOT NULL,

    CONSTRAINT "Photo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tags" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "test" BOOLEAN NOT NULL,

    CONSTRAINT "Tags_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Order_name_key" ON "Order"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bird_name_key" ON "Bird"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Bird_naturalist_id_key" ON "Bird"("naturalist_id");

-- CreateIndex
CREATE UNIQUE INDEX "Photo_naturalist_id_key" ON "Photo"("naturalist_id");

-- CreateIndex
CREATE UNIQUE INDEX "Tags_name_key" ON "Tags"("name");

-- AddForeignKey
ALTER TABLE "Bird" ADD CONSTRAINT "Bird_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Photo" ADD CONSTRAINT "Photo_birdId_fkey" FOREIGN KEY ("birdId") REFERENCES "Bird"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
