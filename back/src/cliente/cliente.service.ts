import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CriarClienteDto } from 'src/dtos/criar-cliente.dto';

@Injectable()
export class ClienteService {
    constructor(private prisma: PrismaService) {}
    
    async criarCliente(cliente: CriarClienteDto) {
        let ret = await this.prisma.cliente.create({
            data: {
                nome: cliente.nome,
                idade: cliente.idade
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async listarClientes() {
        let ret = await this.prisma.cliente.findMany();

        return ret.map(cliente => ({
            ...cliente,
            id: cliente.id.toString(),
        }));
    }

    async deletarCliente(id: number) {
        let ret = await this.prisma.cliente.delete({
            where: {
                id: id
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async atualizarCliente(id: number, cliente: CriarClienteDto) {
        let ret = await this.prisma.cliente.update({
            where: {
                id: id
            },
            data: {
                nome: cliente.nome,
                idade: cliente.idade
            }
        });

        return {
            ...ret,
            id: ret.id.toString(),
        }
    }

    async buscarClientePorNome(nome: string) {
        let ret = await this.prisma.cliente.findMany({
            where: {
                nome: {
                    contains: nome,
                    mode: 'insensitive'
                }
            }
        });

        return ret.map(cliente => ({
            ...cliente,
            id: cliente.id.toString(),
        }));
    }

    async buscarClientePorIdade(idade: number) {
        let ret = await this.prisma.cliente.findMany({
            where: {
                idade: idade
            }
        });

        return ret.map(cliente => ({
            ...cliente,
            id: cliente.id.toString(),
        }));
    }

    async listarColunas() {
        let cols: [] = await this.prisma.$queryRaw`SELECT COLUMN_NAME FROM INFORMATION_SCHEMA.COLUMNS WHERE TABLE_NAME = 'Cliente'`;
        return cols.map((col: any) => col.column_name);
    }

}
