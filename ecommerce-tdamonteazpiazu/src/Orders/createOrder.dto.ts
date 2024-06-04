import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, MinLength } from "class-validator"
import { OrdersProductsDto } from "./ordersProducts.dto"
import { ApiProperty } from "@nestjs/swagger"

export class CreateOrderDto {
    @ApiProperty({
        description: 'El id del usuario',
        example: 'b8d0c6e0-9a0a-4e3c-9f4f-0b5c5b5c5b5c'
    })
    @IsUUID()
    @IsNotEmpty()
    userId: string

    @ApiProperty({
        description: 'Se recibe un array con objetos con los ids de los productos y las cantidades, como se ve en el Dto de ordersProducts',
        type: [OrdersProductsDto]
    })
    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: OrdersProductsDto[]
}