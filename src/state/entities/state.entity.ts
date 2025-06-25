import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

@Schema({ timestamps: true })
export class State extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    enum: ['available', 'loaned', 'reading'],
  })
  name: string;
}

export const StateSchema = SchemaFactory.createForClass(State);
