import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { User } from "src/Users/users.entity";
import { CreateUserDto } from "src/Users/createUser.dto";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get()
    getAuth():string {
        return this.authService.getAuth();
    }

    @Post('signin')
    async signIn(@Body() credentials : LoginUserDto) : Promise<any> {
        return await this.authService.signIn(credentials);
    }

    @Post('signup')
    async createUser(@Body() user: CreateUserDto) : Promise<Omit<User, 'password'>> {
        return await this.authService.signUp(user);
    }

}