import { ApiProperty } from "@nestjs/swagger";
import { Role } from "@prisma/client";
import { IsEmail, IsEnum, IsNotEmpty, IsString } from "class-validator";

export class CreateUsuarioDto {
    @ApiProperty({ example: 'Maria Souza', description: 'Nome completo do usuário' })   
    @IsString()
    @IsNotEmpty()

    nome: string;
    @ApiProperty({ example: 'example@mail.com', description: 'Email do usuário' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'senhaSegura123', description: 'Senha do usuário' })
    @IsString()
    @IsNotEmpty()
    senha: string;

    @ApiProperty({ example: 'USER', description: 'Papel do usuário no sistema' })
    @IsNotEmpty()
    @IsEnum(Role)
    role: Role

}
