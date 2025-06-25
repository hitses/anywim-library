import {
  Injectable,
  InternalServerErrorException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { Bcrypt } from 'src/common/services/bcrypt';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly bcrypt: Bcrypt,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.usersService.create(registerDto);

    try {
      const token = this.jwtService.sign({ id: user._id });

      return {
        user,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(
        `Error registering user: ${error}`,
      );
    }
  }

  async login(loginDto: LoginDto) {
    const user = await this.userModel.findOne({
      username: loginDto.username,
    });

    if (!user) throw new UnauthorizedException('Invalid credentials');

    const validPassword = await this.bcrypt.comparePassword(
      loginDto.password,
      user.password,
    );

    if (!validPassword) throw new UnauthorizedException('Invalid credentials');

    try {
      const token = this.jwtService.sign({ id: user._id });

      return {
        user,
        token,
      };
    } catch (error) {
      throw new InternalServerErrorException(`Error login user: ${error}`);
    }
  }

  checkToken(user: User) {
    return {
      user,
      token: this.getJwt({
        id: user._id,
      }),
    };
  }

  private getJwt(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }
}
