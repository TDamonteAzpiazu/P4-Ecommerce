import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger"
import { ProductDto } from "./product.dto"

export const CreateProductDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Create product', description: 'Recibe por body la información de un producto y la crea en la base de datos.'}),
        ApiBody({type: ProductDto})
    )
}

export const GetAllProductsDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all products', description: 'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los productos.'}),
        ApiQuery({name: 'page', required: false, type: Number}),
        ApiQuery({name: 'limit', required: false, type: Number})
    )
}

export const GetProductByIdDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get product by ID', description: 'Recibe por parámetro el ID de un producto y retorna un objeto con todos sus datos.'})
    )
}

export const UpdateProductDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Update product', description: 'Recibe por parámetro el ID de un producto y por body la información con la que actualiza sus datos.'}),
        ApiBody({type: ProductDto})
    )
}

export const DeleteProductDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Delete product', description: 'Recibe por parámetro el ID de un producto y lo elimina de la base de datos.'})
    )
}