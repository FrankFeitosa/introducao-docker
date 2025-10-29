import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { UsuarioService } from './usuario.service';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { ApiBearerAuth, ApiBody, ApiOperation, ApiParam, ApiResponse } from '@nestjs/swagger';
import { AdminGuard } from '../auth/admin.guard';
import { JwtAuthGuard } from 'src/auth/jwt.guard';

@ApiBearerAuth()
@UseGuards(JwtAuthGuard, AdminGuard)
@Controller('usuario')
export class UsuarioController {
  constructor(private readonly usuarioService: UsuarioService) { }

  @Get()
  @ApiOperation({ summary: 'Listar todos os usuários' })
  @ApiResponse({ status: 200, description: 'Lista de usuários retornada com sucesso.' })
  findAll() {
    return this.usuarioService.findAll();
  }
  
  @Get(':id')
  @ApiOperation({ summary: 'Buscar um usuário por ID' })
  @ApiResponse({ status: 200, description: 'Usuário encontrado.' })
  @ApiResponse({ status: 404, description: 'Usuário não encontrado.' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  findOne(@Param('id') id: string) {
    return this.usuarioService.findOne(id);
  }


  @Patch(':id')
  @ApiOperation({ summary: 'Atualizar um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário atualizado com sucesso.' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  @ApiBody({ type: UpdateUsuarioDto })
  update(@Param('id') id: string, @Body() updateUsuarioDto: UpdateUsuarioDto) {
    return this.usuarioService.update(id, updateUsuarioDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Remover um usuário' })
  @ApiResponse({ status: 200, description: 'Usuário removido com sucesso.' })
  @ApiParam({ name: 'id', type: String, description: 'ID do usuário' })
  remove(@Param('id') id: string) {
    return this.usuarioService.remove(id);
  }
}
