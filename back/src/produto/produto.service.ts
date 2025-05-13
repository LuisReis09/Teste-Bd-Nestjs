import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CriarProdutoDto } from 'src/dtos/criar-produto.dto';

@Injectable()
export class ProdutoService {

    constructor(private prisma: PrismaService) {}

    async criarProduto(params: CriarProdutoDto) {
        const { nome, descricao, preco, quantidade} = params;
        let ped = await this.prisma.produto.create({
            data: {
                nome,
                descricao,
                quantidade: quantidade ?? 1,
                preco: preco,
            }
        });

        return {
            ...ped,
            id: ped.id.toString(),
        }
    }

    async listarProdutos() {
        let prods = await this.prisma.produto.findMany();

        return prods.map((p: any) => {
            return {
                ...p,
                id: p.id.toString(),
            }
        });
    }

    async deletarProduto(id: number) {
        let prod = await this.prisma.produto.delete({
            where: {
                id
            }
        });

        return {
            ...prod,
            id: prod.id.toString(),
        }
    }

    async atualizarProduto(id: number, params: CriarProdutoDto) {
        const { nome, descricao, preco, quantidade} = params;
        let prod = await this.prisma.produto.update({
            where: {
                id
            },
            data: {
                nome,
                descricao,
                preco: preco,
                quantidade
            }
        });

        return {
            ...prod,
            id: prod.id.toString(),
        }
    }

    async buscarProdutoPorId(id: number) {
        let prods = await this.prisma.produto.findUnique({
            where: {
                id
            }
        });

        if(!prods) {
            return [];
        }

        return {
            ...prods,
            id: prods.id.toString(),
        }
    }

    async buscarProdutoPorNome(nome: string) {
        let prod = await this.prisma.produto.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: 'insensitive'
                }
            }
        });

        if(!prod) {
            return [];
        }

        return prod.map((p: any) => {
            return {
                ...p,
                id: p.id.toString(),
            }
        });
    }

    async listarColunas() {
        let cols: [] = await this.prisma.$queryRaw`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Produto'`;
        return cols.map((col: any) => col.column_name);
    }

}
