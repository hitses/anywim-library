import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './entities/loan.entity';
import { BookModule } from 'src/book/book.module';
import { Book, BookSchema } from 'src/book/entities/book.entity';
import { StateModule } from 'src/state/state.module';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [
    MongooseModule.forFeature([
      { name: Loan.name, schema: LoanSchema },
      { name: Book.name, schema: BookSchema },
    ]),
    BookModule,
    StateModule,
  ],
})
export class LoanModule {}
