import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class Reading extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  })
  user_id: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Book',
    required: true,
  })
  book_id: mongoose.Types.ObjectId;

  @Prop()
  date?: Date;

  @Prop()
  notes?: string;

  @Prop({
    min: 1,
    max: 5,
  })
  rating?: number;
}

export const ReadingSchema = SchemaFactory.createForClass(Reading);
