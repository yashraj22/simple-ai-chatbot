-- CreateTable
CREATE TABLE "Message" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "message" TEXT NOT NULL,
    "answer" TEXT NOT NULL,
    "feedback" BOOLEAN,
    "timestamp" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
