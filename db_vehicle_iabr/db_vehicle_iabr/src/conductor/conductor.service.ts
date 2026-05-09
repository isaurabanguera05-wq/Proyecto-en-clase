import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class ConductorService {
    constructor(private readonly prisma: PrismaService) { }

    create(data: {
        nombre: string;
        documento: string;
        telefono?: string;
    }) {
        return this.prisma.conductor.create({ data });
    }

    findAll() {
        return this.prisma.conductor.findMany({
            include: { vehiculos: true },
        });
    }

    async detail(id: number) {
        const conductor = await this.prisma.conductor.findUnique({
            where: { id },
            include: { vehiculos: true },
        });

        if (!conductor) throw new NotFoundException('Conductor no existe');
        return conductor;
    }

    update(
        id: number,
        data: {
            nombre?: string;
            documento?: string;
            telefono?: string;
        },
    ) {
        return this.prisma.conductor.update({
            where: { id },
            data,
        });
    }

    remove(id: number) {
        return this.prisma.conductor.delete({
            where: { id },
        });
    }

    async removeVehiculo(
        conductorId: number,
        vehiculoId: number,
    ) {

        // Buscar vehículo del conductor
        const vehiculo = await this.prisma.vehiculo.findFirst({
            where: {
                id: vehiculoId,
                conductorId,
            },
        });

        // Validar existencia
        if (!vehiculo) {
            throw new NotFoundException(
                'Vehículo no encontrado para este conductor',
            );
        }

        // Quitar relación
        return this.prisma.vehiculo.update({
            where: {
                id: vehiculoId,
            },
            data: {
                conductorId: null,
            },
        });
    }
}