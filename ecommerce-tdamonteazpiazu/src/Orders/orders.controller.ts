import { Body, Controller, Get, Param, ParseUUIDPipe, Post } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    async getOrderbyId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.getOrderbyId(id);
    }
    
    @Post()
    async addOrder(@Body() data : CreateOrderDto) {
        return await this.ordersService.addOrder(data)
    }
}

