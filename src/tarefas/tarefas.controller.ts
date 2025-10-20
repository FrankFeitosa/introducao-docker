import { Controller, Get, Post, Body, Patch, Param, Delete, Put } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';

@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) {}

  @Post()
  create(@Body() data: CreateTarefaDto) {
    return this.tarefasService.create(data);
  }

  @Get()
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() data: UpdateTarefaDto) {
    return this.tarefasService.update(id, data);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tarefasService.remove(id);
  }
}
