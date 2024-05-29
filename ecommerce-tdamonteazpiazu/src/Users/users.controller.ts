import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Post, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthorizationGuard } from "src/Auth/guards/authorization.guard";
import { CreateUserDto } from "./createUser.dto";

@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @UseGuards(AuthorizationGuard)
    async getUsers(@Query('page') page = '1', @Query('limit') limit = '5') : Promise<Omit<User, 'password'>[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        return await this.usersService.getUsers(pageNumber, limitNumber);
    }

    @Get(':id')
    @UseGuards(AuthorizationGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return await this.usersService.getUserById(id);
    }

    @Put(':id')
    @UseGuards(AuthorizationGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<CreateUserDto>) : Promise<User> {
        return await this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @UseGuards(AuthorizationGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) : Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}