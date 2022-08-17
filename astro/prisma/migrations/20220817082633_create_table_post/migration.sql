-- CreateTable
CREATE TABLE "Post" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "content" TEXT,
    "value" INTEGER,

    CONSTRAINT "Post_pkey" PRIMARY KEY ("id")
);
