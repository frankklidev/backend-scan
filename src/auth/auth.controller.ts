import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards, Req, SetMetadata } from '@nestjs/common';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto } from './dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/users.entity';
import { RawHeaders, GetUser, RoleProtected, Auth } from './decorator';
import { UserRoleGuard } from './guards/user-role/user-role.guard';
import { ValidRoles } from './interfaces';



@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  create(@Body() createUserDto: CreateUserDto) {
    return this.authService.create(createUserDto);
  }
  @Post('login')
  loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }
  @Get()
  findAll(@Query() paginationDto: PaginationDto) {
    console.log(paginationDto);
    return this.authService.findAll(paginationDto);
  }

  @Get('private')
  @UseGuards(AuthGuard())
  testingPrivateRoute(
    @Req() request: Express.Request,
    @GetUser() user: User,
    @GetUser('user_name') user_name: string,
    @RawHeaders() rawHeaders: string[]
  ) {
    console.log(request)

    return {
      ok: true,
      message: 'Hola Mundo Private',
      user,
      user_name,
      rawHeaders
    }
  }
  @Get('private2')
  @UseGuards(AuthGuard(), UserRoleGuard)
  privateRoute2(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }
  @Get('private3') 
  @Auth()
  privateRoute3(
    @GetUser() user: User,
  ) {
    return {
      ok: true,
      user,
    }
  }

  @Get(':id')
  findOne(@Param('id') term: string) {
    return this.authService.findOne(term);
  }

  @Patch(':id')
  update(@Param('id') term: string, @Body() updateUserDto: UpdateUserDto) {
    return this.authService.update(term, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') term: string) {
    return this.authService.remove(term);
  }
}
