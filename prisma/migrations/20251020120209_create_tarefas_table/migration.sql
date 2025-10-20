-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDENTE', 'EM_ANDAMENTO', 'CONCUIDO');

-- CreateTable
CREATE TABLE "Tarefa" (
    "id" TEXT NOT NULL,
    "nome_tarefa" TEXT NOT NULL,
    "responsavel" TEXT NOT NULL,
    "data_inicio" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "data_entrega" TIMESTAMP(3) NOT NULL,
    "objetivo" TEXT NOT NULL,
    "criado" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizado" TIMESTAMP(3) NOT NULL,
    "status" "Status" NOT NULL DEFAULT 'PENDENTE',

    CONSTRAINT "Tarefa_pkey" PRIMARY KEY ("id")
);
