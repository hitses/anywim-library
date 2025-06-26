import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { StateService } from './state.service';
import { CreateStateDto } from './dto/create-state.dto';
import { UpdateStateDto } from './dto/update-state.dto';
import { MongoIdPipe } from 'src/config/pipes/mongo-id.pipe';
import { Auth } from 'src/auth/decorators/auth.decorator';

@Controller('state')
export class StateController {
  constructor(private readonly stateService: StateService) {}

  @Auth()
  @Get('update-indexes')
  updateIndexes() {
    return this.stateService.updateIndexes();
  }

  @Auth()
  @Post()
  create(@Body() createStateDto: CreateStateDto) {
    return this.stateService.create(createStateDto);
  }

  @Auth()
  @Get()
  findAll() {
    return this.stateService.findAll();
  }

  @Auth()
  @Get(':id')
  findOne(@Param('id', MongoIdPipe) id: string) {
    return this.stateService.findOne(id);
  }

  @Auth()
  @Patch(':id')
  update(
    @Param('id', MongoIdPipe) id: string,
    @Body() updateStateDto: UpdateStateDto,
  ) {
    return this.stateService.update(id, updateStateDto);
  }

  @Auth()
  @Delete(':id')
  remove(@Param('id', MongoIdPipe) id: string) {
    return this.stateService.remove(id);
  }
}
