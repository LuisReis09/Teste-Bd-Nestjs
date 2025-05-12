import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CriarProdutoDto } from 'src/dtos/criar-produto.dto';

@Injectable()
export class ProdutoService {

    constructor(private prisma: PrismaService) {}

    async criarProduto(params: CriarProdutoDto) {
        const { nome, descricao, valor, quantidade} = params;
        return await this.prisma.produto.create({
            data: {
                nome,
                descricao,
                preco: valor,
                quantidade: quantidade ?? 1
            }
        });
    }

    async listarProdutos() {
        return await this.prisma.produto.findMany();
    }

    async deletarProduto(id: number) {
        return await this.prisma.produto.delete({
            where: {
                id
            }
        });
    }

    async atualizarProduto(id: number, params: CriarProdutoDto) {
        const { nome, descricao, valor, quantidade} = params;
        return await this.prisma.produto.update({
            where: {
                id
            },
            data: {
                nome,
                descricao,
                preco: valor,
                quantidade
            }
        });
    }

    async buscarProdutoPorId(id: number) {
        return await this.prisma.produto.findUnique({
            where: {
                id
            }
        });
    }

    async buscarProdutoPorNome(nome: string) {
        return await this.prisma.produto.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: 'insensitive'
                }
            }
        });
    }

    async listarColunas() {
        let cols: [] = await this.prisma.$queryRaw`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Produto'`;
        return cols.map((col: any) => col.column_name);
    }

}
