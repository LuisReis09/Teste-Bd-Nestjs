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

}
