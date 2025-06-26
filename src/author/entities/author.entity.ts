import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import slugify from 'slugify';

@Schema({ timestamps: true })
export class Author extends Document {
  declare _id: mongoose.Types.ObjectId;

  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  lastname: string;

  @Prop({ trim: true })
  image: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  slug: string;

  @Prop({
    required: true,
    trim: true,
  })
  fullName: string;
}

export const AuthorSchema = SchemaFactory.createForClass(Author);

AuthorSchema.pre('validate', function (next) {
  if (this.isModified('name') || this.isModified('lastname')) {
    this.fullName = `${this.name} ${this.lastname}`.trim();
    this.slug = slugify(this.fullName);
  }

  next();
});

AuthorSchema.index({ fullName: 1 });
AuthorSchema.index({ createdAt: -1 });
