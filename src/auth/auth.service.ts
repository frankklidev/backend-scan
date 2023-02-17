import { Injectable, BadRequestException, InternalServerErrorException, UnauthorizedException, NotFoundException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from './entities/users.entity';
import * as bcrypt from 'bcrypt'
import { LoginUserDto, CreateUserDto } from './dto';

import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { UpdateUserDto } from './dto/update-user.dto';


@Injectable()
export class AuthService {

  private readonly loguer = new Logger("AuthService");

  constructor(

    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    private readonly jwtService: JwtService,
  ) { }

  async create(createUserDto: CreateUserDto) {
    try {
      const { password, ...userData } = createUserDto
      const user = this.userRepository.create({
        ...userData,
        password: bcrypt.hashSync(password, 10)
      })
      await this.userRepository.save(user);
      delete user.password;
      return {
        ...user,
        token: this.getJwtToken({ id: user.id })
      };

    } catch (error) {
      this.handleDBErrors(error);
    }
  }
  async login(loginUserDto: LoginUserDto) {

    const { password, user_name } = loginUserDto

    const user = await this.userRepository.findOne({
      where: { user_name },
      select: { user_name: true, password: true, id: true }
    })

    if (!user)
      throw new UnauthorizedException('Credentials not Valid (username )')

    if (!bcrypt.compareSync(password, user.password))
      throw new UnauthorizedException('Credentials not Valid (password )')
    return {
      ...user,
      token: this.getJwtToken({ id: user.id })
    };
  }

  private getJwtToken(payload: JwtPayload) {
    const token = this.jwtService.sign(payload);
    return token;
  }

  private handleDBErrors(error: any): never {

    if (error.code === '23505')
      throw new BadRequestException(error.detail)
    console.log(error)
    throw new InternalServerErrorException('Please check server logs');
  }

  async findAll(paginationDto: PaginationDto) {
    const { limit = 30, offset = 0 } = paginationDto;
    return await this.userRepository.find({
      take: limit,
      skip: offset
    });
  }

  async findOne(term: string) {
    const sale = await this.userRepository.findOne({
      where: {
        user_name: term
      }
    });
    if (!sale)
      throw new NotFoundException(`User with nickname ${term} not found`);
    return sale;
  }

  async update(term: string, updateUserDto: UpdateUserDto) {

    const user = await this.userRepository.findOne({
      where: { user_name: term }
    });
    if (!user) throw new NotFoundException(`User with id ${term} not exist`)
    return this.userRepository.save({
      ...user, // existing fields
      ...updateUserDto // updated fields
    });
  }

  async remove(term: string) {
    const user = await this.findOne(term);
    return await this.userRepository.delete({ user_name: user.user_name })
  }

  private handleDBExecptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail)
    }
    this.loguer.error(error)
    throw new InternalServerErrorException('Unexpected error check Logs')
  }

}
