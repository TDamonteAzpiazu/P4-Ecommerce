import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { CreateUserDto } from "./createUser.dto";
import { Roles } from "../Roles/role.decorator";
import { Role } from "../Roles/roles.enum";
import { RolesGuard } from "../guards/admin.guard";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { DeleteUserDecorator, GetAllUsersDecorator, GetUserByIdDecorator, UpdateUserDecorator } from "./users.decorator";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @GetAllUsersDecorator()
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard, RolesGuard)
    async getUsers(@Query('page') page = '1', @Query('limit') limit = '5') : Promise<Omit<User, 'password'>[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        return await this.usersService.getUsers(pageNumber, limitNumber);
    }

    @Get(':id')
    @GetUserByIdDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return await this.usersService.getUserById(id);
    }

    @Put(':id')
    @UpdateUserDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<CreateUserDto>) : Promise<User> {
        return await this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @DeleteUserDecorator()
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) : Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}