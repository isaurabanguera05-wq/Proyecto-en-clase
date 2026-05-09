import { Body, Controller, Delete, Get, Param, ParseIntPipe, Post, Put, Patch } from '@nestjs/common';
import { ConductorService } from './conductor.service';

@Controller('conductor')
export class ConductorController {
    constructor(private readonly service: ConductorService) { }

    @Post()
    create(@Body() body: any) {
        return this.service.create(body);
    }

    @Get()
    findAll() {
        return this.service.findAll();
    }

    @Get(':id')
    detail(@Param('id', ParseIntPipe) id: number) {
        return this.service.detail(id);
    }

    @Put(':id')
    update(@Param('id', ParseIntPipe) id: number, @Body() body: any) {
        return this.service.update(id, body);
    }



    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
        return this.service.remove(id);
    }

    @Patch(':conductorId/vehiculos/:vehiculoId')
    removeVehiculo(
        @Param('conductorId') conductorId: string,
        @Param('vehiculoId') vehiculoId: string,
    ) {
        return this.service.removeVehiculo(
            +conductorId,
            +vehiculoId,
        );
    }
}