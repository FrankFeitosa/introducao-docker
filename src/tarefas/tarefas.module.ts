import { Module } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { TarefasController } from './tarefas.controller';

@Module({
  controllers: [TarefasController],
  providers: [TarefasService],
})
export class TarefasModule {}
