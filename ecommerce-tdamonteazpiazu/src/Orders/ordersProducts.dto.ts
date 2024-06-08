import { ApiProperty } from "@nestjs/swagger"
import { IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class OrdersProductsDto {
    @ApiProperty({
        description: 'El id del producto',
        example: 'b8d0c6e0-9a0a-4e3c-9f4f-0b5c5b5c5b5c'
    })
    @IsNotEmpty()
    @IsUUID()
    id: string

    @ApiProperty({
        description: 'La cantidad de productos',
        example: '1'
    })
    @IsNotEmpty()
    @IsNumber()
    quantity: number
}