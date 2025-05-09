import { Controller } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CriarClienteDto } from 'src/dtos/criar-cliente.dto';   

@Controller('clientes')
export class ClienteController {

    constructor(private clienteService: ClienteService) {}

    // Versão com DTO, utilizada em requisições POST
    @Post("/criar")
    async criarCliente(@Body() params: CriarClienteDto) {
        const { nome, idade } = params;
        return await this.clienteService.criarCliente({ nome, idade });
    }

    // Versão com parâmetros de URL ou interfaces, utilizada em requisições GET
    @Get("/criar/:nome/:idade")
    async criarClienteParams(@Param('nome') nome: string, @Param('idade') idade: number) {
        idade = Number(idade);
        return await this.clienteService.criarCliente({ nome, idade });
    }

}
