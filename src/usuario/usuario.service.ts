import { Injectable } from '@nestjs/common';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import {  Usuario } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';


@Injectable()
export class UsuarioService {

  constructor(private prismaService: PrismaService) { }

  private async ensureUsuarioExists(id: string): Promise<Usuario> {
    const usuario = await this.prismaService.usuario.findUnique({
      where: { id },
    });
    if (!usuario) throw new NotFoundException(`Usuário com ID ${id} não encontrado`);
    return usuario;
  }

  async findAll(): Promise<Usuario[]> {
    return await this.prismaService.usuario.findMany();
  }

  async findOne(id: string): Promise<Usuario> {
    return await this.ensureUsuarioExists(id);
  }

  async update(id: string, updateUsuarioDto: UpdateUsuarioDto): Promise<Usuario> {
    await this.ensureUsuarioExists(id);
    return this.prismaService.usuario.update({
      where: { id },
      data: updateUsuarioDto,
    });
  }

  async remove(id: string): Promise<Usuario> {
    await this.ensureUsuarioExists(id);
    return await this.prismaService.usuario.delete({
      where: { id },
    });
  }
}
