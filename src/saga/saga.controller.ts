import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SagaService } from './saga.service';
import { CreateSagaDto } from './dto/create-saga.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { MongoIdPipe } from 'src/config/pipes/mongo-id.pipe';

@Controller('saga')
export class SagaController {
  constructor(private readonly sagaService: SagaService) {}

  @Auth()
  @Post()
  create(@Body() createSagaDto: CreateSagaDto) {
    return this.sagaService.create(createSagaDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.sagaService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.sagaService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateSagaDto: UpdateSagaDto,
  ) {
    return this.sagaService.update(id, updateSagaDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.sagaService.remove(id);
  }
}
