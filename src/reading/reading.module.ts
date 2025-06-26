import { Module } from '@nestjs/common';
import { ReadingService } from './reading.service';
import { ReadingController } from './reading.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Reading, ReadingSchema } from './entities/reading.entity';

@Module({
  controllers: [ReadingController],
  providers: [ReadingService],
  imports: [
    MongooseModule.forFeature([{ name: Reading.name, schema: ReadingSchema }]),
  ],
  exports: [ReadingService],
})
export class ReadingModule {}
