import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Category extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);

CategorySchema.pre('validate', function (next) {
  if (this.isModified('name')) {
    this.slug = slugify(this.name);
  }

  next();
});
