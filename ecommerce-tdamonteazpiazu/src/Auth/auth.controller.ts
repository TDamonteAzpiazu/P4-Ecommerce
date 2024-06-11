import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthDto } from "./auth.dto";
import { User } from "../Users/users.entity";
import { CreateUserDto } from "../Users/createUser.dto";
import { ApiTags } from "@nestjs/swagger";
import { SignInDecorator, SignUpDecorator } from "./auth.decorator";

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('signin')
    @SignInDecorator()
    async signIn(@Body() credentials : AuthDto) : Promise<{message: string, token: string}> {
        return await this.authService.signIn(credentials);
    }

    @Post('signup')
    @SignUpDecorator()
    async createUser(@Body() user: CreateUserDto) : Promise<Omit<User, 'password'>> {
        return await this.authService.signUp(user);
    }

}