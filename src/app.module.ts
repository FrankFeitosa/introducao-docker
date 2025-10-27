import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';

@Module({
  imports: [TarefasModule, PrismaModule, UsuarioModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
