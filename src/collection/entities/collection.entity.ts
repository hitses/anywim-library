import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Collection extends Document {
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

export const CollectionSchema = SchemaFactory.createForClass(Collection);

CollectionSchema.pre('validate', function (next) {
  if (this.isModified('name')) this.slug = slugify(this.name);

  next();
});
