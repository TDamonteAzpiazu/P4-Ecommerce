import { IsNotEmpty, IsNumber, IsUUID } from "class-validator"

export class OrdersProductsDto {
    @IsNotEmpty()
    @IsUUID()
    id: string

    @IsNotEmpty()
    @IsNumber()
    quantity: number
}