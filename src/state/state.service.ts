import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { State } from './entities/state.entity';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import slugify from 'slugify';

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
      this.errorResponse(error);
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
    const slug = slugify(updateStateDto.name!);

    try {
      return await this.stateModel.findOneAndUpdate(
        { _id: id },
        { ...updateStateDto, slug },
        { new: true },
      );
    } catch (error) {
      this.errorResponse(error);
    }
  }

  async remove(id: string) {
    return await this.stateModel.findByIdAndDelete(id);
  }

  private errorResponse(error: any) {
    if (error.code === 11000)
      throw new BadRequestException('State already exists');

    throw new InternalServerErrorException('Error in State', error);
  }
}
