import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CriarPedidoDto } from 'src/dtos/criar-pedido.dto';

@Injectable()
export class PedidoService {

    constructor(private prisma: PrismaService) {}

    async criarPedido(pedido: CriarPedidoDto) {
        let { clienteId, produtoId, quantidade_total, valor_total } = pedido;
        let ret = await this.prisma.pedido.create({
            data: {
                cliente: {
                    connect: {
                        id: clienteId
                    }
                },
                produto: {
                    connect: {
                        id: produtoId
                    }
                },
                quantidade: quantidade_total ?? 1,
                valor_total: valor_total ?? 0
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async listarPedidos() {
        let ret = await this.prisma.pedido.findMany();

        return ret.map(pedido => ({
            ...pedido,
            id: pedido.id.toString(),
        }));
    }

    async deletarPedido(id: number) {
        let ret = await this.prisma.pedido.delete({
            where: {
                id: id
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async atualizarPedido(id: number, pedido: CriarPedidoDto) {
        let { clienteId, produtoId, quantidade_total, valor_total } = pedido;
        let ret = await this.prisma.pedido.update({
            where: {
                id: id
            },
            data: {
                cliente: {
                    connect: {
                        id: clienteId
                    }
                },
                produto: {
                    connect: {
                        id: produtoId
                    }
                },
                quantidade: quantidade_total,
                valor_total: valor_total
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async buscarPedidoPorId(id: number) {
        let ret = await this.prisma.pedido.findUnique({
            where: {
                id: id
            }
        });

        if(!ret){
            return [];
        }

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async buscarPedidoPorNome(nome: string) {
        let ret = await this.prisma.pedido.findMany({
            where: {
                cliente: {
                    nome: {
                        contains: nome,
                        mode: 'insensitive'
                    }
                }
            }
        });

        return ret.map(pedido => ({
            ...pedido,
            id: pedido.id.toString(),
        }));
    }

    async listarColunas() {
        let cols: [] = await this.prisma.$queryRaw`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Pedido'`;
        return cols.map((col: any) => col.column_name);
    }

    async listarPedidosPorCliente(clienteId: number) {
        let ret = await this.prisma.pedido.findMany({
            where: {
                clienteId: clienteId
            }
        });

        return ret.map(pedido => ({
            ...pedido,
            id: pedido.id.toString(),
        }));
    }

    async listarPedidosPorProduto(produtoId: number) {
        let ret = await this.prisma.pedido.findMany({
            where: {
                produtoId: produtoId
            }
        });

        return ret.map(pedido => ({
            ...pedido,
            id: pedido.id.toString(),
        }));
    }
}
