import { IsNotEmpty, IsString } from "class-validator";

export class UserCreateDto{
    @IsNotEmpty()
    @IsString()
    username:string
}