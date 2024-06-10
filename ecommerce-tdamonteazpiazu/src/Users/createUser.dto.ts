import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsEmpty, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, MaxLength, MinLength } from "class-validator";
import { Role } from "src/Roles/roles.enum";

export class CreateUserDto {

    @ApiProperty({
        description: 'El nombre del usuario',
        example: 'Tobias'
    })
    @IsNotEmpty()
    @MinLength(3)
    @MaxLength(80)
    @IsString()
    name: string
    
    @ApiProperty({
        description: 'El email del usuario',
        example: 'tobo@mail.com'
    })
    @IsNotEmpty()
    @IsEmail()
    email: string

    @ApiProperty({
        description: 'La contraseña del usuario',
        example: 'Password1!'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
    password: string

    @ApiProperty({
        description: 'La confirmación de la contraseña del usuario',
        example: 'Password1!'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    @MaxLength(15)
    @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&_\-]).{8,15}$/, { message: 'password too weak' })
    confirmPassword: string

    @ApiProperty({
        description: 'La dirección del usuario',
        example: 'Calle falsa 123'
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    @MaxLength(80)
    address: string

    @ApiProperty({
        description: 'El número de telefono del usuario',
        example: '111111111'
    })
    @IsNotEmpty()
    @IsNumber()
    phone: number

    @ApiProperty({
        description: 'El pais del usuario',
        example: 'Argentina',
        required: false
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    country: string

    @ApiProperty({
        description: 'La ciudad del usuario',
        example: 'Buenos Aires',
        required: false
    })
    @IsString()
    @MinLength(5)
    @MaxLength(20)
    @IsOptional()
    city: string
} 