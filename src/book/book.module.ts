import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { Counter, CounterSchema } from './entities/counter.entity';
import { StateModule } from 'src/state/state.module';

@Module({
  controllers: [BookController],
  providers: [BookService],
  imports: [
    MongooseModule.forFeature([
      { name: Book.name, schema: BookSchema },
      { name: Counter.name, schema: CounterSchema },
    ]),
    StateModule,
  ],
  exports: [BookService],
})
export class BookModule {}
