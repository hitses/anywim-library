import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { Saga } from './entities/saga.entity';
import { CreateSagaDto } from './dto/create-saga.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/_core/common/methods/errors';

@Injectable()
export class SagaService {
  constructor(
    @InjectModel(Saga.name)
    private readonly sagaModel: Model<Saga>,
  ) {}

  async create(createSagaDto: CreateSagaDto) {
    try {
      const saga = new this.sagaModel(createSagaDto);

      return await saga.save();
    } catch (error) {
      createErrorResponse('Saga', error);
    }
  }

  async findAll() {
    return await this.sagaModel.find();
  }

  async findOne(id: string) {
    const saga = await this.sagaModel.findById(id);

    if (!saga) throw new Error('Saga not found');

    return saga;
  }

  async update(id: string, updateSagaDto: UpdateSagaDto) {
    const slug = slugify(updateSagaDto.name!);

    try {
      return await this.sagaModel.findOneAndUpdate(
        { _id: id },
        { ...updateSagaDto, slug },
        { new: true },
      );
    } catch (error) {
      updateErrorResponse('Saga', error);
    }
  }

  async remove(id: string) {
    return await this.sagaModel.findByIdAndDelete(id);
  }
}
