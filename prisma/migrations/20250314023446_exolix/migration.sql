-- CreateTable
CREATE TABLE "Currency" (
    "id" SERIAL NOT NULL,
    "code" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT,
    "notes" TEXT,
    "networkId" INTEGER NOT NULL,

    CONSTRAINT "Currency_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Network" (
    "id" SERIAL NOT NULL,
    "network" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "shortName" TEXT,
    "addressRegex" TEXT,
    "notes" TEXT,
    "isDefault" BOOLEAN NOT NULL,
    "decimal" INTEGER,
    "icon" TEXT,
    "blockExplorer" TEXT,
    "depositMinAmount" DOUBLE PRECISION,
    "memoNeeded" BOOLEAN NOT NULL,
    "memoName" TEXT,
    "memoRegex" TEXT,
    "precision" INTEGER NOT NULL,
    "contract" TEXT,

    CONSTRAINT "Network_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Network_network_key" ON "Network"("network");

-- AddForeignKey
ALTER TABLE "Currency" ADD CONSTRAINT "Currency_networkId_fkey" FOREIGN KEY ("networkId") REFERENCES "Network"("id") ON DELETE CASCADE ON UPDATE CASCADE;
