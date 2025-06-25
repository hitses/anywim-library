import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Bcrypt } from 'src/common/services/bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly bcryptService: Bcrypt,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const { password, username } = createUserDto;

    try {
      const user = await this.userModel.create({
        username,
        password: await this.bcryptService.encryptPassword(password),
      });

      return user;
    } catch (error) {
      if (error.code === 11000) {
        throw new BadRequestException('User already exists');
      }

      throw new InternalServerErrorException('Error creating user', error);
    }
  }

  async findAll() {
    try {
      return await this.userModel.find();
    } catch (error) {
      throw new InternalServerErrorException('Error finding users:', error);
    }
  }

  async findOne(id: string) {
    const user = await this.userModel.findById(id);

    if (!user) throw new NotFoundException('User not found');

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    if (updateUserDto.password) {
      updateUserDto.password = await this.bcryptService.encryptPassword(
        updateUserDto.password,
      );
    }

    try {
      return await this.userModel.findOneAndUpdate(
        { _id: id },
        { ...updateUserDto },
        { new: true },
      );
    } catch (error) {
      if (error.code === 11000)
        throw new BadRequestException('User already exists');

      throw new InternalServerErrorException('Error updating user', error);
    }
  }

  async remove(id: string) {
    return await this.userModel.findByIdAndDelete(id);
  }
}
