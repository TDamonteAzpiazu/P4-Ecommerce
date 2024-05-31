import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthorizationGuard } from "src/guards/authorization.guard";

@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    @UseGuards(AuthorizationGuard)
    async getOrderbyId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.getOrderbyId(id);
    }
    
    @Post()
    @UseGuards(AuthorizationGuard)
    async addOrder(@Body() data : CreateOrderDto) {
        return await this.ordersService.addOrder(data)
    }
}

