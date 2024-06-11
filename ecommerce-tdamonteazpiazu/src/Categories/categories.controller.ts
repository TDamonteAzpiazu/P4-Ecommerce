import { Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";
import { ApiTags } from "@nestjs/swagger";
import { GetAllCategoriesDecorator } from "./categories.decorator";

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
    @GetAllCategoriesDecorator()
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }
}