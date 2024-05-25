import { Controller, Get, Post } from "@nestjs/common";
import { CategoriesService } from "./categories.service";

@Controller('categories')
export class CategoriesController {
    constructor(private readonly categoriesService: CategoriesService) {}

    @Post('seeder')
    async addCategories() {
        await this.categoriesService.addCategories();
        return "Todo ok"
    }

    @Get()
    async getAllCategories() {
        return await this.categoriesService.getAllCategories();
    }
}