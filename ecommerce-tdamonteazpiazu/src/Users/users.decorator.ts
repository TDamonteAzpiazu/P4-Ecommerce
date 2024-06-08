import { applyDecorators } from "@nestjs/common"
import { ApiBody, ApiOperation, ApiQuery } from "@nestjs/swagger"
import { CreateUserDto } from "./createUser.dto"

export const GetAllUsersDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get all users', description: 'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los usuarios.'}),
        ApiQuery({name: 'page', required: false, type: Number, description: 'La pagina que será mostrada'}),
        ApiQuery({name: 'limit', required: false, type: Number, description: 'El límite de elementos por página'})
    )
}

export const GetUserByIdDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Get user by ID', description: 'Recibe por parámetro el ID de un usuario y retorna un objeto con todos sus datos.'})
    )
}

export const UpdateUserDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Update user', description: 'Recibe por parámetro el ID de un usuario y por body la información con la que actualiza sus datos.'}),
        ApiBody({type: CreateUserDto})
    )
}

export const DeleteUserDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Delete user', description: 'Recibe por parámetro el ID de un usuario y lo elimina de la base de datos.'})
    )
}