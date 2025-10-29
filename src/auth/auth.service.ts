import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { RegisterDto } from './dto/register.dto';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';
import { Usuario } from '@prisma/client';


@Injectable()
export class AuthService {

  constructor(private jwt: JwtService, private prisma: PrismaService) {}

  async register(data: RegisterDto){
    const usuario = await this.prisma.usuario.findUnique({
      where: {email: data.email}
    });
    
    if(usuario) throw new ConflictException('Email já cadastrado');

    const hashedSenha = await bcrypt.hash(data.senha, 10);

    const novoUsuario = await this.prisma.usuario.create({
      data: {
        nome: data.nome,
        email: data.email,
        senha: hashedSenha,
      },
      select: {
        id: true,
        nome: true,
        email: true,
        role: true,
      }
    });
    return novoUsuario;
  }

  async validarUsuario(email: string, senha: string){
    const usuario = await this.prisma.usuario.findUnique({
      where: {email}
    });

    if(!usuario) throw new UnauthorizedException('Credenciais inválidas');

    const senhavalida = await bcrypt.compare(senha, usuario.senha);
    if(!senhavalida) throw new UnauthorizedException('Credenciais inválidas');

    return usuario
  }

  async login(credenciais: LoginDto){
    const usuario = await this.validarUsuario(credenciais.email, credenciais.senha);

    const payload = {sub: usuario.id, nome: usuario.nome, role: usuario.role};

    return {
      access_token: this.jwt.sign(payload)
    };
  }

  async seguirJWtParaUsuario(usuario: Usuario) {
    const payload = {sub: usuario.id, nome: usuario.nome, role: usuario.role};
    return this.jwt.sign(payload);
  }
}
