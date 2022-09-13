import {
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { GetUsersDto } from './dto/get-users.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import config from '../../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async checkIfUserExistsByEmail(email: string | undefined) {
    if (email === undefined) {
      return false;
    }
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    return !!user;
  }

  async create(createUserDto: CreateUserDto) {
    if (createUserDto.password) {
      createUserDto.password = await bcrypt.hash(
        createUserDto.password,
        config.hashSalt,
      );
    }
    if (await this.checkIfUserExistsByEmail(createUserDto.email)) {
      throw new UnprocessableEntityException('User email already exists.');
    }

    return this.usersRepository.save(createUserDto);
  }

  findAll(getUsersDto: GetUsersDto) {
    return this.usersRepository.find({
      skip: getUsersDto.skip,
      take: getUsersDto.take,
    });
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOne({ where: { id: id } });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    if (
      user.email !== updateUserDto.email &&
      (await this.checkIfUserExistsByEmail(updateUserDto.email))
    ) {
      throw new UnprocessableEntityException('User email already exists.');
    }
    const mergedUser = this.usersRepository.merge(user, updateUserDto);
    return this.usersRepository.save(mergedUser);
  }

  async remove(id: number) {
    const user = await this.findOne(id);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return this.usersRepository.delete(id);
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findOne({
      where: { email: email },
    });
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
