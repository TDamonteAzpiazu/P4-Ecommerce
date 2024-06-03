import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Put, Query, UseGuards } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./users.entity";
import { AuthorizationGuard } from "../guards/authorization.guard";
import { CreateUserDto } from "./createUser.dto";
import { Roles } from "../Roles/role.decorator";
import { Role } from "../Roles/roles.enum";
import { RolesGuard } from "../guards/admin.guard";
import { ApiBearerAuth, ApiBody, ApiOperation, ApiQuery, ApiTags, PartialType } from "@nestjs/swagger";

@ApiTags('Users')
@Controller('users')
export class UsersController {
    constructor (private readonly usersService: UsersService) {}

    @Get()
    @ApiOperation({summary: 'Get all users', description: 'Recibe por query la página y el límite de elementos por página y retorna un arreglo de objetos con todos los usuarios.'})
    @ApiQuery({name: 'page', required: false, type: Number})
    @ApiQuery({name: 'limit', required: false, type: Number})
    @Roles(Role.Admin)
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard, RolesGuard)
    async getUsers(@Query('page') page = '1', @Query('limit') limit = '5') : Promise<Omit<User, 'password'>[]> {
        const pageNumber = Number(page)
        const limitNumber = Number(limit)
        return await this.usersService.getUsers(pageNumber, limitNumber);
    }

    @Get(':id')
    @ApiOperation({summary: 'Get user by ID', description: 'Recibe por parámetro el ID de un usuario y retorna un objeto con todos sus datos.'})
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async getUserById(@Param('id', ParseUUIDPipe) id: string) : Promise<Omit<User, 'password'>> {
        return await this.usersService.getUserById(id);
    }

    @Put(':id')
    @ApiOperation({summary: 'Update user', description: 'Recibe por parámetro el ID de un usuario y por body la información con la que actualiza sus datos.'})
    @ApiBody({type: CreateUserDto})
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async updateUser(@Param('id', ParseUUIDPipe) id: string, @Body() user: Partial<CreateUserDto>) : Promise<User> {
        return await this.usersService.updateUser(id, user);
    }

    @Delete(':id')
    @ApiOperation({summary: 'Delete user', description: 'Recibe por parámetro el ID de un usuario y lo elimina de la base de datos.'})
    @ApiBearerAuth()
    @UseGuards(AuthorizationGuard)
    async deleteUser(@Param('id', ParseUUIDPipe) id: string) : Promise<User> {
        return await this.usersService.deleteUser(id);
    }
}