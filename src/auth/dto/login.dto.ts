import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, MinLength } from 'class-validator';

export class LoginDto {
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