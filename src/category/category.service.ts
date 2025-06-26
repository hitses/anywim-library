import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import slugify from 'slugify';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name)
    private readonly categoryModel: Model<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto) {
    try {
      const category = new this.categoryModel(createCategoryDto);

      return await category.save();
    } catch (error) {
      this.errorResponse(error);
    }
  }

  async findAll() {
    return await this.categoryModel.find();
  }

  async findOne(id: string) {
    const category = await this.categoryModel.findById(id);

    if (!category) throw new NotFoundException('Category not found');

    return category;
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto) {
    const slug = slugify(updateCategoryDto.name!);

    try {
      return await this.categoryModel.findOneAndUpdate(
        { _id: id },
        { ...updateCategoryDto, slug },
        { new: true },
      );
    } catch (error) {
      this.errorResponse(error);
    }
  }

  async remove(id: string) {
    return await this.categoryModel.findByIdAndDelete(id);
  }

  private errorResponse(error: any) {
    if (error.code === 11000)
      throw new BadRequestException('Category already exists');

    throw new InternalServerErrorException('Error in Category', error);
  }
}
