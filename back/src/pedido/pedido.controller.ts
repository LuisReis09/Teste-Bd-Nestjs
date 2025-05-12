import { Controller } from '@nestjs/common';
import { PedidoService } from './pedido.service';
import { Get } from '@nestjs/common';

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

}
