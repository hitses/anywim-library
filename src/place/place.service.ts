import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import slugify from 'slugify';
import { Place } from './entities/place.entity';
import { CreatePlaceDto } from './dto/create-place.dto';
import { UpdatePlaceDto } from './dto/update-place.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';

@Injectable()
export class PlaceService {
  constructor(
    @InjectModel(Place.name)
    private readonly placeModel: Model<Place>,
  ) {}

  async create(createPlaceDto: CreatePlaceDto) {
    try {
      const place = new this.placeModel(createPlaceDto);

      return await place.save();
    } catch (error) {
      createErrorResponse('Place', error);
    }
  }

  async findAll() {
    return await this.placeModel.find();
  }

  async findOne(id: string) {
    const place = await this.placeModel.findById(id);

    if (!place) throw new BadRequestException('Place not found');

    return place;
  }

  async update(id: string, updatePlaceDto: UpdatePlaceDto) {
    const slug = slugify(updatePlaceDto.name!);

    try {
      return await this.placeModel.findOneAndUpdate(
        { _id: id },
        { ...updatePlaceDto, slug },
        { new: true },
      );
    } catch (error) {
      updateErrorResponse('Place', error);
    }
  }

  async remove(id: string) {
    return await this.placeModel.findByIdAndDelete(id);
  }
}
