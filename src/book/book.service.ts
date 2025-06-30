import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ClientSession, Model } from 'mongoose';
import { Book } from './entities/book.entity';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';
import { Counter } from './entities/counter.entity';
import slugify from 'slugify';
import { State } from 'src/state/entities/state.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectModel(Book.name) private readonly bookModel: Model<Book>,
    @InjectModel(Counter.name) private readonly counterModel: Model<Counter>,
  ) {}

  async create(createBookDto: CreateBookDto) {
    const defaultImage =
      'https://placehold.co/400x600/webp?text=Image+not+found&font=roboto';

    try {
      const nextCode = await this.getNextBookCode();
      const image = createBookDto.image ?? defaultImage;

      const book = new this.bookModel({
        ...createBookDto,
        image,
        code: nextCode,
      });

      return await book.save();
    } catch (error) {
      createErrorResponse('Book', error);
    }
  }

  async findAll() {
    return await this.bookModel.find();
  }

  async findOne(id: string) {
    const book = await this.bookModel
      .findById(id)
      .populate('state place authors categories');

    if (!book) throw new NotFoundException('Book not found');

    return book;
  }

  async update(id: string, updateBookDto: UpdateBookDto) {
    try {
      const updateData: UpdateBookDto = { ...updateBookDto };

      if (updateBookDto.title) {
        updateData.slug = slugify(updateBookDto.title);
      }

      return await this.bookModel.findOneAndUpdate({ _id: id }, updateData, {
        new: true,
      });
    } catch (error) {
      updateErrorResponse('Book', error);
    }
  }

  async remove(id: string) {
    return await this.bookModel.findByIdAndDelete(id);
  }

  async changeBookState(id: string, newState: State, session: ClientSession) {
    try {
      return await this.bookModel.findOneAndUpdate(
        { _id: id },
        { state: newState._id },
        { new: true, session },
      );
    } catch (error) {
      updateErrorResponse('Book', error);
    }
  }

  private async getNextBookCode(): Promise<number> {
    const counter = await this.counterModel.findOneAndUpdate(
      { name: 'book_code' },
      { $inc: { seq: 1 } },
      { new: true, upsert: true },
    );

    return counter.seq;
  }
}
