-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "pressBody" TEXT,
ADD COLUMN     "pressEndDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "pressStartDate" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP;
