/*
  Warnings:

  - You are about to drop the column `authorId` on the `Task` table. All the data in the column will be lost.
  - You are about to drop the column `completed` on the `Task` table. All the data in the column will be lost.
  - Added the required column `columnId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `position` to the `Task` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Task" DROP CONSTRAINT "Task_authorId_fkey";

-- AlterTable
ALTER TABLE "public"."Task" DROP COLUMN "authorId",
DROP COLUMN "completed",
ADD COLUMN     "columnId" TEXT NOT NULL,
ADD COLUMN     "position" INTEGER NOT NULL,
ADD COLUMN     "userId" TEXT;

-- CreateTable
CREATE TABLE "public"."Board" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Board_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Column" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "boardId" TEXT NOT NULL,
    "position" INTEGER NOT NULL,

    CONSTRAINT "Column_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Column" ADD CONSTRAINT "Column_boardId_fkey" FOREIGN KEY ("boardId") REFERENCES "public"."Board"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Task" ADD CONSTRAINT "Task_columnId_fkey" FOREIGN KEY ("columnId") REFERENCES "public"."Column"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
