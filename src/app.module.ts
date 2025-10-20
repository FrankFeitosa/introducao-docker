import { Module } from '@nestjs/common';
import { TarefasModule } from './tarefas/tarefas.module';
import { PrismaModule } from './prisma/prisma.module';
import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [TarefasModule, PrismaModule],
  controllers: [],
  providers: [ PrismaService],
})
export class AppModule {}
