import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { OrdersDto } from "./orders.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    async getOrderbyId(@Param('id') id: string) {
        return await this.ordersService.getOrderbyId(id);
    }
    
    @Post()
    async addOrder(@Body() data : OrdersDto) {
        return await this.ordersService.addOrder(data)
    }
}

