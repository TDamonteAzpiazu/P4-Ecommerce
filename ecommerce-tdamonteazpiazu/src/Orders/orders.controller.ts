import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";
import { CreateOrderDecorator, GetAllOrderDecorator, GetOrderByIdDecorator } from "./orders.decorator";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    @GetAllOrderDecorator()
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    @GetOrderByIdDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async getOrderbyId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.getOrderbyId(id);
    }
    
    @Post()
    @CreateOrderDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async addOrder(@Body() data : CreateOrderDto) {
        return await this.ordersService.addOrder(data)
    }
}

