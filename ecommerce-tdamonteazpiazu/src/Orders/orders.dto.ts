import { OrdersProductsDto } from "./ordersProducts.dto";

export interface OrdersDto {
    userId: string,
    products: OrdersProductsDto[]
}