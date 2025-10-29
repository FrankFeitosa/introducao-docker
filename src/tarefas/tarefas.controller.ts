import { Controller, Get, Post, Body, Patch, Param, Delete, Put, UseGuards } from '@nestjs/common';
import { TarefasService } from './tarefas.service';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminOuUsuarioGuard } from '../auth/adminOuUsuario.guards';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tarefas')
export class TarefasController {
  constructor(private readonly tarefasService: TarefasService) { }

  @Post()
  @UseGuards(AdminGuard)
  create(@Body() data: CreateTarefaDto) {
    return this.tarefasService.create(data);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  @ApiResponse({ status: 200, description: 'Lista de tarefas retornada com sucesso.' })
  @UseGuards(AdminOuUsuarioGuard)
  findAll() {
    return this.tarefasService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Buscar uma tarefa por ID' })
  @ApiResponse({ status: 200, description: 'Tarefa encontrada.' })
  @ApiResponse({ status: 404, description: 'Tarefa não encontrada.' })
  @ApiParam({ name: 'id', type: String, description: 'ID da Tarefa' })
  @UseGuards(AdminGuard)
  findOne(@Param('id') id: string) {
    return this.tarefasService.findOne(id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar uma tarefa' })
  @ApiResponse({ status: 200, description: 'Tarefa atualizado com sucesso.' })
  @ApiParam({ name: 'id', type: String, description: 'ID da tarefa' })
  @ApiBody({ type: UpdateTarefaDto })
  @UseGuards(AdminGuard)
  update(@Param('id') id: string, @Body() data: UpdateTarefaDto) {
    return this.tarefasService.update(id, data);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover uma tarefa.' })
  @ApiResponse({ status: 200, description: 'Tarefa removida com sucesso.' })
  @ApiParam({ name: 'id', type: String, description: 'ID da Tarefa' })
  @UseGuards(AdminGuard)
  remove(@Param('id') id: string) {
    return this.tarefasService.remove(id);
  }
}
