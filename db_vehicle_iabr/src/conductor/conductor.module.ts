import { Module } from '@nestjs/common';
import { ConductorService } from './conductor.service';
import { ConductorController } from './conductor.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [ConductorController],
  providers: [ConductorService, PrismaService],
})
export class ConductorModule { }