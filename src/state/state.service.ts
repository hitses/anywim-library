import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { InjectModel } from '@nestjs/mongoose';
import { State } from './entities/state.entity';
import { Model } from 'mongoose';

@Injectable()
export class StateService {
  constructor(
    @InjectModel(State.name)
    private readonly stateModel: Model<State>,
  ) {}

  async create(createStateDto: CreateStateDto) {
    const { name } = createStateDto;

    try {
      const state = new this.stateModel({ name });

      return await state.save();
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('State already exists');

      throw new InternalServerErrorException('Error creating state', error);
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

  async update(id: string, updateStateDto: UpdateStateDto) {
    try {
      return await this.stateModel.findOneAndUpdate(
        { _id: id },
        { ...updateStateDto },
        { new: true },
      );
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('State already exists');

      throw new InternalServerErrorException('Error updating state', error);
    }
  }

  async remove(id: string) {
    return await this.stateModel.findByIdAndDelete(id);
  }

  async updateIndexes() {
    try {
      await this.stateModel.syncIndexes();
    } catch (error) {
      throw new InternalServerErrorException(
        'Error updating state indexes',
        error,
      );
    }
  }
}
