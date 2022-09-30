-- CreateTable
CREATE TABLE "PressRelease" (
    "id" SERIAL NOT NULL,
    "sendDate" DATE NOT NULL,
    "newsBody" TEXT NOT NULL,
    "whatsappBody" TEXT NOT NULL,

    CONSTRAINT "PressRelease_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PressRelease_sendDate_key" ON "PressRelease"("sendDate");
