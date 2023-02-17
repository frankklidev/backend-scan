import { IsString, MaxLength, MinLength } from "class-validator";

export class LoginUserDto{

    @IsString()
    @MinLength(5)
    user_name:string;

    @IsString()
    @MinLength(5)
    @MaxLength(10)
    password:string;
}