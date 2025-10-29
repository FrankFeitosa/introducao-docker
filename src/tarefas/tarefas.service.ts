import { Injectable } from '@nestjs/common';
import { CreateTarefaDto } from './dto/create-tarefa.dto';
import { UpdateTarefaDto } from './dto/update-tarefa.dto';
import { PrismaService } from '../prisma/prisma.service';
import { Tarefa } from '@prisma/client';

@Injectable()
export class TarefasService {
  constructor( private prismaService: PrismaService) {}

  async create(data: CreateTarefaDto): Promise<Tarefa> {
    return this.prismaService.tarefa.create({data});
  };

  async findAll(): Promise<Tarefa[]> {
    return this.prismaService.tarefa.findMany();
  }

  async findOne(id: string): Promise<Tarefa | null> {
    const tarefa = await this.prismaService.tarefa.findUnique({
      where: { id },
    });
    if (!tarefa) {
      throw new Error(`Tarefa com ID ${id} não encontrado`);
    }
    return tarefa;
  }

  async update(id: string, data: UpdateTarefaDto) {
    const tarefaId = await this.prismaService.tarefa.findUnique({
      where: { id },
    })  
    if (!tarefaId) {
      throw new Error(`Tarefa com ID ${id} não encontrado`);
    }
    return this.prismaService.tarefa.update({
      where: { id },
      data,
    });
  }

  async remove(id: string): Promise<Tarefa> {
    try {
      return await this.prismaService.tarefa.delete({
        where: { id },
      });   
    } catch {
      throw new Error(`Tarefa com ID ${id} não encontrado`);
    }
  }
}
