import { Controller, Param } from '@nestjs/common';
import { Get, Post } from '@nestjs/common';
import { ProdutoService } from './produto.service';

@Controller('produtos')
export class ProdutoController {

    constructor(private produtoService: ProdutoService) {}

    @Get("/colunas")
    async listarColunas() {
        return await this.produtoService.listarColunas();
    }

    @Get("/listar")
    async listarProdutos() {
        return await this.produtoService.listarProdutos();
    }

    @Get("/criar/:nome/:descricao/:valor/:quantidade")
    async criarProduto(
        @Param('nome') nome: string, 
        @Param('descricao') descricao: string, 
        @Param('valor') valor: number, 
        @Param('quantidade') quantidade: number
    ) {
        return await this.produtoService.criarProduto({ nome, descricao, valor, quantidade });
    }

    @Get("/deletar/:id")
    async deletarProduto(@Param('id') id: number) {
        return await this.produtoService.deletarProduto(id);
    }

    @Get("/atualizar/:id/:nome/:descricao/:valor/:quantidade")
    async atualizarProduto(
        @Param('id') id: number, 
        @Param('nome') nome: string,
        @Param('descricao') descricao: string,
        @Param('valor') valor: number,
        @Param('quantidade') quantidade: number
    ) {
        return await this.produtoService.atualizarProduto(id, { nome, descricao, valor, quantidade });
    }

    @Get("/listarPorId/:id")
    async listarProdutoPorId(@Param('id') id: number) {
        return await this.produtoService.buscarProdutoPorId(id);
    }

    @Get("/listarPorNome/:nome")
    async listarProdutoPorNome(@Param('nome') nome: string) {
        return await this.produtoService.buscarProdutoPorNome(nome);
    }
}
