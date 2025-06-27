import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Saga extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({ trim: true })
  description: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug: string;
}

export const SagaSchema = SchemaFactory.createForClass(Saga);

SagaSchema.pre('validate', function (next) {
  if (this.isModified('name')) this.slug = slugify(this.name);

  next();
});

SagaSchema.index({ createdAt: -1 });
