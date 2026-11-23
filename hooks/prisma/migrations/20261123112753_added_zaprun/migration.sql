-- CreateTable
CREATE TABLE "ZapRun" (
    "id" TEXT NOT NULL,
    "zapId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ZapRun_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ZapRun_zapId_key" ON "ZapRun"("zapId");

-- AddForeignKey
ALTER TABLE "ZapRun" ADD CONSTRAINT "ZapRun_zapId_fkey" FOREIGN KEY ("zapId") REFERENCES "Zap"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
