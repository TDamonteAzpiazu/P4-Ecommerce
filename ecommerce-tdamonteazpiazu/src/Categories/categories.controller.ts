import { Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiOperation, ApiTags } from "@nestjs/swagger";

@ApiTags('Categories')
@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    /*@Post('seeder')
    @ApiOperation({summary: 'Seed categories', description: 'Crea las categorías en la base de datos.'})
    async addCategories() {
        await this.categoriesService.addCategories();
        return "Todo ok"
    }*/

    @Get()
    @ApiOperation({summary: 'Get all categories', description: 'Retorna un arreglo de objetos con todas las categorías.'})
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }
}