import { Body, Controller, Get, Param, ParseUUIDPipe, Post, UseGuards } from "@nestjs/common";
import { OrdersService } from "./orders.service";
import { CreateOrderDto } from "./createOrder.dto";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
    constructor(private readonly ordersService: OrdersService) {}

    @Get()
    @ApiOperation({summary: 'Get all orders', description: 'Retorna una lista de todos los pedidos.'})
    async getAllOrders() {
        return await this.ordersService.getAllOrders();
    }

    @Get(':id')
    @ApiOperation({summary: 'Get order by ID', description: 'Recibe por parámetro el ID de un pedido y retorna un objeto con todos sus datos.'})
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async getOrderbyId(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ordersService.getOrderbyId(id);
    }
    
    @Post()
    @ApiOperation({summary: 'Add order', description: 'Recibe por body la información con la que agrega un pedido.'})
    @ApiBody({type: CreateOrderDto})
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async addOrder(@Body() data : CreateOrderDto) {
        return await this.ordersService.addOrder(data)
    }
}

