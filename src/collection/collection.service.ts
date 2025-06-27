import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Collection } from './entities/collection.entity';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import {
  createErrorResponse,
  updateErrorResponse,
} from 'src/common/methods/errors';
import slugify from 'slugify';

@Injectable()
export class CollectionService {
  constructor(
    @InjectModel(Collection.name)
    private readonly categoryModel: Model<Collection>,
  ) {}

  async create(createCollectionDto: CreateCollectionDto) {
    try {
      const collection = new this.categoryModel(createCollectionDto);

      return await collection.save();
    } catch (error) {
      createErrorResponse('Collection', error);
    }
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    const collection = await this.categoryModel.findById(id);

    if (!collection) throw new NotFoundException('Collection not found');

    return collection;
  }

  async update(id: string, updateCollectionDto: UpdateCollectionDto) {
    const slug = slugify(updateCollectionDto.name!);

    try {
      return await this.categoryModel.findOneAndUpdate(
        { _id: id },
        { ...updateCollectionDto, slug },
        { new: true },
      );
    } catch (error) {
      updateErrorResponse('Collection', error);
    }
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }
}
