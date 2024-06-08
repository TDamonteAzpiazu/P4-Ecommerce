import { applyDecorators } from "@nestjs/common"
import { ApiOperation } from "@nestjs/swagger"

export const GetAllCategoriesDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all categories', description: 'Retorna un arreglo de objetos con todas las categorías.'})
    )
}