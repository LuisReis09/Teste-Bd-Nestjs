import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CriarPedidoDto {
    id?: number;

    @IsNotEmpty({
        message: 'O cliente não pode ser vazio'
    })
    @IsNumber({}, {
        message: 'O id do cliente deve ser informado'
    })
    clienteId: number;

    @IsNotEmpty({
        message: 'O produto não pode ser vazio'
    })
    @IsNumber({}, {
        message: 'O id do produto deve ser informado'
    })
    produtoId: number;

    quantidade_total?: number;
    valor_total?: number;
}