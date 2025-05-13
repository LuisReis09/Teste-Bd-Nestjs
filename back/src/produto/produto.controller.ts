import { Controller, Param } from '@nestjs/common';
import { Get, Post, Body } from '@nestjs/common';
import { ProdutoService } from './produto.service';
import { CriarProdutoDto } from 'src/dtos/criar-produto.dto';

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

    @Get("/criar/:nome/:descricao/:preco/:quantidade")
    async criarProduto(
        @Param('nome') nome: string, 
        @Param('descricao') descricao: string, 
        @Param('preco') preco: number, 
        @Param('quantidade') quantidade: number
    ) {
        return await this.produtoService.criarProduto({ nome, descricao, preco, quantidade });
    }

    @Post("/criar")
    async criarProdutoPost(@Body() produto: any) {
        console.log(produto);
        produto.preco = Number(produto.preco);
        produto.quantidade = Number(produto.quantidade);
        produto.descricao = produto.descricao ?? "";
        produto.nome = produto.nome ?? "";

        return await this.produtoService.criarProduto(produto);
    }

    @Get("/deletar/:id")
    async deletarProduto(@Param('id') id: number) {
        return await this.produtoService.deletarProduto(id);
    }

    @Get("/atualizar/:id/:nome/:descricao/:preco/:quantidade")
    async atualizarProduto(
        @Param('id') id: number, 
        @Param('nome') nome: string,
        @Param('descricao') descricao: string,
        @Param('preco') preco: number,
        @Param('quantidade') quantidade: number
    ) {
        return await this.produtoService.atualizarProduto(id, { nome, descricao, preco, quantidade });
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
