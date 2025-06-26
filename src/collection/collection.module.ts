import { Module } from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CollectionController } from './collection.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Collection, CollectionSchema } from './entities/collection.entity';

@Module({
  controllers: [CollectionController],
  providers: [CollectionService],
  imports: [
    MongooseModule.forFeature([
      { name: Collection.name, schema: CollectionSchema },
    ]),
  ],
})
export class CollectionModule {}
