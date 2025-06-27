import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CollectionService } from './collection.service';
import { CreateCollectionDto } from './dto/create-collection.dto';
import { UpdateCollectionDto } from './dto/update-collection.dto';
import { MongoIdPipe } from 'src/config/pipes/mongo-id.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('collection')
export class CollectionController {
  constructor(private readonly collectionService: CollectionService) {}

  @Auth()
  @Post()
  create(@Body() createCollectionDto: CreateCollectionDto) {
    return this.collectionService.create(createCollectionDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.collectionService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.collectionService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateCollectionDto: UpdateCollectionDto,
  ) {
    return this.collectionService.update(id, updateCollectionDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.collectionService.remove(id);
  }
}
