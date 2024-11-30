-- CreateTable
CREATE TABLE "Motorist" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "rg" TEXT NOT NULL,
    "cpf" TEXT NOT NULL,
    "cnh" TEXT NOT NULL,
    "car_name" TEXT NOT NULL,
    "plate" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Motorist_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Motorist_rg_key" ON "Motorist"("rg");

-- CreateIndex
CREATE UNIQUE INDEX "Motorist_cpf_key" ON "Motorist"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Motorist_cnh_key" ON "Motorist"("cnh");

-- CreateIndex
CREATE UNIQUE INDEX "Motorist_plate_key" ON "Motorist"("plate");
