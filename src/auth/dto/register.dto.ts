import { IsEmail, IsEnum, IsString, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class RegisterDto {
  @ApiProperty({
    description: 'Nome do usuário',
    example: 'John Doe'
  })
  @IsString()
  nome: string;

  @ApiProperty({
    description: 'Email do usuário',
    example: 'john@gmail.com'
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    description: 'Senha do usuário',
    minLength: 6,
    example: 'password123'
  })
  @IsString()
  @MinLength(6)
  senha: string;
}