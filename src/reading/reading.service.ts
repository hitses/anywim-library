import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Reading } from './entities/reading.entity';
import { CreateReadingDto } from './dto/create-reading.dto';
import { UpdateReadingDto } from './dto/update-reading.dto';

@Injectable()
export class ReadingService {
  constructor(
    @InjectModel(Reading.name)
    private readonly readingModel: Model<Reading>,
  ) {}

  create(createReadingDto: CreateReadingDto) {
    return 'This action adds a new reading';
  }

  findAll() {
    return `This action returns all reading`;
  }

  findOne(id: number) {
    return `This action returns a #${id} reading`;
  }

  update(id: number, updateReadingDto: UpdateReadingDto) {
    return `This action updates a #${id} reading`;
  }

  remove(id: number) {
    return `This action removes a #${id} reading`;
  }

  async updateIndexes() {
    try {
      await this.readingModel.syncIndexes();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating reading indexes',
        error,
      );
    }
  }
}
