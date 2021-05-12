import {
    IsString,
    IsNotEmpty,
    IsEmail
} from 'class-validator';


import { PartialType } from '@nestjs/mapped-types';

export class CreateUsertDto {
    @IsString()
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsString()
    @IsNotEmpty()
    readonly password: string;

    @IsString()
    @IsNotEmpty()
    readonly role: string;
}

export class UpdateUserDto extends PartialType(CreateUsertDto) { }
