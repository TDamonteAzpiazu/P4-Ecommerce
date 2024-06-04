import { Injectable, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "./categories.entity";
import { Repository } from "typeorm";
import { categories } from "src/utils/category";


@Injectable()
export class CategoriesService {
    constructor(
        @InjectRepository(Category) private readonly categoriesRepository: Repository<Category>,
    ) {}

    async addCategories() : Promise<void> {
        const categoriesArray = await this.categoriesRepository.find();

        if(categoriesArray.length === 0) {
            for (const category of categories) {
                await this.categoriesRepository.save(category);
            }
        }
    }

    async getAllCategories() {
        return await this.categoriesRepository.find({relations: { products: true }});
    }
}