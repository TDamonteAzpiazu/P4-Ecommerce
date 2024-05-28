import { Body, Controller, Get, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { LoginUserDto } from "./auth.dto";
import { User } from "src/Users/users.entity";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Get()
    getAuth():string {
        return this.authService.getAuth();
    }

    @Post('signin')
    async signIn(@Body() credentials : LoginUserDto) : Promise<User | string> {
        return await this.authService.signIn(credentials);
    }
}