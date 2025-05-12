import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CriarProdutoDto {

    id?: number;

    @IsNotEmpty({
        message: 'O nome não pode ser vazio'
    })
    @IsString({
        message: 'O nome deve ser uma string'
    })
    nome: string;

    descricao?: string;

    @IsNotEmpty({
        message: 'A valor não pode ser vazio'
    })
    @IsNumber({}, {
        message: 'A valor deve ser um número'
    })
    valor: number;

    quantidade?: number;
}