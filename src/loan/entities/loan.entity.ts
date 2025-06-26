import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Loan extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  })
  book: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    trim: true,
  })
  person: string;

  @Prop({
    required: true,
  })
  loan_date: Date;

  @Prop()
  return_date?: Date;
}

export const LoanSchema = SchemaFactory.createForClass(Loan);

LoanSchema.index({ book_id: 1, return_date: 1 });
LoanSchema.index({ person: 1, return_date: 1 });
LoanSchema.index({ loan_date: -1 });
