import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { VehiculoModule } from './vehiculo/vehiculo.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config'
import { ConductorModule } from './conductor/conductor.module';

@Module({
  imports: [VehiculoModule, PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    ConductorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }