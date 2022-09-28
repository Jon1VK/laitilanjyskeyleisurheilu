-- CreateTable
CREATE TABLE "News" (
    "id" SERIAL NOT NULL,
    "slug" TEXT NOT NULL,
    "draft" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATE NOT NULL,
    "author" TEXT NOT NULL,
    "cardImage" TEXT,
    "title" TEXT NOT NULL,
    "leadParagraph" TEXT NOT NULL,
    "body" TEXT NOT NULL,

    CONSTRAINT "News_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "News_slug_key" ON "News"("slug");

-- CreateIndex
CREATE INDEX "News_draft_idx" ON "News"("draft");
