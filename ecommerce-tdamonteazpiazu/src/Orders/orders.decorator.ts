import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { CreateOrderDto } from "./createOrder.dto"

export const GetAllOrderDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all orders', description: 'Retorna una lista de todos los pedidos.'})
    )
}

export const GetOrderByIdDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get order by ID', description: 'Recibe por parámetro el ID de un pedido y retorna un objeto con todos sus datos.'})
    )
}

export const CreateOrderDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Add order', description: 'Recibe por body la información con la que agrega un pedido.'}),
        ApiBody({type: CreateOrderDto})
    )
}