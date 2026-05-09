import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VehiculoService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: {
        marca: string;
        modelo: string;
        color: string;
        placa: string;
        tipo: string;
        conductorId: number;
    }) {
        return this.prisma.vehiculo.create({ data });
    }

    findAll() {
        return this.prisma.vehiculo.findMany({
            include: { conductor: true },
        });
    }

    async detail(id: number) {
        const vehiculo = await this.prisma.vehiculo.findUnique({
            where: { id },
            include: { conductor: true },
        });

        if (!vehiculo) throw new NotFoundException('Vehículo no existe');
        return vehiculo;
    }

    update(
        id: number,
        data: {
            marca?: string;
            modelo?: string;
            color?: string;
            placa?: string;
            tipo?: string;
            conductorId?: number;
        },
    ) {
        return this.prisma.vehiculo.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.vehiculo.delete({
            where: { id },
        });
    }
}