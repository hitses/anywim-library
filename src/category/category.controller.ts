import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { MongoIdPipe } from 'src/_core/config/pipes/mongo-id.pipe';
import { Auth } from 'src/_core/auth/decorators/auth.decorator';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Auth()
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.categoryService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.categoryService.remove(id);
  }
}
