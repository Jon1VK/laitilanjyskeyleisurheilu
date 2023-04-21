-- CreateTable
CREATE TABLE "Record" (
    "id" SERIAL NOT NULL,
    "league" TEXT NOT NULL,
    "event" TEXT NOT NULL,
    "athlete" TEXT NOT NULL,
    "result" TEXT NOT NULL,
    "handtime" BOOLEAN NOT NULL DEFAULT false,
    "location" TEXT NOT NULL,
    "achievedAt" DATE NOT NULL,
    "reviewed" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Record_league_event_idx" ON "Record"("league", "event");
