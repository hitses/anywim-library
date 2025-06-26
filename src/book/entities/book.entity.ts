import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Book extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({
    required: true,
    unique: true,
  })
  code: number;

  @Prop({
    required: true,
    unique: true,
    trim: true,
  })
  isbn: string;

  @Prop({
    required: true,
    trim: true,
  })
  title: string;

  @Prop()
  image?: string;

  @Prop({
    required: true,
    min: 1,
  })
  copies: number;

  @Prop({
    required: true,
    default: false,
  })
  isLoaned: boolean;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug: string;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'State',
    required: true,
  })
  state: mongoose.Types.ObjectId;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Place',
    required: true,
  })
  place: mongoose.Types.ObjectId;

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Author',
    required: true,
    validate: (val: mongoose.Types.ObjectId[]) => val.length > 0,
  })
  authors: mongoose.Types.ObjectId[];

  @Prop({
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
  })
  categories: mongoose.Types.ObjectId[];

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Collection',
  })
  collection_id?: mongoose.Types.ObjectId;

  @Prop()
  order_in_collection?: number;
}

export const BookSchema = SchemaFactory.createForClass(Book);

BookSchema.pre('validate', function (next) {
  if (this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }

  next();
});

BookSchema.index({ title: 1 });
BookSchema.index({ state: 1 });
BookSchema.index({ place: 1 });
BookSchema.index({ authors: 1 });
BookSchema.index({ categories: 1 });
BookSchema.index({ collection_id: 1 });
BookSchema.index({ collection_id: 1, order_in_collection: 1 });
BookSchema.index({ isLoaned: 1 });
BookSchema.index({ createdAt: -1 });
