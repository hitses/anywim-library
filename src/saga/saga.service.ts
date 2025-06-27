import { Injectable } from '@nestjs/common';
import { CreateSagaDto } from './dto/create-saga.dto';
import { UpdateSagaDto } from './dto/update-saga.dto';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class SagaService {
  constructor(
    @InjectModel(Saga.name)
    private readonly categoryModel: Model<Collection>,
  ) {}

  create(createSagaDto: CreateSagaDto) {
    return 'This action adds a new saga';
  }

  findAll() {
    return `This action returns all saga`;
  }

  findOne(id: number) {
    return `This action returns a #${id} saga`;
  }

  update(id: number, updateSagaDto: UpdateSagaDto) {
    return `This action updates a #${id} saga`;
  }

  remove(id: number) {
    return `This action removes a #${id} saga`;
  }
}
