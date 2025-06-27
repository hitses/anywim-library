import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MongoIdPipe } from 'src/config/pipes/mongo-id.pipe';

@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Auth()
  @Post()
  create(@Body() createBookDto: CreateBookDto) {
    return this.bookService.create(createBookDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.bookService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.bookService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateBookDto: UpdateBookDto,
  ) {
    return this.bookService.update(id, updateBookDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.bookService.remove(id);
  }
}
