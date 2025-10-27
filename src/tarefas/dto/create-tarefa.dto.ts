import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { Transform} from 'class-transformer';

export class CreateTarefaDto {
    @ApiProperty({ example: 'Ensaio', description: 'Nome da tarefa' })
    @IsString()
    @IsNotEmpty()
    nome_tarefa: string;

    @ApiProperty({ example: 'João Silva', description: 'Responsável pela tarefa' })
    @IsString()
    @IsNotEmpty()
    responsavel: string;

    @ApiProperty({ example: '20/10/2025', description: 'Data de início da tarefa', required: false })
    @IsOptional()
    @Transform(({value}) => {
          if (!value) return undefined;
        const [dia, mes, ano] = value.split('/');
        return new Date(`${ano}-${mes}-${dia}`);
    })
    @IsDate()
    data_inicio?: Date;
    
    @ApiProperty({ example: '31/10/2025', description: 'Data de entrega da tarefa' })
    @Transform(({value}) => {
          if (!value) return undefined;
        const [dia, mes, ano] = value.split('/');
        return new Date(`${ano}-${mes}-${dia}`);
    })
    @IsDate()
    data_entrega: Date;

    @ApiProperty({ example: 'Finalizar o ensaio para o evento X', description: 'Objetivo da tarefa' })
    @IsString()
    @IsNotEmpty()
    objetivo: string;

    @ApiProperty({ example: 'PENDENTE', description: 'Status da tarefa', required: false })
    @IsOptional()
    @IsEnum(['PENDENTE', 'EM_ANDAMENTO', 'CONCLUIDO'])
    status?: 'PENDENTE' | 'EM_ANDAMENTO' | 'CONCLUIDO';

}
