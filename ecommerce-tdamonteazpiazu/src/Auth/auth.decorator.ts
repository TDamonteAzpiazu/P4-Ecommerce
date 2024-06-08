import { ApiBody, ApiOperation } from "@nestjs/swagger"
import { AuthDto } from "./auth.dto"
import { applyDecorators } from "@nestjs/common"
import { CreateUserDto } from "src/Users/createUser.dto"

export const SignInDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Sign in', description: 'Recibe por body el email y la contraseña de un usuario y retorna un token.'}),
        ApiBody({type: AuthDto})
    )
}

export const SignUpDecorator = () => {
    return applyDecorators(
        ApiOperation({summary: 'Sign up', description: 'Recibe por body los datos de un usuario y lo crea en la base de datos.'}),
        ApiBody({type: CreateUserDto})
    )
}