-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "recurringEventId" INTEGER;

-- CreateTable
CREATE TABLE "RecurringEvent" (
    "id" SERIAL NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "weekdays" INTEGER[],

    CONSTRAINT "RecurringEvent_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_recurringEventId_fkey" FOREIGN KEY ("recurringEventId") REFERENCES "RecurringEvent"("id") ON DELETE CASCADE ON UPDATE CASCADE;
