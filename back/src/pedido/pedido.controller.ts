import { Controller, Post, Body } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Get, Param } from '@nestjs/common';
import { CriarPedidoDto } from 'src/dtos/criar-pedido.dto';

@Controller('pedidos')
export class PedidoController {

    constructor(private pedidoService: PedidoService) {}

    @Get("/colunas")
    async listarColunas() {
        return this.pedidoService.listarColunas();
    }

    @Get("/criar/:playerId/:produtoId/:quantidade/:valor_total")
    async criarPedido(playerId: number, produtoId: number, quantidade: number, valor_total: number) {
        return this.pedidoService.criarPedido({
            clienteId: playerId,
            produtoId: produtoId,
            quantidade_total: quantidade,
            valor_total: valor_total
        });
    }

    @Post("/criar")
    async criarPedidoPost(@Body() pedido: any) {
        pedido.clienteId = Number(pedido.clienteId);
        pedido.produtoId = Number(pedido.produtoId);
        pedido.quantidade = Number(pedido.quantidade);
        pedido.valor_total = Number(pedido.valor_total);
        return this.pedidoService.criarPedido(pedido);
    }

    @Get("/listar")
    async listarPedidos() {
        return this.pedidoService.listarPedidos();
    }

    @Get("/deletar/:id")
    async deletarPedido(id: number) {
        return this.pedidoService.deletarPedido(id);
    }

    @Get("/atualizar/:id/:playerId/:produtoId/:quantidade/:valor_total")
    async atualizarPedido(id: number, playerId: number, produtoId: number, quantidade: number, valor_total: number) {
        return this.pedidoService.atualizarPedido(id, {
            clienteId: playerId,
            produtoId: produtoId,
            quantidade_total: quantidade,
            valor_total: valor_total
        });
    }

    @Get("/buscar/:id")
    async buscarPedidoPorId(id: number) {
        return this.pedidoService.buscarPedidoPorId(id);
    }

    @Get("/buscar/cliente/:id")
    async buscarPedidoPorClienteId(id: number) {
        return this.pedidoService.listarPedidosPorCliente(id);
    }

    @Get("/buscar/produto/:id")
    async buscarPedidoPorProdutoId(id: number) {
        return this.pedidoService.listarPedidosPorProduto(id);
    }

    @Get("/verificar/:clienteId/:produtoId")
    async verificarPedido(@Param('clienteId') clienteId: number, @Param('produtoId') produtoId: number) {
        return this.pedidoService.verificarPedido(clienteId, produtoId);
    }
}
