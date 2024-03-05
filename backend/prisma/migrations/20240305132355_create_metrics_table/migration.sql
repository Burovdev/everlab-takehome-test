-- CreateTable
CREATE TABLE "metrics" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "oruSonicCodes" TEXT[],
    "oruSonicUnits" TEXT[],
    "units" TEXT[],
    "diagnostic" TEXT,
    "diagnosticGroups" TEXT,
    "minAge" INTEGER,
    "maxAge" INTEGER,
    "gender" TEXT,
    "standardLower" DOUBLE PRECISION,
    "standardHigher" DOUBLE PRECISION,
    "everlabLower" DOUBLE PRECISION,
    "everlabHigher" DOUBLE PRECISION,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "metrics_pkey" PRIMARY KEY ("id")
);
