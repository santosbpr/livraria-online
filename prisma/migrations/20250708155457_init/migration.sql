-- CreateTable
CREATE TABLE "Autor" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "nacionalidade" TEXT NOT NULL,

    CONSTRAINT "Autor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Livro" (
    "id" SERIAL NOT NULL,
    "titulo" TEXT NOT NULL,
    "anoPublicacao" INTEGER NOT NULL,
    "autorId" INTEGER NOT NULL,

    CONSTRAINT "Livro_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Livro" ADD CONSTRAINT "Livro_autorId_fkey" FOREIGN KEY ("autorId") REFERENCES "Autor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
