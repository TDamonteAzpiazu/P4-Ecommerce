import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { PasswordInterceptor } from "./users.interceptor";
import { AuthorizationGuard } from "src/Auth/guards/authorization.guard";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthorizationGuard)
    getUsers(@Query('page') page = '1', @Query('limit') limit = '5') : Promise<Omit<User, 'password'>[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        return this.usersService.getUsers(pageNumber, limitNumber);
    }

    @Get(':id')
    @UseGuards(AuthorizationGuard)
    getUserById(@Param('id') id: string) : Promise<Omit<User, 'password'>> {
        return this.usersService.getUserById(id);
    }

    @Post()
    createUser(@Body() user: Omit<User, 'id'>) : Promise<Omit<User, 'password'> | string> {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    @UseGuards(AuthorizationGuard)
    updateUser(@Param('id') id: string, @Body() user: Partial<User>) : Promise<User> {
        return this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthorizationGuard)
    deleteUser(@Param('id') id: string) : Promise<User> {
        return this.usersService.deleteUser(id);
    }
}