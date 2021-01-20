-- CreateTable
CREATE TABLE "hystoricalwinddata" (
"id" SERIAL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "avarage" DECIMAL(65,30),
    "max" DECIMAL(65,30),

    PRIMARY KEY ("id")
);
