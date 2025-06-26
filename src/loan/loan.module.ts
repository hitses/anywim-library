import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Loan, LoanSchema } from './entities/loan.entity';

@Module({
  controllers: [LoanController],
  providers: [LoanService],
  imports: [
    MongooseModule.forFeature([{ name: Loan.name, schema: LoanSchema }]),
  ],
})
export class LoanModule {}
