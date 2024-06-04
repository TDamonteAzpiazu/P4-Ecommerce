import { Module } from "@nestjs/common";
import { CloudinaryController } from "./cloudinary.controller";
import { CloudinaryService } from "./cloudinary.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Product } from "src/Products/products.entity";
import { Category } from "src/Categories/categories.entity";
import { CloudinaryConfig } from "src/config/cloudinary";
import { ProductsService } from "src/Products/products.service";
import { CategoriesService } from "src/Categories/categories.service";

@Module({
    imports: [TypeOrmModule.forFeature([Product,Category])],
    controllers: [CloudinaryController],
    providers: [CloudinaryService, CloudinaryConfig, ProductsService, CategoriesService]
})

export class CloudinaryModule { }
