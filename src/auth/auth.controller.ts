import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiBody, ApiConflictResponse, ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { LoginResponseDto } from './dto/login-response.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({ type: RegisterDto})
  @ApiCreatedResponse({ description: 'Usuário registrado com sucesso.'})
  @ApiConflictResponse({ description: 'Email já cadastrado.'})
  async register (@Body() usuarioData: RegisterDto) {
    return this.authService.register(usuarioData);
  }

  @Post('login')
  async login (@Body() credenciais: LoginDto): Promise<LoginResponseDto> {
    return this.authService.login(credenciais);
  }

}
