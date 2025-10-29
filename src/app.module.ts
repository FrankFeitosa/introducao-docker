import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsuarioModule } from './usuario/usuario.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [TarefasModule, PrismaModule, UsuarioModule, AuthModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
