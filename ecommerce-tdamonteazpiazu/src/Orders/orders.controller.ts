import { Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async getAllOrders(pageNumber: number, limitNumber: number) {
        return this.ordersService.getAllOrders(pageNumber, limitNumber);
    }

    @Get(':id')
    async getOrderbyId(@Param('id') id: string) {
        return this.ordersService.getOrderbyId(id);
    }
    
    // @Post()
    // async addOrder() {
    //     return this.ordersService.addOrder()
    // }
}

