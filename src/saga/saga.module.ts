import { Module } from '@nestjs/common';
import { SagaService } from './saga.service';
import { SagaController } from './saga.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Saga, SagaSchema } from './entities/saga.entity';

@Module({
  controllers: [SagaController],
  providers: [SagaService],
  imports: [
    MongooseModule.forFeature([{ name: Saga.name, schema: SagaSchema }]),
  ],
})
export class SagaModule {}
