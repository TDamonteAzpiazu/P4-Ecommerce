import { ArrayMinSize, IsArray, IsNotEmpty, IsUUID, MinLength } from "class-validator"
import { OrdersProductsDto } from "./ordersProducts.dto"

export class CreateOrderDto {

    @IsUUID()
    @IsNotEmpty()
    userId: string

    @IsNotEmpty()
    @IsArray()
    @ArrayMinSize(1)
    products: OrdersProductsDto[]
}