import { IsString, MaxLength, MinLength } from "class-validator";

export class CreateUserDto{

    @IsString()
    @MinLength(5)
    user_name:string;

    @IsString()
    @MinLength(5)
    @MaxLength(10)
    password:string;

    @IsString()
    @MinLength(4)
    fullName:string;
}