import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';
import { createErrorResponse } from 'src/_core/common/methods/errors';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name)
    private readonly readingModel: Model<Reading>,
  ) {}

  async create(createReadingDto: CreateReadingDto) {
    try {
      const reading = new this.readingModel(createReadingDto);

      return await reading.save();
    } catch (error) {
      createErrorResponse('Reading', error);
    }
  }

  async findAll() {
    return await this.readingModel.find();
  }

  async findOne(id: string) {
    const reading = await this.readingModel.findById(id);

    if (!reading) throw new NotFoundException('Reading not found');

    return reading;
  }

  async update(id: string, updateReadingDto: UpdateReadingDto) {
    delete updateReadingDto.user;
    delete updateReadingDto.book;

    try {
      return await this.readingModel.findOneAndUpdate(
        { _id: id },
        { ...updateReadingDto },
        { new: true },
      );
    } catch (error) {
      createErrorResponse('Reading', error);
    }
  }

  async remove(id: string) {
    return await this.readingModel.findByIdAndDelete(id);
  }
}
