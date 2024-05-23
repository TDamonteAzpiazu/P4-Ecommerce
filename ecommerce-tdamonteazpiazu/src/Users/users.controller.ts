import { Body, Controller, Delete, Get, Param, Post, Put, UseInterceptors } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.interfaces";
import { PasswordInterceptor } from "./users.interceptor";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    getUsers() : Promise<User[]> {
        return this.usersService.getUsers();
    }

    @Get(':id')
    // @UseInterceptors(PasswordInterceptor)
    getUserById(@Param('id') id: string) : Promise<Omit<User, 'password'>> {
        return this.usersService.getUserById(Number(id));
    }

    @Post()
    createUser(@Body() user: Omit<User, 'id'>) : Promise<number> {
        return this.usersService.createUser(user);
    }

    @Put(':id')
    updateUser(@Param('id') id: string, @Body() user: Partial<User>) : Promise<number> {
        return this.usersService.updateUser(Number(id), user);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) : Promise<number> {
        return this.usersService.deleteUser(Number(id));
    }
}