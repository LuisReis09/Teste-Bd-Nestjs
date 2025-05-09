import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CriarClienteDto {

    @IsNotEmpty({
        message: 'O nome não pode ser vazio'
    })
    @IsString({
        message: 'O nome deve ser uma string'
    })
    nome: string;

    @IsNotEmpty({
        message: 'A idade não pode ser vazia'
    })
    @IsNumber({}, {
        message: 'A idade deve ser um número'
    })
    idade: number;
}
