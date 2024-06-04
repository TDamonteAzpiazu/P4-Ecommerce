import { Module } from "@nestjs/common";
import { ProductsController } from "./products.controller";
import { ProductsService } from "./products.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "./products.entity";
import { Category } from "../Categories/categories.entity";
import { CategoriesService } from "../Categories/categories.service";


@Module({
    imports: [TypeOrmModule.forFeature([Product, Category])],
    controllers: [ProductsController],
    providers: [ProductsService, CategoriesService],
})
export class ProductsModule {}