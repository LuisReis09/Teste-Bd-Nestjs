import { Controller } from '@nestjs/common';
import { Get, Post, Body, Param } from '@nestjs/common';
import { ClienteService } from './cliente.service';
import { CriarClienteDto } from 'src/dtos/criar-cliente.dto';   

@Controller('clientes')
export class ClienteController {

    constructor(private clienteService: ClienteService) {}

    @Get("/colunas")
    async colunas() {
        return await this.clienteService.listarColunas();
    }


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

    @Get("/listar")
    async listarClientes() {
        return await this.clienteService.listarClientes();
    }

    @Get("/deletar/:id")
    async deletarCliente(@Param('id') id: number) {
        return await this.clienteService.deletarCliente(id);
    }

    @Get("/atualizar/:id/:nome/:idade")
    async atualizarCliente(@Param('id') id: number, @Param('nome') nome: string, @Param('idade') idade: number) {
        idade = Number(idade);
        return await this.clienteService.atualizarCliente(id, { nome, idade });
    }

    @Post("/atualizar")
    async atualizarClientePost(@Body() params: CriarClienteDto) {
        const { id, nome, idade } = params;
        if (!id) {
            throw new Error("ID não pode ser vazio");
        }
        return await this.clienteService.atualizarCliente(id, { nome, idade });
    }

    @Get("/listarPorIdade/:idade")
    async listarClientesPorIdade(@Param('idade') idade: number) {
        idade = Number(idade);
        return await this.clienteService.buscarClientePorIdade(idade);
    }

    @Get("/listarPorNome/:nome")
    async listarClientesPorNome(@Param('nome') nome: string) {
        return await this.clienteService.buscarClientePorNome(nome);
    }
}
