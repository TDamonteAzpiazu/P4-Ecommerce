import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./auth.dto";
import { User } from "../Users/users.entity";
import { CreateUserDto } from "../Users/createUser.dto";
import { ApiBody, ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get()
    @ApiOperation({summary: 'This was a test with no real functionality.', description: 'Retorna getting auth.'})
    getAuth():string {
        return this.authService.getAuth();
    }

    @Post('signin')
    @ApiOperation({summary: 'Sign in', description: 'Recibe por body el email y la contraseña de un usuario y retorna un token.'})
    @ApiBody({type: AuthDto})
    async signIn(@Body() credentials : AuthDto) : Promise<{message: string, token: string}> {
        return await this.authService.signIn(credentials);
    }

    @Post('signup')
    @ApiOperation({summary: 'Sign up', description: 'Recibe por body los datos de un usuario y lo crea en la base de datos.'})
    @ApiBody({type: CreateUserDto})
    async createUser(@Body() user: CreateUserDto) : Promise<Omit<User, 'password'>> {
        return await this.authService.signUp(user);
    }

}