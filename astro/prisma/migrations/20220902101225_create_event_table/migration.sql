-- CreateEnum
CREATE TYPE "EventType" AS ENUM ('PRACTICE', 'COMPETITION', 'OTHER');

-- CreateTable
CREATE TABLE "Event" (
  "id" SERIAL NOT NULL,
  "type" "EventType" NOT NULL,
  "startDateTime" TIMESTAMP(3) NOT NULL,
  "endDateTime" TIMESTAMP(3),
  "title" TEXT NOT NULL,
  "description" TEXT,
  "location" TEXT,
  CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);