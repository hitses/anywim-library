import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';

@Injectable()
export class StateService {
  constructor(
    @InjectModel(State.name)
    private readonly stateModel: Model<State>,
  ) {}

  async create(createStateDto: CreateStateDto) {
    try {
      const state = new this.stateModel(createStateDto);

      return await state.save();
    } catch (error) {
      createErrorResponse('State', error);
    }
  }

  async findAll() {
    return await this.stateModel.find();
  }

  async findOne(id: string) {
    const state = await this.stateModel.findById(id);

    if (!state) throw new NotFoundException('State not found');

    return state;
  }

  async findOneByName(name: string) {
    const state = await this.stateModel.findOne({ name });

    if (!state) throw new NotFoundException('State not found');

    return state;
  }

  async update(id: string, updateStateDto: UpdateStateDto) {
    const slug = slugify(updateStateDto.name!);

    try {
      return await this.stateModel.findOneAndUpdate(
        { _id: id },
        { ...updateStateDto, slug },
        { new: true },
      );
    } catch (error) {
      updateErrorResponse('State', error);
    }
  }

  async remove(id: string) {
    return await this.stateModel.findByIdAndDelete(id);
  }
}
