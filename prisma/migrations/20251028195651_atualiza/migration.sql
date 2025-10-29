-- AlterTable
ALTER TABLE "Tarefa" ADD COLUMN     "usuarioId" TEXT;

-- AddForeignKey
ALTER TABLE "Tarefa" ADD CONSTRAINT "Tarefa_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario"("id") ON DELETE CASCADE ON UPDATE CASCADE;
