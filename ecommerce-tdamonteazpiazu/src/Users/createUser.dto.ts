import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class CreateUserDto {

    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @IsString()
    name: string
    
    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
    password: string

    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @IsNotEmpty()
    @IsNumber()
    phone: number

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    country: string

    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    city: string
} 