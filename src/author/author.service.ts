import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { Author } from './entities/author.entity';
import { CreateAuthorDto } from './dto/create-author.dto';
import { UpdateAuthorDto } from './dto/update-author.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';

@Injectable()
export class AuthorService {
  constructor(
    @InjectModel(Author.name)
    private readonly authorModel: Model<Author>,
  ) {}

  async create(createAuthorDto: CreateAuthorDto) {
    try {
      const author = new this.authorModel(createAuthorDto);

      return await author.save();
    } catch (error) {
      createErrorResponse('Author', error);
    }
  }

  async findAll() {
    return await this.authorModel.find();
  }

  async findOne(id: string) {
    const author = await this.authorModel.findById(id);

    if (!author) throw new NotFoundException('Author not found');

    return author;
  }

  async update(id: string, updateAuthorDto: UpdateAuthorDto) {
    const fullName =
      `${updateAuthorDto.name?.toLocaleLowerCase()} ${updateAuthorDto.lastname?.toLocaleLowerCase()}`.trim();
    const slug = slugify(fullName);

    try {
      return await this.authorModel.findOneAndUpdate(
        { _id: id },
        { ...updateAuthorDto, fullName, slug },
        { new: true },
      );
    } catch (error) {
      updateErrorResponse('Author', error);
    }
  }

  async remove(id: string) {
    return await this.authorModel.findByIdAndDelete(id);
  }
}
